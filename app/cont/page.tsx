import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contul meu",
  robots: { index: false },
};

// Mockup static — autentificarea și datele reale (Supabase Auth) urmează în Sprint 4.
export default function ContPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
        Această pagină este un mockup al dashboard-ului de client. Autentificarea reală (Supabase Auth) va fi
        adăugată într-un sprint viitor.
      </div>

      <h1 className="font-heading mt-6 text-3xl font-bold">Bun venit!</h1>

      <Card className="mt-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand">
          <CalendarClock className="h-4 w-4" /> Următoarea intervenție
        </div>
        <p className="font-heading mt-2 text-2xl font-bold">25 septembrie, 14:00–16:00</p>
        <div className="mt-2">
          <Badge>Confirmată</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button size="sm">Vezi programarea</Button>
          <Button size="sm" variant="outline">Reprogramează</Button>
          <Button size="sm" variant="ghost">Contactează echipa</Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {["Istoric programări", "Facturi", "Fotografii & recomandări", "Mesaje"].map((title) => (
          <Card key={title}>
            <h2 className="font-heading font-bold">{title}</h2>
            <p className="mt-2 text-sm text-foreground/60">Va fi disponibil după conectarea contului.</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
