import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient, getSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const MAX_PHOTOS = 5;
const MAX_PHOTO_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/heic"];

const bookingSchema = z.object({
  serviceSlug: z.string().min(1),
  propertyType: z.string().min(1),
  propertySize: z.string().min(1),
  infestationLevel: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().optional().default(""),
  preferredDate: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(3),
  notes: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`booking:${ip}`)) {
    return NextResponse.json({ error: "Prea multe cereri. Încearcă din nou mai târziu." }, { status: 429 });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(
    Array.from(formData.entries()).filter(([key]) => key !== "photos")
  );

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Date invalide", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const photos = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_PHOTOS);

  for (const photo of photos) {
    if (photo.size > MAX_PHOTO_SIZE || !ALLOWED_PHOTO_TYPES.includes(photo.type)) {
      return NextResponse.json({ error: "Fotografie invalidă (tip sau dimensiune neacceptată)." }, { status: 400 });
    }
  }

  const supabase = getSupabaseAdmin();
  let bookingId: string | null = null;

  if (supabase) {
    // Dacă utilizatorul e autentificat, legăm rezervarea de contul lui.
    const sessionClient = await createSupabaseServerClient();
    const sessionUser = sessionClient ? (await sessionClient.auth.getUser()).data.user : null;

    let customerId: string | null = null;

    if (sessionUser) {
      const { data: existing } = await supabase
        .from("dz_customers")
        .select("id")
        .eq("user_id", sessionUser.id)
        .maybeSingle();

      if (existing) {
        customerId = existing.id;
        await supabase
          .from("dz_customers")
          .update({
            name: data.name,
            phone: data.phone,
            email: data.email || sessionUser.email || null,
            address: data.address,
            city: data.city,
            postal_code: data.postalCode,
          })
          .eq("id", existing.id);
      }
    }

    if (!customerId) {
      const { data: customer, error: customerError } = await supabase
        .from("dz_customers")
        .insert({
          user_id: sessionUser?.id ?? null,
          name: data.name,
          phone: data.phone,
          email: data.email || sessionUser?.email || null,
          address: data.address,
          city: data.city,
          postal_code: data.postalCode,
        })
        .select("id")
        .single();

      if (customerError) {
        console.error("[bookings] customer insert error", customerError);
        return NextResponse.json({ error: "Eroare la salvarea datelor." }, { status: 500 });
      }
      customerId = customer.id;
    }

    const { data: booking, error: bookingError } = await supabase
      .from("dz_bookings")
      .insert({
        customer_id: customerId,
        service_slug: data.serviceSlug,
        property_type: data.propertyType,
        property_size: data.propertySize,
        infestation_level: data.infestationLevel,
        address: data.address,
        city: data.city,
        preferred_date: data.preferredDate,
        notes: data.notes,
        status: "CERERE_NOUA",
      })
      .select("id")
      .single();

    if (bookingError) {
      console.error("[bookings] booking insert error", bookingError);
      return NextResponse.json({ error: "Eroare la salvarea programării." }, { status: 500 });
    }

    bookingId = booking.id;

    for (const photo of photos) {
      const bytes = new Uint8Array(await photo.arrayBuffer());
      const path = `${bookingId}/${crypto.randomUUID()}-${photo.name}`;
      const { error: uploadError } = await supabase.storage.from("dz-booking-photos").upload(path, bytes, {
        contentType: photo.type,
      });
      if (uploadError) {
        console.error("[bookings] photo upload error", uploadError);
        continue;
      }
      const { data: publicUrl } = supabase.storage.from("dz-booking-photos").getPublicUrl(path);
      await supabase.from("dz_booking_photos").insert({ booking_id: bookingId, file_url: publicUrl.publicUrl });
    }
  } else {
    console.warn("[bookings] Supabase neconfigurat — cererea nu a fost persistată.", data);
  }

  if (data.email) {
    await sendEmail({
      to: data.email,
      subject: "Am primit solicitarea ta — Dezgandacitorul.ro",
      html: `<p>Bună, ${data.name},</p><p>Am primit solicitarea ta pentru <strong>${data.serviceSlug}</strong>. Te contactăm în scurt timp pentru confirmarea programării.</p>`,
    });
  }

  return NextResponse.json({ success: true, bookingId });
}
