import type { Account, Profile, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export interface SessionCallbackParams {
  session: Session;
  token: JWT;
  user: User;
}

export interface JWTCallbackParams {
  token: JWT;
  user?: User | undefined;
  account?: Account | null | undefined;
  profile?: Profile | undefined;
  isNewUser?: boolean | undefined;
}
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface NavItemFooter {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}
type ResponseApi = {
  message: string | Error;
  success: boolean;
  status: number;
};
