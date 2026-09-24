import { createSupabaseServerClient, getSupabaseAdmin } from "@/lib/supabase/server";

export async function getAuthedUser() {
  const sessionClient = await createSupabaseServerClient();
  if (!sessionClient) return null;
  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  return user;
}

// Verifică sesiunea + rolul ADMIN direct în ruta API (independent de middleware).
export async function requireAdmin() {
  const user = await getAuthedUser();
  if (!user) return null;

  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const { data: profile } = await admin.from("dz_profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "ADMIN") return null;

  return user;
}

// Returnează rândul din dz_customers legat de utilizatorul autentificat curent.
export async function getOwnCustomer() {
  const user = await getAuthedUser();
  if (!user) return null;

  const admin = getSupabaseAdmin();
  if (!admin) return null;

  const { data: customer } = await admin.from("dz_customers").select("*").eq("user_id", user.id).maybeSingle();
  return { user, customer };
}
