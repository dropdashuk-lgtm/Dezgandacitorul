import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politica de confidențialitate" };

// Text placeholder — trebuie verificat juridic înainte de lansare (Master Plan §62).
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold">Politica de confidențialitate</h1>
      <p className="mt-4 text-foreground/70">
        Acest text este un placeholder. Politica de confidențialitate finală, inclusiv informațiile privind
        colectarea, stocarea și retenția datelor (inclusiv fotografiile încărcate), trebuie redactată și
        verificată juridic înainte de lansare.
      </p>
    </div>
  );
}
