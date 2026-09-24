import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/guards";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  status: z.enum(["NOUA", "IN_LUCRU", "REZOLVATA"]),
});

export async function PATCH(request: NextRequest, context: RouteContext<"/api/admin/urgent-requests/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Neautorizat." }, { status: 403 });

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { error } = await supabase
    .from("dz_urgent_requests")
    .update({
      status: parsed.data.status,
      resolved_at: parsed.data.status === "REZOLVATA" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });
  return NextResponse.json({ success: true });
}
