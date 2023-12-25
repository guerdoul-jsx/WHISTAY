'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from '@/components/ui/sheet';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../ui/button';

interface SheetContainerProps {
  view: React.ReactNode;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

export default function SheetContainer({
  placement,
  view,
}: SheetContainerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="navbarIcon"
          className={cn('me-3 h-auto w-auto p-0 sm:me-4 lg:hidden')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side={placement}>
        <SheetHeader></SheetHeader>
        {view}
      </SheetContent>
    </Sheet>
  );
}
