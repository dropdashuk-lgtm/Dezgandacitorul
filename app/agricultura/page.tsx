import type { Metadata } from "next";
import { AgricultureForm } from "@/components/agriculture/agriculture-form";

export const metadata: Metadata = {
  title: "Protecție pentru vii, livezi și ferme",
  description: "Protecție profesională pentru vii, livezi, ferme și sere. Monitorizare, tratamente și contracte sezoniere.",
};

const categories = [
  {
    title: "Vii",
    items: ["Monitorizare", "Tratamente împotriva dăunătorilor", "Consultanță pentru intervenții", "Tratamente punctuale", "Contract sezonier"],
  },
  {
    title: "Livezi",
    items: ["Pomi fructiferi", "Monitorizare dăunători", "Intervenții programate", "Plan sezonier"],
  },
  {
    title: "Ferme",
    items: ["Rozătoare", "Insecte", "Depozite", "Silozuri", "Zone de hrană", "Clădiri tehnice"],
  },
  {
    title: "Sere",
    items: ["Insecte", "Monitorizare", "Tratamente adaptate", "Contract periodic"],
  },
];

export default function AgriculturaPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="font-heading text-4xl font-bold">Protecție profesională pentru vii, livezi și ferme.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-2xl border border-black/5 bg-white p-6">
              <h2 className="font-heading font-bold">{cat.title}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/70">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-14">
          <h2 className="font-heading text-2xl font-bold text-center">Cere o evaluare</h2>
          <p className="mt-2 text-center text-sm text-foreground/60">
            Pentru suprafețe mari nu afișăm automat un preț fix — cererea va fi evaluată înainte de ofertare.
          </p>
          <div className="mt-8">
            <AgricultureForm />
          </div>
        </div>
      </section>
    </div>
  );
}
