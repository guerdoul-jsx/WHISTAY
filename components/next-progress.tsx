'use client';

import NextTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import * as NProgress from 'nprogress';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NextProgress({ ...props }: NextTopLoaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);
  return <NextTopLoader showSpinner={false} {...props} />;
}
