import { Hero } from "@/components/home/hero";
import { BookingWidget } from "@/components/home/booking-widget";
import { ServicesGrid } from "@/components/home/services-grid";
import { BedbugsSection } from "@/components/home/bedbugs-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { AreasSection } from "@/components/home/areas-section";
import { WhyUs } from "@/components/home/why-us";
import { AgricultureSection } from "@/components/home/agriculture-section";
import { BusinessSection } from "@/components/home/business-section";
import { Reviews } from "@/components/home/reviews";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Dezgandacitorul.ro",
  description:
    "Servicii de deratizare, dezinsecție și dezinfecție pentru locuințe, firme și agricultură în București și Ilfov.",
  areaServed: ["București", "Ilfov"],
  url: "https://dezgandacitorul.ro",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <BookingWidget />
      <ServicesGrid />
      <BedbugsSection />
      <HowItWorks />
      <AreasSection />
      <WhyUs />
      <AgricultureSection />
      <BusinessSection />
      <Reviews />
      <FaqSection />
      <FinalCta />
    </>
  );
}
