import { type NavItem, type NavItemFooter } from '@/types';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const links = {
  twitter: 'https://twitter.com/mguerdoul',
  linkedin: 'https://www.linkedin.com/in/mahmoudguerdoul',
  discord: '',
  authorsWebsite: 'https://guerdoul.com',
  authorsGitHub: 'https://github.com/guerdoul-jsx',
  openGraphImage: 'https://guerdoul.com/images/opengraph-image.png',
};

export const siteConfig = {
  name: 'Whistay',
  description:
    'An open-source Property Managements, full-stack projects with advanced authentication and several database configurations.',
  links,
  url: 'https://whistay.com',
  ogImage: links.openGraphImage,
  author: 'mahmoudguerdoul',
  hostingRegion: 'fra1',
  keywords: ['Hotels', 'Restaurants', 'Agencies'],
  navItemsFooter: [
    {
      title: 'Company',
      items: [
        {
          title: 'About',
          href: '/about',
          external: false,
        },
        {
          title: 'Privacy Policy',
          href: '/privacy',
          external: false,
        },
        {
          title: 'Terms of Servies',
          href: '/tos',
          external: false,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'FAQ',
          href: '/faq',
          external: false,
        },
        {
          title: 'Blog',
          href: '/blog',
          external: false,
        },
        {
          title: 'Contact us',
          href: '/contact',
          external: false,
        },
      ],
    },
    {
      title: 'Inspiration',
      items: [
        {
          title: 'Shadcn',
          href: 'https://ui.shadcn.com/',
          external: true,
        },
        {
          title: 'Taxonomy',
          href: 'https://tx.shadcn.com/',
          external: true,
        },
        {
          title: 'Skateshop',
          href: 'https://skateshop.sadmn.com/',
          external: true,
        },
        {
          title: 'Acme Corp',
          href: 'https://acme-corp.jumr.dev/',
          external: true,
        },
      ],
    },
  ] satisfies NavItemFooter[],
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Whistay` : siteConfig.name,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Whistay` : title,
      description,
      url: 'https://guerdoul.com',
      siteName: 'Whistay',
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
