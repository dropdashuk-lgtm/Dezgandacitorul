import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SITE, getWhatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactează Dezgandacitorul.ro prin telefon, email sau WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-heading text-4xl font-bold">Contact</h1>
      <p className="mt-3 text-foreground/70">Suntem disponibili pentru orice întrebare sau solicitare.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <a href={SITE.phoneHref} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
            <Phone className="h-5 w-5 text-brand" /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
            <Mail className="h-5 w-5 text-brand" /> {SITE.email}
          </a>
          <a href={getWhatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
            <MessageCircle className="h-5 w-5 text-[#1ebe57]" /> Trimite un mesaj pe WhatsApp
          </a>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
