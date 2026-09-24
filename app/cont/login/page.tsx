import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Autentificare", robots: { index: false } };

export default function ContLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-heading text-2xl font-bold text-center">Autentificare</h1>
      <div className="mt-6">
        <LoginForm redirectTo="/cont" />
      </div>
      <p className="mt-4 text-center text-sm text-foreground/60">
        Nu ai cont?{" "}
        <Link href="/cont/inregistrare" className="font-semibold text-brand hover:underline">
          Creează cont
        </Link>
      </p>
    </div>
  );
}
