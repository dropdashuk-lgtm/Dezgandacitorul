import { UtensilsCrossed, Hotel, Warehouse, Building2, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Contracte lunare și intervenții recurente",
  "Istoric complet al intervențiilor",
  "Locații multiple într-un singur cont",
  "Rapoarte lunare și documentație",
];

const industries = [
  { label: "Restaurante", icon: UtensilsCrossed },
  { label: "Hoteluri", icon: Hotel },
  { label: "Depozite", icon: Warehouse },
  { label: "Birouri", icon: Building2 },
  { label: "Magazine", icon: Store },
  { label: "Asociații de proprietari", icon: Users },
];

export function BusinessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold">Servicii pentru firme</h2>
          <p className="mt-3 text-foreground/70">
            Planuri recurente și portal dedicat pentru clienți business.
          </p>
          <ul className="mt-5 space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {benefit}
              </li>
            ))}
          </ul>
          <Button href="/firme" size="md" className="mt-6">
            Vezi servicii pentru firme
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <industry.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-foreground/80">{industry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
