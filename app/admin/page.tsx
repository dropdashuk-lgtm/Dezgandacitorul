import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const kpis = [
  { label: "Cereri azi", value: "—" },
  { label: "Programări azi", value: "—" },
  { label: "Intervenții finalizate", value: "—" },
  { label: "Venit luna curentă", value: "—" },
];

const modules = ["Leads", "Jobs", "Customers", "Technicians", "Calendar", "Pricing", "Locations", "Content"];

// Mockup static — necesită autentificare admin (Supabase Auth + RLS) și
// conectare la baza de date înainte de lansare (Master Plan §16, §61).
export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Dashboard admin — mockup. Necesită autentificare protejată și conectare la Supabase înainte de lansare.
      </div>

      <h1 className="font-heading mt-6 text-3xl font-bold">Dashboard admin</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-sm text-foreground/60">{kpi.label}</p>
            <p className="font-heading mt-1 text-2xl font-bold">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <Card key={module}>
            <h2 className="font-heading font-bold">{module}</h2>
            <p className="mt-2 text-sm text-foreground/60">Modul planificat.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
