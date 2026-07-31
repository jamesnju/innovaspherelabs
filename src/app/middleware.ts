// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthToken, getCurrentUser } from './services/auth.server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define routes
  const adminRoutes = ['/admin'];
  const dashboardRoutes = ['/dashboard'];
  const authRoutes = ['/login', '/signup', '/forgot-password'];
  const publicRoutes = ['/', '/about', '/contact', '/pricing', '/blog'];
  
  // Get token and user
  const token = await getAuthToken();
  const user = await getCurrentUser();
  
  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'SUPER_ADMIN';

  // Handle admin routes
  if (adminRoutes.some(route => path.startsWith(route))) {
    if (!isAuthenticated) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Handle dashboard routes
  if (dashboardRoutes.some(route => path.startsWith(route))) {
    if (!isAuthenticated) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  // Handle auth routes (redirect if already authenticated)
  if (authRoutes.some(route => path === route)) {
    if (isAuthenticated) {
      if (isAdmin) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/api/:path*',
  ],
};

// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
  
//   // Define protected routes
//   const adminRoutes = ['/admin'];
//   const dashboardRoutes = ['/dashboard'];
//   const authRoutes = ['/login', '/signup', '/forgot-password'];
  
//   // Get token using NextAuth with proper typing
//   const token = await getToken({ 
//     req: request as any, // Type assertion to fix version mismatch
//     secret: process.env.NEXTAUTH_SECRET,
//   });
  
//   // Check if user is authenticated
//   const isAuthenticated = !!token;
  
//   // Check if user is admin
//   const isAdmin = token?.role === 'super_admin';
  
//   // Handle admin routes
//   if (adminRoutes.some(route => path.startsWith(route))) {
//     if (!isAuthenticated) {
//       const url = new URL('/login', request.url);
//       url.searchParams.set('callbackUrl', path);
//       return NextResponse.redirect(url);
//     }
//     if (!isAdmin) {
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//   }
  
//   // Handle dashboard routes
//   if (dashboardRoutes.some(route => path.startsWith(route))) {
//     if (!isAuthenticated) {
//       const url = new URL('/login', request.url);
//       url.searchParams.set('callbackUrl', path);
//       return NextResponse.redirect(url);
//     }
//     if (isAdmin) {
//       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     }
//   }
  
//   // Handle auth routes (redirect if already authenticated)
//   if (authRoutes.some(route => path === route)) {
//     if (isAuthenticated) {
//       if (isAdmin) {
//         return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//       }
//       return NextResponse.redirect(new URL('/dashboard', request.url));
//     }
//   }
  
//   // Rate limiting for API routes
//   if (path.startsWith('/api/')) {
//     // Add rate limiting logic here
//     // Using Upstash or similar service
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/',
//     '/admin/:path*',
//     '/dashboard/:path*',
//     '/login',
//     '/signup',
//     '/forgot-password',
//     '/api/auth/:path*',
//     '/api/:path*',
//   ],
// };