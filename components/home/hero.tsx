import { ShieldCheck, Bug, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsappHref } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand to-brand-light text-white">
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
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

        <div className="relative hidden lg:block">
          <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute inset-6 rounded-full border border-white/20" />
            <div className="absolute inset-16 rounded-full border border-white/15" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white/15 shadow-2xl backdrop-blur-sm">
              <ShieldCheck className="h-14 w-14 text-white" />
            </div>
            <div className="absolute left-2 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-lg">
              <Bug className="h-7 w-7 text-white" />
            </div>
            <div className="absolute bottom-4 right-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <HomeIcon className="h-7 w-7 text-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
