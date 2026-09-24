import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { getServiceBySlug, services } from "@/lib/data/services";
import { getServicePrices, formatPriceLabel } from "@/lib/data/db-services";
import { getWhatsappHref } from "@/lib/constants";

export const revalidate = 300;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/servicii/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps<"/servicii/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const dbPrices = await getServicePrices();
  const dbPrice = dbPrices[service.slug];
  const priceLabel = dbPrice ? formatPriceLabel(dbPrice.base_price, service.priceLabel) : service.priceLabel;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    areaServed: ["București", "Ilfov"],
    provider: { "@type": "LocalBusiness", name: "Dezgandacitorul.ro" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="font-heading text-4xl font-bold">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-white/90">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/programare" size="lg">
              Programează tratamentul
            </Button>
            <Button href={getWhatsappHref(`Bună ziua. Aș dori o evaluare pentru ${service.name.toLowerCase()}.`)} size="lg" variant="whatsapp">
              Trimite o poză
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="font-heading text-2xl font-bold">Cum îți dai seama</h2>
        <ul className="mt-4 space-y-2">
          {service.symptoms.map((symptom) => (
            <li key={symptom} className="flex items-start gap-2 text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {symptom}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="font-heading text-2xl font-bold">Cum funcționează intervenția</h2>
          <ol className="mt-4 space-y-3">
            {service.process.map((step, i) => (
              <li key={step} className="flex gap-3 text-foreground/80">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="font-heading text-2xl font-bold">Preț</h2>
        <p className="mt-3 text-foreground/80">
          Tratament {service.shortName.toLowerCase()} {priceLabel}. Prețul final depinde de suprafață și
          nivelul infestării — primești o estimare înainte de confirmarea programării.
        </p>
        {dbPrice?.price_note && <p className="mt-2 text-sm text-foreground/50">{dbPrice.price_note}</p>}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="font-heading text-2xl font-bold">Cum te pregătești</h2>
          <p className="mt-3 text-foreground/80">
            După confirmarea programării, primești automat un checklist cu recomandări: ce anume trebuie eliberat
            din zonele afectate, ce textile trebuie spălate și ce nu trebuie mutat în alte camere.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="font-heading text-2xl font-bold">După tratament</h2>
        <p className="mt-3 text-foreground/80">
          Vei primi instrucțiuni privind timpul de așteptare înainte de a reveni în zona tratată, plus recomandări
          de prevenție. Dacă este necesar, programăm un al doilea tratament de follow-up.
        </p>
      </section>

      {service.faq.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12">
            <h2 className="font-heading text-2xl font-bold">Întrebări frecvente</h2>
            <div className="mt-6">
              <Accordion items={service.faq} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-r from-brand to-brand-light">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center text-white">
          <h2 className="font-heading text-2xl font-bold">Programează tratamentul acum</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/programare" size="lg">
              Programează intervenția
            </Button>
            <Button href="tel:+40700000000" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
              Sună acum
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
