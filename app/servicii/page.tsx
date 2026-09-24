import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Servicii de deratizare, dezinsecție și dezinfecție",
  description:
    "Servicii complete: ploșnițe, gândaci, rozătoare, furnici, purici, căpușe, țânțari, molii, viespi, deratizare, dezinsecție și dezinfecție.",
};

export default function ServiciiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-bold">Servicii</h1>
        <p className="mt-3 text-foreground/70">
          Alege problema cu care te confrunți pentru a afla mai multe despre intervenția noastră.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/servicii/${service.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="font-heading font-bold">{service.name}</h2>
              <p className="mt-2 text-sm text-foreground/70">{service.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-brand">{service.priceLabel}</span>
                <ArrowRight className="h-4 w-4 text-brand" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
