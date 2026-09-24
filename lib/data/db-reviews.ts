import { getSupabasePublic } from "@/lib/supabase/public";

export interface PublicReview {
  id: string;
  author_name: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

// Recenzii reale, introduse de admin din /admin/recenzii — niciodată date inventate.
export async function getApprovedReviews(limit = 6): Promise<PublicReview[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("dz_reviews")
    .select("id, author_name, rating, comment, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data;
}
