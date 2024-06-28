import type { NextAuthConfig } from 'next-auth';
 
const http = process.env.NEXT_PUBLIC_BASE_URL || '/';

console.log('====================',http,'========================')

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl?.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const redirectUrl = nextUrl ? new URL('/dashboard',nextUrl) : new URL('/dashboard', http);
        return Response.redirect(redirectUrl.href);
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
