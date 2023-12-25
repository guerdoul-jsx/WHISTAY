// import CreateCategory from '@/app/shared/ecommerce/category/create-category';
import PageHeader from '../../shared/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const pageHeader = {
  title: 'Create A Category',
  breadcrumb: [
    {
      href: '/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/dashboard/categories',
      name: 'Categories',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateCategoryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href="/dashboard/categories"
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
      {/* <CreateCategory /> */}
    </>
  );
}
