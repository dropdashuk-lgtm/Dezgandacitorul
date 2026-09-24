import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Contracte lunare și intervenții recurente",
  "Istoric complet al intervențiilor",
  "Locații multiple într-un singur cont",
  "Rapoarte lunare și documentație",
];

const industries = ["Restaurante", "Hoteluri", "Depozite", "Birouri", "Magazine", "Asociații de proprietari"];

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
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <span key={industry} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-foreground/80">
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
