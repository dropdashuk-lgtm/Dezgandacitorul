import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/data/services";

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold">Servicii</h2>
        <p className="mt-2 text-foreground/70">
          Soluții complete pentru locuințe, firme și spații agricole.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/servicii/${service.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h3 className="font-heading font-bold">{service.name}</h3>
              <p className="mt-2 text-sm text-foreground/70">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand">{service.priceLabel}</span>
                <ArrowRight className="h-4 w-4 text-brand" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
