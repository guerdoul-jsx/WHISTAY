import PageHeader from '../../shared/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const pageHeader = {
  title: 'Create A Etablishments',
  breadcrumb: [
    {
      href: '/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/dashboard/etablishments',
      name: 'Etablishments',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateEtablishments() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href="/dashboard/etablishments"
          className="mt-4 w-full lg:mt-0 lg:w-auto"
        >
          <Button
            className="w-full border-border lg:w-auto dark:hover:bg-border"
            variant="outline"
          >
            Cancel
          </Button>
        </Link>
      </PageHeader>
      {/* <CreateEtablishments /> */}
    </>
  );
}
