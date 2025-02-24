import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add pathname to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Check if the request is for the meetAika page
  if (request.nextUrl.pathname === '/meetAika') {
    const token = request.cookies.get('next-auth.session-token');
    if (!token) {
      // Redirect to login if no session token found
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/meetAika',
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
