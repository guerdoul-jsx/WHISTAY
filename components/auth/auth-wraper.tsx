'use client';

import logoImg from '@/public/logo.svg';
import Link from 'next/link';
import Image from 'next/image';
import { OAuthButtons } from './oauth-buttons';
import { PiArrowLeftBold } from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { Heading } from '../ui/heading';

interface AuthWraperProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  isSocialLoginActive: boolean;
  isSignin: boolean;
  className?: string;
}

export default function AuthWraper({
  children,
  isSignin = false,
  isSocialLoginActive = false,
  title,
  className = '',
}: AuthWraperProps) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#27963C] to-[#80CC28] p-4 md:p-12 lg:p-28">
        <Link
          href={'/'}
          className="mb:pb-3 start-4 z-10 flex items-center justify-center pb-6 pt-3 text-sm font-medium text-white/80 hover:text-white md:absolute md:top-1/2 md:-translate-y-1/2 md:rounded-full "
        >
          <PiArrowLeftBold />
          <span className="-mt-px ms-1 font-lexend">Back to home</span>
        </Link>
        <div
          className={cn(
            'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50',
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link href={'/'} className="mb-7 inline-block max-w-[64px] lg:mb-9">
              <Image src={logoImg} alt="Isomorphic" />
            </Link>
            <Heading
              as="h2"
              className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
            >
              {title}
            </Heading>
          </div>
          <OAuthButtons
            isSignIn={isSignin}
            isSocialLoginActive={isSocialLoginActive}
          />
          {children}
        </div>
      </div>
    </>
  );
}
