import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { getServicePrices, formatPriceLabel } from "@/lib/data/db-services";

export const metadata: Metadata = {
  title: "Prețuri",
  description: "Prețuri orientative pentru deratizare, dezinsecție și dezinfecție în București și Ilfov.",
};

export const revalidate = 300;

export default async function PreturiPage() {
  const dbPrices = await getServicePrices();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold">Prețuri</h1>
      <p className="mt-3 text-foreground/70">
        Prețurile de mai jos sunt orientative — prețul final depinde de suprafață și nivelul infestării.
        Pentru ferme, vii, livezi, depozite mari sau infestări complexe oferim ofertă personalizată.
      </p>

      <div className="mt-8 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
        {services.map((service) => {
          const dbPrice = dbPrices[service.slug];
          const priceLabel = dbPrice ? formatPriceLabel(dbPrice.base_price, service.priceLabel) : service.priceLabel;
          return (
            <div key={service.slug} className="flex items-center justify-between px-5 py-4">
              <Link href={`/servicii/${service.slug}`} className="font-medium hover:text-brand">
                {service.name}
              </Link>
              <span className="font-semibold text-brand">{priceLabel}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-brand/5 p-6 text-center">
        <h2 className="font-heading font-bold">Ai o suprafață mare sau o situație complexă?</h2>
        <p className="mt-2 text-sm text-foreground/70">Cererea va fi evaluată înainte de ofertare.</p>
        <Button href="/agricultura" className="mt-4">Cere ofertă personalizată</Button>
      </div>
    </div>
  );
}
