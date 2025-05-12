import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })
    
    // Refresh session if expired
    await supabase.auth.getSession()
    
    // Check if user is authenticated and trying to access a protected route
    const {
      data: { session },
    } = await supabase.auth.getSession()
    
    const isProtectedRoute = req.nextUrl.pathname !== '/login'
    const isAuthRoute = req.nextUrl.pathname === '/login'
    
    if (!session && isProtectedRoute) {
      // Redirect to login if accessing protected route without session
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }
    
    if (session && isAuthRoute) {
      // Redirect to home if accessing login page with active session
      const redirectUrl = new URL('/', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    console.error('Middleware error:', error)
    
    // On error, redirect to login but don't create an infinite loop
    if (req.nextUrl.pathname !== '/login') {
      const redirectUrl = new URL('/login', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
} 