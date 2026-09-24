import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { SITE, getWhatsappHref } from "@/lib/constants";

// Master Plan §45 — bară fixă jos, mobile-first: Sună / WhatsApp / Programare
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-black/10 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)] md:hidden">
      <a
        href={SITE.phoneHref}
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold text-brand"
      >
        <Phone className="h-5 w-5" />
        Sună
      </a>
      <a
        href={getWhatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-0.5 border-x border-black/10 py-2.5 text-xs font-semibold text-[#1ebe57]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <Link
        href="/programare"
        className="flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold text-accent"
      >
        <CalendarCheck className="h-5 w-5" />
        Programare
      </Link>
    </div>
  );
}
