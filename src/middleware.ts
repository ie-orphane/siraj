import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { data } = await supabase.from("base").select("maintenance").single();

  if (data && data.maintenance && request.nextUrl.pathname !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  if (
    data &&
    !data.maintenance &&
    request.nextUrl.pathname === "/maintenance"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
