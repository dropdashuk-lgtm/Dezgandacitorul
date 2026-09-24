import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function getDocumentSignedUrl(storagePath: string, expiresInSeconds = 3600) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.storage.from("dz-documents").createSignedUrl(storagePath, expiresInSeconds);
  if (error) return null;
  return data.signedUrl;
}
