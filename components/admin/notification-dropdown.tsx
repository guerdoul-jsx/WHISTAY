'use client';

import { RefObject, useState } from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Heading } from '@/components/ui/heading';
import { Badge } from '@/components/ui/badge';
import TruckSolidIcon from '@/components/local/icons/truck-solid';
import BrushSolidIcon from '@/components/local/icons/brush-solid';
import CubeSolidIcon from '@/components/local/icons/cube-solid';
import FileStackIcon from '@/components/local/icons/file-stack';
import CloudTaskIcon from '@/components/local/icons/cloud-task';
import ShoppingBagSolidIcon from '@/components/local/icons/shopping-bag-solid';
import BulbSolidIcon from '@/components/local/icons/bulb-solid';
import ParcelMapIcon from '@/components/local/icons/parcel-map';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/admin/simplebar';
import { PiCheck } from 'react-icons/pi';
import { Button } from '../ui/button';

dayjs.extend(relativeTime);

const data = [
  {
    id: 1,
    name: 'Invitation for crafting engaging designs',
    icon: <BrushSolidIcon />,
    unRead: true,
    sendTime: '2023-06-01T09:35:31.820Z',
  },
  {
    id: 2,
    name: 'Isomorphic dashboard redesign',
    icon: <CubeSolidIcon />,
    unRead: true,
    sendTime: '2023-05-30T09:35:31.820Z',
  },
  {
    id: 3,
    name: '3 New Incoming Project Files:',
    icon: <FileStackIcon />,
    unRead: false,
    sendTime: '2023-06-01T09:35:31.820Z',
  },
  {
    id: 4,
    name: 'Swornak purchased isomorphic',
    icon: <ShoppingBagSolidIcon />,
    unRead: false,
    sendTime: '2023-05-21T09:35:31.820Z',
  },
  {
    id: 5,
    name: 'Task #45890 merged with #45890 in “Ads Pro Admin Dashboard project:',
    icon: <CloudTaskIcon />,
    unRead: true,
    sendTime: '2023-06-01T09:35:31.820Z',
  },
  {
    id: 6,
    name: '3 new application design concepts added',
    icon: <BulbSolidIcon />,
    unRead: true,
    sendTime: '2023-05-15T09:35:31.820Z',
  },
  {
    id: 7,
    name: 'Your order has been placed',
    icon: <ParcelMapIcon />,
    unRead: false,
    sendTime: '2023-05-16T09:35:31.820Z',
  },
  {
    name: 'Order has been shipped to #123221',
    icon: <TruckSolidIcon />,
    unRead: false,
    sendTime: '2023-05-01T09:35:31.820Z',
  },
];

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <Heading as="h5">Notifications</Heading>
        <div className="flex items-center space-x-2">
          <Button
            variant="link"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Mark All As Read
          </Button>
        </div>
      </div>
      <SimpleBar className="max-h-[420px]">
        <div className="grid cursor-pointer grid-cols-1 gap-1">
          {data.map((item) => (
            <div
              key={item.name + item.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50 dark:hover:text-gray-950"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gray-100/70 p-1 dark:bg-gray-50/50 [&>svg]:h-auto [&>svg]:w-5">
                {item.icon}
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Heading
                    as="h6"
                    className="mb-0.5 w-11/12 truncate text-sm font-semibold"
                  >
                    {item.name}
                  </Heading>
                  <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                    {/* @ts-ignore */}
                    {dayjs(item.sendTime).fromNow(true)}
                  </span>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item.unRead ? (
                    <Badge
                      variant="destructive"
                      className="h-2 w-2 scale-90 rounded-full p-0"
                    />
                  ) : (
                    <span className="inline-block rounded-full bg-gray-100 p-0.5 dark:bg-gray-50 dark:text-gray-950">
                      <PiCheck className="h-auto w-[9px]" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SimpleBar>
    </>
  );
}

export default function NotificationDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      //   shadow="sm"
      //   placement={isMobile ? 'bottom' : 'bottom-end'}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className=" w-[320px] text-left shadow-md sm:w-[360px] 2xl:w-[420px] dark:border-0 dark:bg-gray-500/50 dark:text-gray-50 dark:shadow-md"
        align="end"
      >
        <NotificationsList setIsOpen={setIsOpen} />
      </PopoverContent>
    </Popover>
  );
}
