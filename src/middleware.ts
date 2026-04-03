import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key');

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Protect the Fusion Dashboard specifically
  if (request.nextUrl.pathname.startsWith('/services/skillhub/dashboard')) {
    if (!session) {
      // Direct access attempt without session -> Redirect to login
      return NextResponse.redirect(new URL('/services/skillhub', request.url));
    }

    try {
      // Validate the token (will fail if expired > 30 minutes)
      await jwtVerify(session, secret);
      return NextResponse.next();
    } catch (e) {
      // Invalid or expired session -> Redirect to login
      const response = NextResponse.redirect(new URL('/services/skillhub', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

// Ensure middleware only runs for relevant routes
export const config = {
  matcher: ['/services/skillhub/dashboard/:path*'],
};
