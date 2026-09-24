import { Accordion } from "@/components/ui/accordion";
import { generalFaq } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold">Întrebări frecvente</h2>
      </div>
      <div className="mt-8">
        <Accordion items={generalFaq} />
      </div>
    </section>
  );
}
