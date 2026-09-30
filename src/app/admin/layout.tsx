import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { getCurrentUser } from '@/lib/auth/session';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Check if user has any of the admin-level roles
  let highestRole: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'GAME_LEADER' | 'USER' = 'USER';
  
  const hasRole = (roleName: string) => user.roles?.some((ur: any) => ur.role.name === roleName);

  if (hasRole('SUPER_ADMIN')) {
    highestRole = 'SUPER_ADMIN';
  } else if (hasRole('ADMIN')) {
    highestRole = 'ADMIN';
  } else if (hasRole('MODERATOR')) {
    highestRole = 'MODERATOR';
  } else if (hasRole('GAME_LEADER')) {
    highestRole = 'GAME_LEADER';
  }

  if (highestRole === 'USER') {
    // Regular users cannot access admin panel
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar userRole={highestRole} userName={user.username || "Yetkili"} />
      <div className="flex-1 flex flex-col lg:pl-[260px] transition-all duration-300">
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
