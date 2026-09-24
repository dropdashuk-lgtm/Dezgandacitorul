import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dezgandacitorul.ro"),
  title: {
    default: "Dezgandacitorul.ro — Deratizare, dezinsecție și dezinfecție București & Ilfov",
    template: "%s | Dezgandacitorul.ro",
  },
  description:
    "Scăpăm de dăunători. Rapid, discret și profesionist. Deratizare, dezinsecție și dezinfecție pentru locuințe, firme și agricultură în București și Ilfov.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
