import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Autentificare admin", robots: { index: false } };

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const forbidden = params?.eroare === "acces-interzis";

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-heading text-2xl font-bold text-center">Autentificare admin</h1>
      {forbidden && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          Acest cont nu are acces la panoul de administrare.
        </p>
      )}
      <div className="mt-6">
        <LoginForm redirectTo="/admin" />
      </div>
    </div>
  );
}
