import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getDocumentSignedUrl } from "@/lib/supabase/signed-url";
import { DocumentUploadForm } from "@/components/admin/document-upload-form";
import { DocumentList } from "@/components/admin/document-list";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Client", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminClientDetailPage({ params }: PageProps<"/admin/clienti/[id]">) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) notFound();

  const { data: customer } = await supabase.from("dz_customers").select("*").eq("id", id).single();
  if (!customer) notFound();

  const [{ data: bookings }, { data: documents }] = await Promise.all([
    supabase
      .from("dz_bookings")
      .select("id, service_slug, status, preferred_date, created_at")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("dz_documents")
      .select("id, title, doc_type, storage_path, created_at")
      .eq("customer_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const documentsWithUrls = await Promise.all(
    (documents ?? []).map(async (doc) => ({
      ...doc,
      url: await getDocumentSignedUrl(doc.storage_path),
    }))
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">{customer.name}</h1>
      <p className="mt-1 text-sm text-foreground/60">
        {customer.phone} {customer.email ? `· ${customer.email}` : ""}
      </p>
      <p className="text-sm text-foreground/60">
        {[customer.address, customer.city, customer.postal_code].filter(Boolean).join(", ")}
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold">Programări</h2>
        <div className="mt-3 divide-y divide-black/5 rounded-xl border border-black/10 bg-white">
          {(bookings ?? []).length === 0 && <p className="px-4 py-3 text-sm text-foreground/60">Nicio programare.</p>}
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
        <div className="mt-3">
          <DocumentUploadForm customerId={customer.id} />
        </div>
        <div className="mt-4">
          <DocumentList documents={documentsWithUrls} />
        </div>
      </section>
    </div>
  );
}
