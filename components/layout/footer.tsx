import Link from "next/link";
import { SITE } from "@/lib/constants";
import { phase1Areas } from "@/lib/data/areas";
import { services } from "@/lib/data/services";

const footerColumns = [
  {
    title: "Servicii",
    links: services.slice(0, 6).map((s) => ({ href: `/servicii/${s.slug}`, label: s.shortName })),
  },
  {
    title: "Companie",
    links: [
      { href: "/despre-noi", label: "Despre noi" },
      { href: "/preturi", label: "Prețuri" },
      { href: "/zone", label: "Zone acoperite" },
      { href: "/ghiduri", label: "Ghiduri" },
      { href: "/intrebari-frecvente", label: "Întrebări frecvente" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Clienți business",
    links: [
      { href: "/firme", label: "Servicii pentru firme" },
      { href: "/agricultura", label: "Agricultură" },
      { href: "/urgente", label: "Intervenții urgente" },
      { href: "/cont", label: "Contul meu" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-lg font-extrabold text-brand">
              Dezgandacitorul<span className="text-accent">.ro</span>
            </Link>
            <p className="mt-3 text-sm text-foreground/70">
              Scăpăm de dăunători. Rapid, discret și profesionist.
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              {SITE.phone} · {SITE.email}
            </p>
            <p className="mt-3 text-sm text-foreground/70">
              Acoperim: {phase1Areas.map((a) => a.name).join(", ")} și zone adiacente.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-bold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-foreground/70 hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/5 pt-6 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Toate drepturile rezervate.</p>
          <div className="flex gap-4">
            <Link href="/politica-confidentialitate" className="hover:text-brand">Politica de confidențialitate</Link>
            <Link href="/politica-cookies" className="hover:text-brand">Politica cookies</Link>
            <Link href="/termeni-si-conditii" className="hover:text-brand">Termeni și condiții</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
