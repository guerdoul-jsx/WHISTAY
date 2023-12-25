import { type Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { markEmailAsVerified } from '@/actions/email';
import { getUserByEmailVerificationToken } from '@/actions/user';
import { env } from '@/ts-env.mjs';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { RiArrowLeftLine } from 'react-icons/ri';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { LuChevronDownCircle } from 'react-icons/lu';

import AuthWraper from '@/components/auth/auth-wraper';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Email Verification',
  description: 'Verify your email address to continue',
};

export interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps): Promise<JSX.Element> {
  const emailVerificationToken = searchParams.token as string;

  if (emailVerificationToken) {
    const user = await getUserByEmailVerificationToken(emailVerificationToken);

    if (!user) {
      return (
        <div className="flex min-h-screen w-full items-center justify-center">
          <AuthWraper
            isSignin={false}
            isSocialLoginActive={false}
            title={
              <>
                <Alert variant="destructive" className="flex space-x-3">
                  <ExclamationTriangleIcon className="mt-1 h-8 w-8" />
                  <div>
                    <AlertTitle className="text-red-600">
                      Invalid Email Verification Token
                    </AlertTitle>
                    <AlertDescription>
                      Please return to the sign up page and try again
                    </AlertDescription>
                  </div>
                </Alert>
              </>
            }
          >
            <Link
              aria-label="Go back to sign in page"
              href="/auth/signup"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'w-full bg-[#27963C] text-gray-50 hover:bg-[#80CC28]'
              )}
            >
              <RiArrowLeftLine className="mr-2 h-4 w-4" />
              <span className="sr-only">Try again</span>
              Try again
            </Link>
          </AuthWraper>
        </div>
      );
    }

    const updatedUser = await markEmailAsVerified(emailVerificationToken);
    if (!updatedUser) redirect('/auth/signup');

    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <AuthWraper
          isSignin={false}
          isSocialLoginActive={false}
          title={
            <>
              <Alert variant="success" className="flex space-x-3">
                <LuChevronDownCircle
                  className="mt-1 h-8 w-8 "
                  color="#27963C"
                />
                <div>
                  <AlertTitle className="text-green-600">
                    Email successfully verified
                  </AlertTitle>
                  <AlertDescription>
                    You can now sign in to your account
                  </AlertDescription>
                </div>
              </Alert>
            </>
          }
        >
          <Link
            aria-label="Go back to sign in page"
            href="/auth/signin"
            className={cn(
              buttonVariants(),
              'w-full bg-[#27963C] text-gray-50 hover:bg-[#80CC28]'
            )}
          >
            <span className="sr-only">Go to Sign In page</span>
            Go to Sign In page
          </Link>
        </AuthWraper>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <AuthWraper
          isSignin={false}
          isSocialLoginActive={false}
          title={
            <>
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>
                  Missing Email Verification Token.
                </AlertDescription>
              </Alert>
            </>
          }
        >
          <Link
            aria-label="Go back to sign up page"
            href="/auth/signup"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'w-full bg-[#27963C] text-gray-50 hover:bg-[#80CC28]'
            )}
          >
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            <span className="sr-only">Try again</span>
            Try again
          </Link>
        </AuthWraper>
      </div>
    );
  }
}
