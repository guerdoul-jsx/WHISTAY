import AuthWraper from '@/components/auth/auth-wraper';
import { UpdatePasswordForm } from '@/components/forms/update-password-form';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { getUserByResetPasswordToken } from '@/actions/user';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { RiArrowLeftLine } from 'react-icons/ri';

interface PasswordUpdatePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function UpdatePassword({
  searchParams,
}: PasswordUpdatePageProps): Promise<JSX.Element> {
  if (searchParams.token) {
    const user = getUserByResetPasswordToken(String(searchParams.token));

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
                      Invalid Reset Password Token
                    </AlertTitle>
                    <AlertDescription>
                      Please return to the sign in page and try again
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
    return (
      <AuthWraper
        isSignin={false}
        isSocialLoginActive={false}
        title={
          <>
            <span className="bg-gradient-to-r from-[#27963C] to-[#80CC28] bg-clip-text text-transparent">
              Update Password
            </span>
          </>
        }
      >
        <UpdatePasswordForm resetPasswordToken={String(searchParams.token)} />
      </AuthWraper>
    );
  } else {
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
                    Missing Reset Password Token
                  </AlertTitle>
                  <AlertDescription>
                    Please return to the sign in page and try again
                  </AlertDescription>
                </div>
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
