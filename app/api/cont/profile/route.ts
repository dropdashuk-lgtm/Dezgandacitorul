import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient, getSupabaseAdmin } from "@/lib/supabase/server";

const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  address: z.string().optional().default(""),
  city: z.string().optional().default(""),
  postalCode: z.string().optional().default(""),
});

// Creează sau actualizează rândul din `dz_customers` pentru utilizatorul autentificat curent.
export async function POST(request: NextRequest) {
  const sessionClient = await createSupabaseServerClient();
  if (!sessionClient) {
    return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });
  }

  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Neautentificat." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  }
  const data = parsed.data;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });
  }

  const { data: existing } = await admin.from("dz_customers").select("id").eq("user_id", user.id).maybeSingle();

  if (existing) {
    const { error } = await admin
      .from("dz_customers")
      .update({
        name: data.name,
        phone: data.phone,
        address: data.address || null,
        city: data.city || null,
        postal_code: data.postalCode || null,
      })
      .eq("id", existing.id);
    if (error) return NextResponse.json({ error: "Eroare la actualizare." }, { status: 500 });
    return NextResponse.json({ success: true, customerId: existing.id });
  }

  const { data: created, error } = await admin
    .from("dz_customers")
    .insert({
      user_id: user.id,
      name: data.name,
      phone: data.phone,
      email: user.email,
      address: data.address || null,
      city: data.city || null,
      postal_code: data.postalCode || null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: "Eroare la creare." }, { status: 500 });
  return NextResponse.json({ success: true, customerId: created.id });
}
