import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/lib/data/guides";

export const metadata: Metadata = {
  title: "Ghiduri",
  description: "Ghiduri utile despre dăunători, prevenție și tratamente de deratizare, dezinsecție și dezinfecție.",
};

export default function GhiduriPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold">Ghiduri</h1>
      <p className="mt-3 text-foreground/70">Informații utile despre dăunători, prevenție și tratamente.</p>

      <div className="mt-10 space-y-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/ghiduri/${guide.slug}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-black/10 bg-white p-5 hover:border-brand/50"
          >
            <div>
              <h2 className="font-heading font-bold">{guide.title}</h2>
              <p className="mt-1 text-sm text-foreground/60">{guide.excerpt}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
          </Link>
        ))}
      </div>
    </div>
  );
}
