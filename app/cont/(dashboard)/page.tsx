import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Download, CalendarClock } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDocumentSignedUrl } from "@/lib/supabase/signed-url";
import { ProfileForm } from "@/components/cont/profile-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Contul meu", robots: { index: false } };

export default async function ContPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return <div className="mx-auto max-w-3xl px-4 py-16">Supabase neconfigurat.</div>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null; // gardat de middleware

  const { data: customer } = await supabase.from("dz_customers").select("*").eq("user_id", user.id).maybeSingle();

  if (!customer) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-heading text-2xl font-bold">Completează-ți profilul</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Avem nevoie de câteva date pentru a-ți administra programările, documentele și cererile.
        </p>
        <div className="mt-6">
          <ProfileForm />
        </div>
      </div>
    );
  }

  const [{ data: bookings }, { data: documents }] = await Promise.all([
    supabase
      .from("dz_bookings")
      .select("id, service_slug, status, preferred_date, created_at")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("dz_documents")
      .select("id, title, doc_type, storage_path, created_at")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false }),
  ]);

  const documentsWithUrls = await Promise.all(
    (documents ?? []).map(async (doc) => ({ ...doc, url: await getDocumentSignedUrl(doc.storage_path) }))
  );

  const nextBooking = (bookings ?? []).find((b) => !["FINALIZATA", "INCHISA"].includes(b.status));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Bun venit, {customer.name.split(" ")[0]}</h1>

      {nextBooking ? (
        <Card className="mt-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
            <CalendarClock className="h-4 w-4" /> Următoarea intervenție
          </div>
          <p className="font-heading mt-2 text-xl font-bold">
            {nextBooking.service_slug} · {nextBooking.preferred_date}
          </p>
          <div className="mt-2">
            <Badge>{nextBooking.status}</Badge>
          </div>
        </Card>
      ) : (
        <Card className="mt-6">
          <p className="text-sm text-foreground/70">Nu ai nicio programare activă momentan.</p>
          <Button href="/programare" size="sm" className="mt-3">
            Programează o intervenție
          </Button>
        </Card>
      )}

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">Istoric programări</h2>
        <div className="mt-3 divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
          {(bookings ?? []).length === 0 && <p className="px-4 py-3 text-sm text-foreground/60">Nicio programare încă.</p>}
          {(bookings ?? []).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{booking.service_slug} · {booking.preferred_date}</span>
              <Badge>{booking.status}</Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">Documente & contracte</h2>
        <div className="mt-3 divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
          {documentsWithUrls.length === 0 && (
            <p className="px-4 py-3 text-sm text-foreground/60">
              Nu ai documente încărcate încă. Contractele și rapoartele vor apărea aici.
            </p>
          )}
          {documentsWithUrls.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand" />
                <span>{doc.title}</span>
                <span className="text-xs uppercase tracking-wide text-foreground/40">{doc.doc_type}</span>
              </div>
              {doc.url && (
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-light">
                  <Download className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-accent/5 p-5 text-center">
        <p className="font-medium">Ai o urgență — ai nevoie de documente sau de o intervenție rapidă?</p>
        <Link href="/cont/cereri" className="mt-3 inline-block">
          <Button variant="primary" size="sm">Trimite o cerere urgentă</Button>
        </Link>
      </section>
    </div>
  );
}
