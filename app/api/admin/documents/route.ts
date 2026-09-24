import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/guards";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const MAX_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const metaSchema = z.object({
  customerId: z.string().uuid(),
  title: z.string().min(2),
  docType: z.enum(["contract", "document", "factura", "raport", "altul"]),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const formData = await request.formData();
  const parsed = metaSchema.safeParse({
    customerId: formData.get("customerId"),
    title: formData.get("title"),
    docType: formData.get("docType"),
  });
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  const { customerId, title, docType } = parsed.data;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Fișier lipsă." }, { status: 400 });
  }
  if (file.size > MAX_SIZE || !ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Fișier invalid (tip sau dimensiune neacceptată)." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const path = `${customerId}/${crypto.randomUUID()}-${file.name}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from("dz-documents").upload(path, bytes, {
    contentType: file.type,
  });
  if (uploadError) {
    console.error("[admin/documents] upload error", uploadError);
    return NextResponse.json({ error: "Eroare la încărcare." }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("dz_documents").insert({
    customer_id: customerId,
    title,
    doc_type: docType,
    storage_path: path,
    uploaded_by: admin.id,
  });
  if (insertError) {
    console.error("[admin/documents] insert error", insertError);
    return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const { documentId } = await request.json().catch(() => ({}));
  if (typeof documentId !== "string") return NextResponse.json({ error: "Date invalide" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { data: doc } = await supabase.from("dz_documents").select("storage_path").eq("id", documentId).single();
  if (doc) await supabase.storage.from("dz-documents").remove([doc.storage_path]);
  await supabase.from("dz_documents").delete().eq("id", documentId);

  return NextResponse.json({ success: true });
}
