'use client';

import * as React from 'react';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import OrSeparation from './or-seperation';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

interface OAuthButtonsProps {
  isSignIn: boolean;
  isSocialLoginActive: boolean;
}

export function OAuthButtons({
  isSignIn,
  isSocialLoginActive,
}: OAuthButtonsProps): JSX.Element {
  const { toast } = useToast();

  async function handleOAuthSignIn(provider: string): Promise<void> {
    try {
      const signInResponse = await signIn(provider, {
        callbackUrl: `${window.location.origin}`,
        redirect: false,
      });

      if (signInResponse) {
        if (signInResponse.ok) {
          // TODO: ADD TOAST HERE
          toast({ title: 'Success!', description: 'You are now signed in' });
        } else {
          // TODO: ADD TOAST HERE
          toast({
            title: 'Something went wrong',
            description: 'Please try again',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      // TODO: ADD TOAST HERE

      console.error(error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  }

  return (
    <>
      {isSocialLoginActive && (
        <>
          <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 md:pb-7">
            <Button
              className="h-11 w-full"
              variant="outline"
              onClick={() => void handleOAuthSignIn('facebook')}
            >
              <BsFacebook className="me-2 h-5 w-5 shrink-0 text-[#1877f2]" />
              <span className="truncate">
                {isSignIn ? 'Signin' : 'Signup'} With Facebook
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full"
              onClick={() => void handleOAuthSignIn('google')}
            >
              <FcGoogle className="me-2 h-5 w-5 shrink-0" />
              <span className="truncate">
                {' '}
                {isSignIn ? 'Signin' : 'Signup'} With Google
              </span>
            </Button>
          </div>
          <OrSeparation
            title={`Or, Sign ${isSignIn ? 'in' : 'up'} with your email`}
            isCenter
            className="mb-4"
          />
        </>
      )}
    </>
  );
}
