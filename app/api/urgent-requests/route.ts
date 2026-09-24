import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthedUser } from "@/lib/auth/guards";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  requestType: z.enum(["document", "interventie_urgenta"]),
  description: z.string().min(5),
});

// Cerere urgentă (document sau intervenție) — doar pentru clienți autentificați,
// cu profil deja completat (Master Plan: extensie peste §14/§57).
export async function POST(request: NextRequest) {
  const user = await getAuthedUser();
  if (!user) return NextResponse.json({ error: "Neautentificat." }, { status: 401 });

  if (!rateLimit(`urgent:${user.id}`)) {
    return NextResponse.json({ error: "Prea multe cereri. Încearcă din nou mai târziu." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Date invalide" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase neconfigurat." }, { status: 503 });

  const { data: customer } = await supabase.from("dz_customers").select("id").eq("user_id", user.id).maybeSingle();
  if (!customer) {
    return NextResponse.json(
      { error: "Completează-ți mai întâi profilul (nume și telefon) din contul tău." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("dz_urgent_requests").insert({
    customer_id: customer.id,
    request_type: parsed.data.requestType,
    description: parsed.data.description,
  });
  if (error) return NextResponse.json({ error: "Eroare la salvare." }, { status: 500 });

  return NextResponse.json({ success: true });
}
