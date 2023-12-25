import Image from 'next/image';
import logoImg from '@/public/logo.svg';

import { siteConfig } from '@/config/website';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
  className?: string;
}

export default function Logo({
  iconOnly = false,
  className,
  ...props
}: IconProps) {
  if (iconOnly) {
    return (
      <Image
        src={logoImg}
        alt={siteConfig.name}
        className={cn('h-10 w-20 object-cover', className)}
      />
    );
  } else {
    return (
      <div className="flex items-center">
        <Image
          src={logoImg}
          alt={siteConfig.name}
          className="h-10 w-20 object-cover"
        />
        <span className="text-xl font-bold uppercase tracking-widest text-gray-700 dark:text-foreground ">
          {siteConfig.name}
        </span>
      </div>
    );
  }
}
