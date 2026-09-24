import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politica cookies" };

// Text placeholder — trebuie verificat juridic înainte de lansare (Master Plan §62).
export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-heading text-3xl font-bold">Politica cookies</h1>
      <p className="mt-4 text-foreground/70">
        Acest text este un placeholder. Politica de cookies finală trebuie redactată și verificată juridic
        înainte de lansare, inclusiv lista instrumentelor de analytics instalate (Google Analytics, Microsoft
        Clarity, Meta Pixel).
      </p>
    </div>
  );
}
