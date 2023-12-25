import Header from '@/components/admin/header';
import Sidebar from '@/components/admin/sidebar';
import dynamic from 'next/dynamic';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextProgress color="#27963C" />
      <main className="flex min-h-screen flex-grow">
        <Sidebar className="fixed hidden border-e shadow-sm xl:block dark:border-gray-500/40" />
        <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
          <Header />
          <div className="flex flex-grow flex-col bg-gray-50 px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9 dark:bg-background">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
