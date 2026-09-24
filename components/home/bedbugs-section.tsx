import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/data/services";

export function BedbugsSection() {
  const service = getServiceBySlug("plosnite");
  if (!service) return null;

  return (
    <section className="bg-brand/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-accent">
            Serviciu prioritar
          </span>
          <h2 className="font-heading mt-2 text-3xl font-bold">Ai ploșnițe? Nu amâna tratamentul.</h2>
          <p className="mt-4 text-foreground/70">{service.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {service.symptoms.slice(0, 4).map((symptom) => (
              <li key={symptom} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {symptom}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/servicii/plosnite" size="md">
              Programează tratamentul
            </Button>
            <Button href="/servicii/plosnite" size="md" variant="outline">
              Vezi detalii
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <h3 className="font-heading font-bold">Cum funcționează intervenția</h3>
          <ol className="mt-4 space-y-3 text-sm text-foreground/80">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
