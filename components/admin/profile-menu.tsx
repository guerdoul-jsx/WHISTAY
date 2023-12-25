'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

const menuItems = [
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'Account Settings',
    href: '/settings',
  },
];

interface DropdownMenuProps {
  user: User;
}

function DropdownMenu({ user }: DropdownMenuProps) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="flex items-center border-b pb-4 pt-2">
        <Avatar>
          <AvatarImage
            src={
              user.image === null
                ? 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp'
                : user.image
            }
            className="!h-10 !w-10"
            alt={user.name}
          />
        </Avatar>
        <div className="ms-3">
          <Heading as="h6" className="font-semibold">
            {user.name}
          </Heading>
          <p className="text-xs text-gray-600 dark:text-gray-200">
            {user.email}
          </p>
        </div>
      </div>
      <div className="my-2 grid w-full font-medium text-gray-700 dark:text-foreground">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50 hover:dark:text-gray-900"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="w-full border-t">
        <Button
          variant="outline"
          className="my-2 block w-full border-0 px-2.5 py-2 text-start font-medium  text-foreground outline-none focus-within:text-foreground hover:bg-red-500 hover:text-gray-900 focus-visible:ring-0"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  user,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  user: User;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar>
            <AvatarImage
              src={
                user.image === null
                  ? 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp'
                  : user.image
              }
              className={cn('!h-10 !w-10', avatarClassName)}
              alt="profile"
            />
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 border-border" align="end">
        <DropdownMenu user={user} />
      </PopoverContent>
    </Popover>
  );
}
