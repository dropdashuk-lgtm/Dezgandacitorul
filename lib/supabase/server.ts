import { createClient } from "@supabase/supabase-js";

// Client admin, disponibil doar pe server. Returnează `null` dacă variabilele
// de mediu Supabase nu sunt configurate, pentru a permite rularea locală
// fără o bază de date conectată (vezi supabase/schema.sql).
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
