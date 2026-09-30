import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value
  const { pathname } = request.nextUrl
  
  // Public routes that don't need authentication
  const publicRoutes = [
    '/', '/about', '/teams', '/players', '/tournaments', 
    '/schools', '/academy', '/news', '/media', '/events', 
    '/community', '/join', '/partners', '/contact',
    '/school-league', '/campus', '/leaderboard', '/representative'
  ]
  
  // Auth routes that authenticated users shouldn't see
  const authRoutes = ['/login', '/register', '/forgot-password']
  
  const isPublicRoute = 
    publicRoutes.includes(pathname) || 
    pathname === '/crews' ||
    pathname.startsWith('/u/') ||
    pathname.startsWith('/teams/') ||
    pathname.startsWith('/schools/') ||
    pathname.startsWith('/tournaments/') ||
    pathname.startsWith('/matches/') ||
    pathname.startsWith('/news/') ||
    pathname.startsWith('/events/') ||
    pathname.startsWith('/academy/')

  const isAuthRoute = authRoutes.includes(pathname)

  // Handle explicit logout param
  if (request.nextUrl.searchParams.has('logout')) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('session_token')
    response.cookies.delete('refresh_token')
    return response
  }

  // Needs auth check
  if (!sessionToken && !isPublicRoute && !isAuthRoute) {
    // If it's a protected route like /dashboard, /settings, /admin and no session
    return NextResponse.redirect(new URL('/login', request.url))
  }

  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - static files with extensions (png, svg, jpg, ico, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|txt)$).*)',
  ],
}
