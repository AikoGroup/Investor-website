import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/meetAika',
  '/api/chat',
  '/api/notify-invest'
];

// Define public routes that don't need authentication
const publicRoutes = [
  '/login',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/images'
];

export function middleware(request: NextRequest) {
  // Add pathname to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Check if the route is public
  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  // Check if the route needs protection
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    // Check both standard and secure session tokens
    const token = request.cookies.get('next-auth.session-token') || 
                 request.cookies.get('__Secure-next-auth.session-token');

    if (!token) {
      // Store the original URL to redirect back after login
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: [
    '/meetAika',
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
