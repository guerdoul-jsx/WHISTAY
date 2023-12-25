import { SignoutBtn } from '@/components/test/signout-btn';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/lib/auth';

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <section className="flex h-screen flex-col">
      <Heading as="h1">HOME PAGE</Heading>

      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <h1>Current User: {user ? user.email : 'Null'}</h1>
        {user && <SignoutBtn />}
      </div>
    </section>
  );
}
