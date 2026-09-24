import { Button } from "@/components/ui/button";

const categories = [
  { title: "Vii", text: "Monitorizare, tratamente și consultanță pentru dăunători specifici viței de vie." },
  { title: "Livezi", text: "Monitorizare și intervenții programate pentru pomii fructiferi, cu plan sezonier." },
  { title: "Ferme", text: "Protecție împotriva rozătoarelor și insectelor în depozite, silozuri și clădiri tehnice." },
  { title: "Sere", text: "Tratamente adaptate și monitorizare periodică a insectelor din sere." },
];

export function AgricultureSection() {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold">Protecție pentru agricultură</h2>
          <p className="mt-2 text-white/80">
            Protecție profesională pentru vii, livezi, ferme și sere.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-2xl bg-white/10 p-6">
              <h3 className="font-heading font-bold">{cat.title}</h3>
              <p className="mt-2 text-sm text-white/80">{cat.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/agricultura" size="md">
            Cere evaluare
          </Button>
        </div>
      </div>
    </section>
  );
}
