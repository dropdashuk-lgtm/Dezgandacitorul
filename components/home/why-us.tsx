import { ShieldCheck, Clock, Camera, RefreshCcw } from "lucide-react";

const reasons = [
  { icon: Clock, title: "Programare rapidă", text: "Programezi online în 1-2 minute, fără telefoane lungi." },
  { icon: Camera, title: "Diagnostic din poze", text: "Trimiți fotografii și primești o evaluare inițială înainte de vizită." },
  { icon: ShieldCheck, title: "Tehnicieni instruiți", text: "Echipament profesional și tratamente adaptate fiecărui caz." },
  { icon: RefreshCcw, title: "Follow-up inclus", text: "Revenim după tratament pentru a confirma eliminarea problemei." },
];

export function WhyUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold">De ce noi</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading mt-4 font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
