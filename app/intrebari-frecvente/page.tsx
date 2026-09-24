import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { generalFaq } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Răspunsuri la cele mai frecvente întrebări despre serviciile Dezgandacitorul.ro.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-heading text-4xl font-bold text-center">Întrebări frecvente</h1>
      <div className="mt-10">
        <Accordion items={generalFaq} />
      </div>
    </div>
  );
}
