import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

const protectedRoutes = ["/dashboard", "/profile"]
const authRoutes = ["/login", "/register"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  )

  // No token + trying to access protected route → redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Has token → verify it
  if (token) {
    try {
      await jwtVerify(token, SECRET)

      // Valid token + trying to access login/register → redirect to dashboard
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch {
      // Invalid or expired token → clear cookie and redirect to login
      if (isProtected) {
        const response = NextResponse.redirect(
          new URL("/login", request.url)
        )
        response.cookies.delete("token")
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}