import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  if (req.nextUrl.pathname.startsWith('/login') && !token) {
    return;
  }

  if (req.nextUrl.pathname.startsWith('/register') && !token) {
    return;
  }

  if (req.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard/:path*') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/', '/login', '/register', '/dashboard', '/dashboard/:path*'],
};
