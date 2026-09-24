import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Servicii pentru firme",
  description: "Contracte recurente de deratizare, dezinsecție și dezinfecție pentru restaurante, hoteluri, depozite, birouri și asociații de proprietari.",
};

const benefits = [
  "Contracte lunare",
  "Documentație completă",
  "Intervenții recurente",
  "Istoric intervenții",
  "Locații multiple",
  "Facturare",
  "Raport lunar",
  "Reminder automat",
];

const industries = ["Restaurante", "Hoteluri", "Pensiuni", "Depozite", "Magazine", "Birouri", "Clinici", "Săli de fitness", "Airbnb", "Asociații de proprietari"];

const plans = [
  { name: "Basic", items: ["Inspecție periodică", "Intervenții programate", "Raport"] },
  { name: "Professional", items: ["Intervenții recurente", "Prioritate", "Dashboard", "Documente"] },
  { name: "Enterprise", items: ["Locații multiple", "SLA", "Manager dedicat", "Raportare centralizată"] },
];

export default function FirmePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="font-heading text-4xl font-bold">Servicii pentru firme</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Contracte recurente, documentație și un portal dedicat pentru clienți business.
          </p>
          <Button href="/contact" size="lg" className="mt-6">Cere ofertă pentru firma ta</Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-heading text-2xl font-bold">Beneficii</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white p-4 text-sm">
              <Check className="h-4 w-4 shrink-0 text-brand" /> {b}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-heading text-2xl font-bold">Pentru cine</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {industries.map((i) => (
              <span key={i} className="rounded-full border border-black/10 bg-background px-4 py-2 text-sm">{i}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-heading text-2xl font-bold text-center">Abonamente</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <h3 className="font-heading text-lg font-bold">{plan.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {item}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="outline" className="mt-6 w-full justify-center">
                Cere ofertă
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
