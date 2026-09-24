import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const navLinks = [
  { href: "/servicii", label: "Servicii" },
  { href: "/agricultura", label: "Agricultură" },
  { href: "/firme", label: "Firme" },
  { href: "/preturi", label: "Prețuri" },
  { href: "/zone", label: "Zone" },
  { href: "/despre-noi", label: "Despre noi" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-extrabold text-brand">
          Dezgandacitorul<span className="text-accent">.ro</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand sm:flex"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Button href="/programare" size="sm">
            Programează
          </Button>
        </div>
      </div>
    </header>
  );
}
