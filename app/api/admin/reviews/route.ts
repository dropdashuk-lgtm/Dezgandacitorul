import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/guards";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const createSchema = z.object({
  authorName: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().default(""),
  approved: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });
  const { authorName, rating, comment, approved } = parsed.data;

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { error } = await supabase.from("dz_reviews").insert({
    author_name: authorName,
    rating,
    comment: comment || null,
    approved,
  });
  if (error) return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });

  return NextResponse.json({ success: true });
}

const patchSchema = z.object({
  reviewId: z.string().uuid(),
  approved: z.boolean(),
});

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { error } = await supabase
    .from("dz_reviews")
    .update({ approved: parsed.data.approved })
    .eq("id", parsed.data.reviewId);
  if (error) return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const { reviewId } = await request.json().catch(() => ({}));
  if (typeof reviewId !== "string") return NextResponse.json({ error: "Date invalide" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  await supabase.from("dz_reviews").delete().eq("id", reviewId);
  return NextResponse.json({ success: true });
}
