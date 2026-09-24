import { getSupabasePublic } from "@/lib/supabase/public";

export interface DbServicePrice {
  slug: string;
  base_price: number | null;
  price_note: string | null;
}

// Prețurile "sursă de adevăr" sunt în Supabase (editabile din /admin/preturi).
// Dacă Supabase nu e configurat sau rândul lipsește, paginile publice
// folosesc valorile statice din lib/data/services.ts.
export async function getServicePrices(): Promise<Record<string, DbServicePrice>> {
  const supabase = getSupabasePublic();
  if (!supabase) return {};

  const { data, error } = await supabase.from("dz_service_types").select("slug, base_price, price_note");
  if (error || !data) return {};

  return Object.fromEntries(data.map((row) => [row.slug, row]));
}

export function formatPriceLabel(basePrice: number | null, fallbackLabel: string) {
  if (basePrice === null || basePrice === undefined) return fallbackLabel;
  return `de la ${basePrice} lei`;
}
