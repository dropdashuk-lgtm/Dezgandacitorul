import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="bg-gradient-to-r from-brand to-brand-light">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
        <h2 className="font-heading text-3xl font-bold">Programare simplă. Intervenție rapidă.</h2>
        <p className="mt-3 text-white/90">
          Scapă de dăunători în câțiva pași simpli, direct din telefon.
        </p>
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
  );
}
