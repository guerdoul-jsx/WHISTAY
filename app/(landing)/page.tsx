'use client';

import Image from 'next/image';
import logoImg from '@/public/logo.svg';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { Heading } from '@/components/ui/heading';
import { PasswordInput } from '@/components/auth/password-input';

export default function Home() {
  return (
    <section className="flex flex-col">
      <Heading as="h1">HOME PAGE</Heading>
      <OAuthButtons isSignIn={false} isSocialLoginActive />
      <PasswordInput />
    </section>
  );
}
