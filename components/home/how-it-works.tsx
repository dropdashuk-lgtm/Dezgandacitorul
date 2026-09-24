import { CalendarCheck, ClipboardCheck, Wrench, MessageCircleHeart } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Programezi online", text: "În 1-2 minute alegi problema, data și lași datele tale de contact." },
  { icon: ClipboardCheck, title: "Primești confirmarea", text: "Confirmăm programarea prin SMS, email sau WhatsApp, cu instrucțiuni înainte de intervenție." },
  { icon: Wrench, title: "Intervenția are loc", text: "Tehnicianul ajunge la ora stabilită și realizează tratamentul potrivit problemei tale." },
  { icon: MessageCircleHeart, title: "Follow-up", text: "Revenim cu recomandări și, dacă e nevoie, programăm al doilea tratament." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold">Cum funcționează</h2>
        <p className="mt-2 text-foreground/70">Un proces simplu, de la programare la finalizare.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="rounded-2xl border border-black/5 bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <step.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading mt-4 font-bold">{step.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
