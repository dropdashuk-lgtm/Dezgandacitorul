import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = getSupabaseAdmin();

  const today = new Date().toISOString().split("T")[0];

  const [bookingsToday, customersCount, urgentOpen, documentsCount] = supabase
    ? await Promise.all([
        supabase.from("dz_bookings").select("id", { count: "exact", head: true }).gte("created_at", today),
        supabase.from("dz_customers").select("id", { count: "exact", head: true }),
        supabase.from("dz_urgent_requests").select("id", { count: "exact", head: true }).neq("status", "REZOLVATA"),
        supabase.from("dz_documents").select("id", { count: "exact", head: true }),
      ])
    : [null, null, null, null];

  const kpis = [
    { label: "Cereri programare (azi)", value: bookingsToday?.count ?? "—" },
    { label: "Clienți totali", value: customersCount?.count ?? "—" },
    { label: "Cereri urgente deschise", value: urgentOpen?.count ?? "—" },
    { label: "Documente încărcate", value: documentsCount?.count ?? "—" },
  ];

  const modules = [
    { title: "Prețuri", desc: "Setează prețurile estimative afișate pe site.", href: "/admin/preturi" },
    { title: "Clienți", desc: "Vezi clienții, programările și documentele lor.", href: "/admin/clienti" },
    { title: "Cereri urgente", desc: "Documente sau intervenții cerute urgent de clienți.", href: "/admin/cereri" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {!supabase && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Supabase neconfigurat — datele de mai jos sunt indisponibile.
        </div>
      )}

      <h1 className="font-heading text-3xl font-bold">Dashboard admin</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-sm text-foreground/60">{kpi.label}</p>
            <p className="font-heading mt-1 text-2xl font-bold">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.href} href={module.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="font-heading font-bold">{module.title}</h2>
              <p className="mt-2 text-sm text-foreground/60">{module.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
