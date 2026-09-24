import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Creează cont", robots: { index: false } };

export default function InregistrarePage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-heading text-2xl font-bold text-center">Creează cont</h1>
      <p className="mt-2 text-center text-sm text-foreground/60">
        Ai acces la programări, documente și cereri urgente.
      </p>
      <div className="mt-6">
        <SignupForm />
      </div>
      <p className="mt-4 text-center text-sm text-foreground/60">
        Ai deja cont?{" "}
        <Link href="/cont/login" className="font-semibold text-brand hover:underline">
          Autentificare
        </Link>
      </p>
    </div>
  );
}
