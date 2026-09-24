import Link from "next/link";
import { MapPin } from "lucide-react";
import { areas } from "@/lib/data/areas";

export function AreasSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold">Zone acoperite</h2>
        <p className="mt-2 text-foreground/70">
          Intervenim în București, Ilfov și extindem constant zonele acoperite.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {areas.map((area) => (
          <span
            key={area.slug}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-foreground/80"
          >
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {area.name}
          </span>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/zone" className="text-sm font-semibold text-brand hover:underline">
          Vezi toate zonele →
        </Link>
      </div>
    </section>
  );
}
