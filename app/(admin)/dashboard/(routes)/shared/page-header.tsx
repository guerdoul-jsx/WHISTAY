import { Heading } from '@/components/ui/heading';
import Breadcrumb from '@/components/admin/breadcrumb';
import { cn } from '@/lib/utils';

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header
      className={cn(
        'mb-6 flex flex-col xs:-mt-2 lg:mb-7 lg:flex-row lg:items-center lg:justify-between',
        className
      )}
    >
      <div>
        <Heading
          as="h2"
          className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px] dark:text-gray-200"
        >
          {title}
        </Heading>

        <Breadcrumb
          separator=""
          separatorVariant="circle"
          className="flex-wrap"
        >
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={item.name}
              {...(item?.href && { href: item?.href })}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
}
