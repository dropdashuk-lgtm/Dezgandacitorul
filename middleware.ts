import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];
const PUBLIC_CONT_PATHS = ["/cont/login", "/cont/inregistrare"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fără Supabase configurat, nu blocăm dezvoltarea locală.
  if (!supabaseUrl || !supabaseAnonKey) return response;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !PUBLIC_ADMIN_PATHS.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const { data: profile } = await supabase
      .from("dz_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "ADMIN") {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("eroare", "acces-interzis");
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/cont") && !PUBLIC_CONT_PATHS.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("/cont/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/cont/:path*"],
};
