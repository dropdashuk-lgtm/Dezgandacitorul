import { createClient } from "@supabase/supabase-js";

// Client anonim, doar-citire, pentru date publice (ex. prețuri servicii) —
// nu necesită sesiune sau cheia service_role.
export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, { auth: { persistSession: false } });
}
