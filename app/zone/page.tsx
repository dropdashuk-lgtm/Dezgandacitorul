import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { areas } from "@/lib/data/areas";

export const metadata: Metadata = {
  title: "Zone acoperite",
  description: "Servicii de deratizare, dezinsecție și dezinfecție în București, Ilfov și zonele adiacente.",
};

export default function ZonePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold">Zone acoperite</h1>
      <p className="mt-3 text-foreground/70">
        Faza 1 acoperă integral București și Ilfov. Extindem constant zonele adiacente.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {areas.map((area) => (
          <Link
            key={area.slug}
            href={`/zone/${area.slug}`}
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium hover:border-brand/50"
          >
            <MapPin className="h-4 w-4 text-brand" />
            {area.name}
            <span className="ml-auto text-xs text-foreground/40">Faza {area.phase}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
