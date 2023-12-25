import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { JWT, getToken } from 'next-auth/jwt';
import { env } from '@/ts-env.mjs';
import jwt from 'jsonwebtoken';
const secret = env.NEXTAUTH_SECRET;

// This function can be marked `async` if using `await` inside
export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({
      req,
      secret,
      decode: async ({ token, secret, salt }) => {
        const decodedToken = jwt.verify(token!, secret);
        return typeof decodedToken === 'string'
          ? (JSON.parse(decodedToken) as JWT)
          : decodedToken;
      },
      raw: true,
    });

    const isAuth = !!token;
    // const isAuthPages =
    //   req.nextUrl.pathname.includes('/auth/signin') ||
    //   req.nextUrl.pathname.includes('/auth/signup') ||
    //   req.nextUrl.pathname.includes('/auth/reset-password') ||
    //   req.nextUrl.pathname.includes('/auth/verify-email') ||
    //   req.nextUrl.pathname.includes('/auth/update-password');
    const isAuthPages = req.nextUrl.pathname.includes('/auth');

    if (isAuthPages) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return null;
    }
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/auth/signin?from?=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
