import { Footer, Sidemenu, TopMenu } from '@/components';
import { auth } from '@/auth';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <TopMenu
        isAuthenticated={!!session?.user}
        userName={session?.user?.name ?? undefined}
      />
      <Sidemenu
        isAuthenticated={!!session?.user}
        isAdmin={session?.user?.role === 'admin'}
      />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
