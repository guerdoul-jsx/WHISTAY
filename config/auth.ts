import { getUserByEmail } from '@/actions/user';
import prisma from '@/db';
import { env } from '@/ts-env.mjs';

import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { compare } from 'bcryptjs';
import type { Session, User, Profile, Account, AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'mahmoud@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '************',
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const user = await getUserByEmail(credentials.email);

        if (!user) return null;

        const passwordValid = await compare(
          credentials.password,
          String(user.passwordHash)
        );

        return passwordValid ? user : null;
      },
    }),
  ],
  jwt: {
    encode({ secret, token }) {
      if (!token) throw new Error('No token to encode');
      return jwt.sign(token, secret);
    },
    decode({ secret, token }) {
      if (!token) throw new Error('No token to decode');
      const decodedToken = jwt.verify(token, secret);
      return typeof decodedToken === 'string'
        ? (JSON.parse(decodedToken) as JWT)
        : decodedToken;
    },
  },
  callbacks: {
    jwt(params: {
      token: JWT;
      user?: User | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.email = params.user.email;
        params.token.id = params.user?.id;
      }

      return params.token;
    },
    session(params: { session: Session; token: JWT; user: User }) {
      if (params.session.user) {
        params.session.user.email = params.token.email!;
        params.session.user.id = params.token.id as string;
      }

      return params.session;
    },
  },
};
