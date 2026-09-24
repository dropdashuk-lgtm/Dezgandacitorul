import { Button } from "@/components/ui/button";
import { getWhatsappHref } from "@/lib/constants";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand to-brand-light text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            Scapă de dăunători fără stres.
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Deratizare, dezinsecție și dezinfecție în București, Ilfov și zonele adiacente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/programare" size="lg">
              Programează intervenția
            </Button>
            <Button href="tel:+40700000000" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
              Sună acum
            </Button>
          </div>
          <a
            href={getWhatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
          >
            Trimite poze pe WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
