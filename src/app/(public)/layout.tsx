import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { getCurrentUser } from '@/lib/auth/session';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser(); 
  
  // Create a minimal user object matching UserType defined in navbar
  const navUser = user ? {
    id: user.id,
    username: user.username,
    avatarUrl: user.profile?.avatarUrl || undefined,
    roles: user.roles?.map(r => r.role.name) || []
  } : null;

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar user={navUser} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
