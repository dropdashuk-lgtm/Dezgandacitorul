import type { Metadata } from "next";
import { ShieldCheck, Clock, MessageCircleHeart, RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Despre noi",
  description: "Aflăm despre Dezgandacitorul.ro — experiență, rapiditate, transparență și comunicare pentru clienți rezidențiali, business și agricultură.",
};

const pillars = [
  { icon: Clock, title: "Rapiditate", text: "Programare online în 1-2 minute și intervenții rapide." },
  { icon: ShieldCheck, title: "Transparență", text: "Estimare de preț înainte de confirmare, fără costuri ascunse." },
  { icon: MessageCircleHeart, title: "Comunicare", text: "Confirmări și actualizări prin SMS, email sau WhatsApp." },
  { icon: RefreshCcw, title: "Follow-up", text: "Revenim după tratament pentru a confirma rezultatul." },
];

export default function DespreNoiPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand to-brand-light text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold">De ce noi</h1>
          <p className="mt-4 text-white/90">
            O platformă de servicii locale, ușor de folosit, care transformă o problemă stresantă
            într-un proces simplu de programare, intervenție și follow-up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-black/5 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h2 className="font-heading mt-4 font-bold">{pillar.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="font-heading text-2xl font-bold">Pentru cine lucrăm</h2>
          <p className="mt-3 text-foreground/70">
            Servicii pentru clienți rezidențiali (apartamente, case), clienți business
            (restaurante, hoteluri, birouri, asociații de proprietari) și agricultură (vii, livezi, ferme, sere).
          </p>
        </div>
      </section>
    </div>
  );
}
