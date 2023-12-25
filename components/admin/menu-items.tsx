import {
  PiCurrencyDollarDuotone,
  PiPackageDuotone,
  PiShoppingCartDuotone,
  PiSquaresFourDuotone,
  PiUserGearDuotone,
} from 'react-icons/pi';

export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <PiSquaresFourDuotone />,
  },
  {
    name: 'Apps Kit',
  },
  {
    name: 'Categories',
    href: '#',
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: 'Categories',
        href: '/dashboard/categories',
      },
      {
        name: 'Create Category',
        href: '/dashboard/categories/create',
      },
    ],
  },
  {
    name: 'Users',
    href: '#',
    icon: <PiUserGearDuotone />,
    dropdownItems: [
      {
        name: 'Users',
        href: '/dashboard/users',
      },
      {
        name: 'Create User',
        href: '/dashboard/users/create',
      },
    ],
  },
  {
    name: 'Establishments',
    href: '#',
    icon: <PiPackageDuotone />,
    dropdownItems: [
      {
        name: 'Establishments',
        href: '/dashboard/establishments',
      },
      {
        name: 'Create Establishment',
        href: '/dashboard/establishments/create',
      },
    ],
  },
  {
    name: 'Subscriptions',
    href: '#',
    icon: <PiCurrencyDollarDuotone />,
    dropdownItems: [
      {
        name: 'Subscriptions',
        href: '/dashboard/subscriptions',
      },
      {
        name: 'Create Subscription',
        href: '/dashboard/subscriptions/create',
      },
    ],
  },
];
