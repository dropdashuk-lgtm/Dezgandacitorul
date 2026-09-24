import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Intervenții urgente",
  description: "Ai nevoie de intervenție rapidă? Sunăm și intervenim rapid pentru ploșnițe, viespi, rozătoare și situații critice.",
};

const urgentServices = ["Ploșnițe", "Viespi", "Rozătoare", "Infestări business", "Situații critice"];

export default function UrgentePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-heading text-4xl font-bold">Ai nevoie de intervenție rapidă?</h1>
      <p className="mt-4 text-foreground/70">
        Pentru situații urgente, cea mai rapidă cale este să ne suni direct.
      </p>
      <Button href={SITE.phoneHref} size="lg" className="mt-6">
        Sună acum · {SITE.phone}
      </Button>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {urgentServices.map((s) => (
          <span key={s} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{s}</span>
        ))}
      </div>
    </div>
  );
}
