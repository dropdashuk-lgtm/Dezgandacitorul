import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/guards";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const updateSchema = z.object({
  slug: z.string().min(1),
  basePrice: z.number().nonnegative().nullable(),
  priceNote: z.string().optional().default(""),
});

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  const { slug, basePrice, priceNote } = parsed.data;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { error } = await supabase
    .from("dz_service_types")
    .update({ base_price: basePrice, price_note: priceNote || null, updated_at: new Date().toISOString() })
    .eq("slug", slug);

  if (error) return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });
  return NextResponse.json({ success: true });
}
