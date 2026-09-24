import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UrgentRequestForm } from "@/components/cont/urgent-request-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Cereri urgente", robots: { index: false } };

const typeLabels: Record<string, string> = {
  document: "Documente",
  interventie_urgenta: "Intervenție urgentă",
};

const statusLabels: Record<string, string> = {
  NOUA: "Nouă",
  IN_LUCRU: "În lucru",
  REZOLVATA: "Rezolvată",
};

export default async function ContCereriPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return <div className="mx-auto max-w-2xl px-4 py-16">Supabase neconfigurat.</div>;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: customer } = await supabase.from("dz_customers").select("id").eq("user_id", user.id).maybeSingle();

  const { data: requests } = customer
    ? await supabase
        .from("dz_urgent_requests")
        .select("id, request_type, description, status, created_at")
        .eq("customer_id", customer.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Cereri urgente</h1>
      <p className="mt-2 text-sm text-foreground/60">
        Ai nevoie urgentă de documente (contract, raport) sau de o intervenție rapidă? Trimite-ne o cerere —
        echipa noastră o preia imediat.
      </p>

      {!customer ? (
        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Completează-ți mai întâi profilul din <a href="/cont" className="font-semibold underline">contul tău</a>.
        </p>
      ) : (
        <div className="mt-6">
          <UrgentRequestForm />
        </div>
      )}

      <div className="mt-8 space-y-3">
        {(requests ?? []).length === 0 && <p className="text-sm text-foreground/60">Nu ai nicio cerere trimisă.</p>}
        {(requests ?? []).map((req) => (
          <div key={req.id} className="rounded-xl border border-black/10 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {typeLabels[req.request_type] ?? req.request_type}
              </p>
              <Badge>{statusLabels[req.status] ?? req.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-foreground/80">{req.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
