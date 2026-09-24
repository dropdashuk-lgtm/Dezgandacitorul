import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

// Client legat de sesiunea utilizatorului curent (cookie-uri), respectă RLS.
// Folosit în Server Components / Route Handlers pentru date scopate ("datele mele").
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // apelat dintr-o Server Component — cookie-ul e reîmprospătat de middleware
        }
      },
    },
  });
}
