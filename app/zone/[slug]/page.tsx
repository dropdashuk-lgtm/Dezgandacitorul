import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { areas } from "@/lib/data/areas";
import { services } from "@/lib/data/services";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/zone/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: `Deratizare și dezinsecție ${area.name}`,
    description: `Servicii de deratizare, dezinsecție și dezinfecție în ${area.name}. Programare rapidă, tehnicieni instruiți.`,
  };
}

export default async function AreaPage({ params }: PageProps<"/zone/[slug]">) {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          <h1 className="font-heading text-4xl font-bold">Deratizare și dezinsecție în {area.name}</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Intervenim rapid în {area.name} pentru locuințe, firme și spații agricole.
          </p>
          <Button href="/programare" size="lg" className="mt-6">
            Programează intervenția
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="font-heading text-2xl font-bold">Servicii disponibile în {area.name}</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicii/${s.slug}`}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm hover:border-brand/50"
            >
              {s.shortName}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
