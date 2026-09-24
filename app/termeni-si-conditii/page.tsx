import type { Metadata } from "next";

export const metadata: Metadata = { title: "Termeni și condiții" };

// Text placeholder — trebuie verificat juridic înainte de lansare (Master Plan §62).
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold">Termeni și condiții</h1>
      <p className="mt-4 text-foreground/70">
        Acest text este un placeholder. Termenii și condițiile finale trebuie redactate și verificate juridic
        înainte de lansare.
      </p>
    </div>
  );
}
