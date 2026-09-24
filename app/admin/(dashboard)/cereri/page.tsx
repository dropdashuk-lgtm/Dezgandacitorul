import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { UrgentRequestStatus } from "@/components/admin/urgent-request-status";

export const metadata: Metadata = { title: "Cereri urgente", robots: { index: false } };
export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = {
  document: "Documente",
  interventie_urgenta: "Intervenție urgentă",
};

export default async function AdminCereriPage() {
  const supabase = getSupabaseAdmin();
  const { data: requests } = supabase
    ? await supabase
        .from("dz_urgent_requests")
        .select("id, request_type, description, status, created_at, customer_id, dz_customers(name, phone)")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Cereri urgente</h1>

      <div className="mt-6 space-y-3">
        {(requests ?? []).length === 0 && <p className="text-sm text-foreground/60">Nicio cerere momentan.</p>}
        {(requests ?? []).map((req) => {
          const customer = Array.isArray(req.dz_customers) ? req.dz_customers[0] : req.dz_customers;
          return (
            <div key={req.id} className="rounded-xl border border-black/10 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <Link href={`/admin/clienti/${req.customer_id}`} className="font-medium hover:text-brand">
                    {customer?.name ?? "Client"}
                  </Link>
                  <span className="ml-2 text-sm text-foreground/50">{customer?.phone}</span>
                </div>
                <UrgentRequestStatus id={req.id} status={req.status} />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent">
                {typeLabels[req.request_type] ?? req.request_type}
              </p>
              <p className="mt-1 text-sm text-foreground/80">{req.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
