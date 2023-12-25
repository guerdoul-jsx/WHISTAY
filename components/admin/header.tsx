'use client';

import Link from 'next/link';
import RingBellSolidIcon from '@/components/local/icons/ring-bell-solid';
import NotificationDropdown from '@/components/admin/notification-dropdown';
import { Button } from '@/components/ui/button';
import ProfileMenu from '@/components/admin/profile-menu';
import Sidebar from '@/components/admin/sidebar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import { useSession } from 'next-auth/react';

import dynamic from 'next/dynamic';
import { useMedia } from '@/hooks/use-media';
import { Skeleton } from '../ui/skeleton';

const SheetContainer = dynamic(
  () => import('@/components/admin/SheetContainer'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-9 rounded-md xl:hidden " />,
  }
);

const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), {
  ssr: false,
});

function HeaderMenuRight() {
  const { data: session, status } = useSession();

  const user = session?.user;

  if (user) {
    return (
      <div className="ms-auto grid shrink-0 grid-cols-3 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
        <NotificationDropdown>
          <Button
            aria-label="Notification"
            variant="outline"
            size="icon"
            className="relative h-[34px] w-[34px] border-0 shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-500/50 dark:hover:bg-gray-400/90"
          >
            <RingBellSolidIcon className="h-[18px] w-auto dark:text-gray-50" />
            <Badge className="absolute right-2.5 top-2.5 h-2 w-2 -translate-y-1/3 translate-x-1/2 bg-yellow-500 p-0" />
          </Button>
        </NotificationDropdown>
        <ThemeToggle className="relative h-[34px] w-[34px] border-0 shadow backdrop-blur-md md:h-9 md:w-9 dark:bg-gray-500/50 dark:hover:bg-gray-400/90" />
        <ProfileMenu user={user} />
      </div>
    );
  }
}

export default function Header() {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  const isMobile = useMedia('(max-width: 480px)', false);
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex items-center px-4 py-4 backdrop-blur-xl md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10',
        ((isMounted && windowScroll.y) as number) > 2 ? 'card-shadow' : ''
      )}
    >
      <div className="flex w-full max-w-2xl items-center">
        <SheetContainer
          view={
            <Sidebar className="static w-full 2xl:w-full dark:border-gray-300" />
          }
          placement="left"
        />

        <Link
          href={'/'}
          aria-label="Site Logo"
          className="me-4 w-9 flex-1 shrink-0 lg:me-5 xl:hidden"
        >
          <Logo
            iconOnly={isMobile ? true : false}
            className={isMobile ? 'h-8 w-16' : ''}
          />
        </Link>
      </div>
      <HeaderMenuRight />
    </header>
  );
}
