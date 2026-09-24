import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { PricingTable } from "@/components/admin/pricing-table";

export const metadata: Metadata = { title: "Prețuri", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPreturiPage() {
  const supabase = getSupabaseAdmin();
  const { data: services } = supabase
    ? await supabase.from("dz_service_types").select("slug, name, base_price, price_note").order("name")
    : { data: [] };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Prețuri estimative</h1>
      <p className="mt-2 text-sm text-foreground/60">
        Prețurile de aici sunt afișate live pe site (/preturi și paginile de servicii), cu revalidare la
        câteva minute.
      </p>
      <div className="mt-6">
        <PricingTable services={services ?? []} />
      </div>
    </div>
  );
}
