import Link from "next/link";
import { Users, Search, Shield, Gamepad2, Ban, MoreVertical } from "lucide-react";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const user = await getCurrentUser();
  const roles = user?.roles?.map((r: any) => r.role.name) || [];
  if (!roles.includes('SUPER_ADMIN') && !roles.includes('ADMIN')) {
    redirect('/admin');
  }

  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: q ? {
      OR: [
        { username: { contains: q } },
        { email: { contains: q } },
        { ateId: { contains: q } }
      ]
    } : undefined,
    include: {
      roles: { include: { role: true } },
      gameProfiles: true
    },
    take: 50,
    orderBy: { createdAt: 'desc' }
  });

  const totalUsers = await prisma.user.count();
  const adminCount = await prisma.userRole.count({
    where: { role: { name: { in: ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'] } } }
  });
  const playerProfiles = await prisma.gameProfile.count();
  const bannedCount = await prisma.user.count({ where: { isBanned: true } });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading text-white">
          ÜYE YÖNETİMİ
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Toplam Üye</span>
          </div>
          <span className="text-3xl font-bold text-white">{totalUsers}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Yetkili Sayısı</span>
          </div>
          <span className="text-3xl font-bold text-white">{adminCount}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-medium">Oyun Profilleri</span>
          </div>
          <span className="text-3xl font-bold text-white">{playerProfiles}</span>
        </div>
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary-red">
            <Ban className="w-4 h-4" />
            <span className="text-sm font-medium">Uzaklaştırılanlar</span>
          </div>
          <span className="text-3xl font-bold text-white">{bannedCount}</span>
        </div>
      </div>

      <div className="bg-panel border border-white/5 rounded-xl p-6">
        <form className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="Kullanıcı adı, e-posta veya ATE ID ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-secondary focus:outline-none focus:border-white/30"
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors whitespace-nowrap">
            Ara
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs text-secondary">
                <th className="p-4 font-medium w-32">ATE ID</th>
                <th className="p-4 font-medium">KULLANICI ADI</th>
                <th className="p-4 font-medium">E-POSTA</th>
                <th className="p-4 font-medium">ROLLER</th>
                <th className="p-4 font-medium">DURUM</th>
                <th className="p-4 font-medium text-right">İŞLEMLER</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-xs font-mono text-secondary">{u.ateId || 'YOK'}</td>
                  <td className="p-4 font-bold text-white">
                    <Link href={/admin/users/\} className="hover:text-blue-400">
                      {u.username}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-secondary">{u.email}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.length > 0 ? u.roles.map(r => (
                        <span key={r.roleId} className="px-2 py-0.5 bg-white/10 text-white text-[10px] rounded uppercase font-bold">
                          {r.role.name}
                        </span>
                      )) : (
                        <span className="px-2 py-0.5 bg-white/10 text-white text-[10px] rounded uppercase font-bold">USER</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={px-2 py-1 text-xs font-bold rounded \}>
                      {u.isBanned ? 'BANNED' : 'ACTIVE'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-secondary hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
