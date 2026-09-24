import type { Metadata } from "next";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { ReviewForm } from "@/components/admin/review-form";
import { ReviewList } from "@/components/admin/review-list";

export const metadata: Metadata = { title: "Recenzii", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminRecenziiPage() {
  const supabase = getSupabaseAdmin();
  const { data: reviews } = supabase
    ? await supabase
        .from("dz_reviews")
        .select("id, author_name, rating, comment, approved")
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Recenzii</h1>
      <p className="mt-2 text-sm text-foreground/60">
        Adaugă aici doar recenzii reale, primite de la clienți (ex: copiate de pe Google Business). Doar
        cele publicate apar pe homepage.
      </p>
      <div className="mt-6">
        <ReviewForm />
      </div>
      <div className="mt-6">
        <ReviewList reviews={reviews ?? []} />
      </div>
    </div>
  );
}
