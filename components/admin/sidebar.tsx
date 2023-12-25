'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import SimpleBar from '@/components/admin/simplebar';
import { menuItems } from './menu-items';
import Logo from '@/components/logo';
import { PiCaretDownBold } from 'react-icons/pi';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] 2xl:w-72',
        className
      )}
    >
      <div className="bg-gray-0/10 sticky top-0 z-40 px-6 py-3 2xl:px-8 2xl:pt-6 ">
        <Link href={'/'} aria-label="Site Logo">
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 pb-3 3xl:mt-6">
          {menuItems.map((item, index) => {
            const isActive = pathname === (item?.href as string);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              (dropdownItem) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);
            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <>
                    {item.dropdownItems ? (
                      <>
                        <Accordion type="multiple" className="w-full">
                          <AccordionItem value={item.name} className="border-0">
                            <AccordionTrigger
                              className={cn(
                                'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:no-underline lg:my-1 2xl:mx-5 2xl:my-2 dark:text-gray-200 dark:hover:bg-gray-50 dark:hover:text-background [&>svg]:-rotate-90',
                                isDropdownOpen
                                  ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-[#27963C] 2xl:before:-start-5'
                                  : 'text-gray-900 transition-colors duration-200 hover:bg-gray-200'
                              )}
                            >
                              <span className="flex items-center ">
                                {item?.icon && (
                                  <span
                                    className={cn(
                                      'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                                      isDropdownOpen
                                        ? 'dark:text-gray-200'
                                        : 'text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-500'
                                    )}
                                  >
                                    {item?.icon}
                                  </span>
                                )}
                                {item.name}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              {item?.dropdownItems?.map(
                                (dropdownItem, index) => {
                                  const isChildActive =
                                    pathname === (dropdownItem?.href as string);

                                  return (
                                    <Link
                                      href={dropdownItem?.href}
                                      key={dropdownItem?.name + index}
                                      className={cn(
                                        'mx-3.5 mb-0.5 flex items-center rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                                        isChildActive
                                          ? 'text-[#27963C]'
                                          : 'text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500'
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                          isChildActive
                                            ? 'bg-primary ring-[1px] ring-primary'
                                            : 'opacity-40'
                                        )}
                                      />{' '}
                                      {dropdownItem?.name}
                                    </Link>
                                  );
                                }
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </>
                    ) : (
                      <Link
                        href={item?.href}
                        className={cn(
                          'group relative mx-3 my-0.5 flex items-center rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-200'
                        )}
                      >
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[19px] [&>svg]:w-[19px]',
                              isActive
                                ? 'text-primary'
                                : 'text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-500'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        {item.name}
                      </Link>
                    )}
                  </>
                ) : (
                  <Heading
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-6 text-[11px] font-medium uppercase tracking-widest text-gray-500 2xl:px-8 dark:text-gray-200',
                      index !== 0 && 'mt-6 3xl:mt-7'
                    )}
                  >
                    {item.name}
                  </Heading>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
