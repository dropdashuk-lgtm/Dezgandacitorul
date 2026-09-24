import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Clienți", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminClientiPage() {
  const supabase = getSupabaseAdmin();
  const { data: customers } = supabase
    ? await supabase
        .from("dz_customers")
        .select("id, name, phone, email, city, created_at")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Clienți</h1>

      <div className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/10 bg-white">
        {(customers ?? []).length === 0 && (
          <p className="px-5 py-6 text-sm text-foreground/60">Niciun client încă.</p>
        )}
        {(customers ?? []).map((customer) => (
          <Link
            key={customer.id}
            href={`/admin/clienti/${customer.id}`}
            className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-background"
          >
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-foreground/60">
                {customer.phone} {customer.email ? `· ${customer.email}` : ""} {customer.city ? `· ${customer.city}` : ""}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
          </Link>
        ))}
      </div>
    </div>
  );
}
