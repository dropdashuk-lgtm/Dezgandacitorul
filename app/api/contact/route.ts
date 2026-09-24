import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`contact:${ip}`)) {
    return NextResponse.json({ error: "Prea multe cereri. Încearcă din nou mai târziu." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Date invalide", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("dz_contact_messages").insert(data);
    if (error) console.error("[contact] insert error", error);
  } else {
    console.warn("[contact] Supabase neconfigurat — mesajul nu a fost persistat.", data);
  }

  await sendEmail({
    to: SITE.email,
    subject: `Mesaj nou de contact — ${data.name}`,
    html: `<p><strong>${data.name}</strong> (${data.phone}${data.email ? `, ${data.email}` : ""})</p><p>${data.message}</p>`,
  });

  return NextResponse.json({ success: true });
}
