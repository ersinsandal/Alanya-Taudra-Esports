import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { getCurrentUser } from '@/lib/auth/session';

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Create a minimal user object matching UserType defined in navbar
  const navUser = {
    id: user.id,
    username: user.username,
    avatarUrl: user.profile?.avatarUrl || undefined,
    roles: user.roles?.map(r => r.role.name) || []
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <Navbar user={navUser} />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
