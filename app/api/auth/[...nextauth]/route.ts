import { authOptions } from '@/config/auth';
import { type NextApiRequest, type NextApiResponse } from 'next';
import NextAuth, { type AuthOptions } from 'next-auth';

const handler = NextAuth(authOptions) as (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: AuthOptions
) => Promise<void> | undefined;

export { handler as GET, handler as POST };
