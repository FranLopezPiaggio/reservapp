import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ==========================================
  // TENANT ID FROM JWT (Edge)
  // ==========================================
  // Extract tenant_id from JWT app_metadata without DB call
  const session = await supabase.auth.getSession();
  const tenantIdFromJWT = session.data.session?.user?.app_metadata?.tenant_id;

  if (tenantIdFromJWT) {
    // Add tenant_id to request headers for use in Server Actions
    response.headers.set("x-tenant-id", tenantIdFromJWT);
  }

  // Protected routes - redirect to login if no session
  if (request.nextUrl.pathname.startsWith("/cms") && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Public routes - redirect to dashboard if authenticated
  if (
    (request.nextUrl.pathname.startsWith("/auth/login") ||
      request.nextUrl.pathname.startsWith("/auth/register")) &&
    user
  ) {
    return NextResponse.redirect(new URL("/cms/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};