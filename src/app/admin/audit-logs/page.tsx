import { Search, Filter, Shield, Clock, Terminal } from "lucide-react";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const user = await getCurrentUser();
  const roles = user?.roles?.map((r: any) => r.role?.name || r.role) || [];
  if (!roles.includes('SUPER_ADMIN') && !roles.includes('ADMIN') && !roles.includes('KURUCU_BASKAN')) {
    redirect('/admin');
  }

  const { q } = await searchParams;

  const logs = await prisma.auditLog.findMany({
    where: q ? {
      OR: [
        { action: { contains: q, mode: 'insensitive' } },
        { targetType: { contains: q, mode: 'insensitive' } },
        { actor: { username: { contains: q, mode: 'insensitive' } } }
      ]
    } : undefined,
    include: { actor: true },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  const getModuleBadge = (targetType: string | null) => {
    switch (targetType) {
      case 'Sistem Ayarları':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Kullanıcılar':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Takımlar':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Turnuvalar':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Sponsorlar':
      case 'Sponsor Başvuruları':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Giriş':
      case 'Kayıt':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Haberler':
      case 'Medya':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-white/5 text-secondary-text border-white/10';
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary-red" />
            SİSTEM LOGLARI
          </h1>
          <p className="text-secondary-text text-sm mt-1">Platformdaki tüm yönetici ve sistem aktiviteleri gerçek zamanlı denetim kaydı.</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
          Toplam {logs.length} Aktif Kayıt
        </div>
      </div>

      <div className="bg-panel border border-white/5 rounded-xl p-6">
        <form className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              placeholder="İşlem açıklaması, modül veya admin ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-secondary-text focus:outline-none focus:border-primary-red transition-colors text-sm"
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-primary-red hover:bg-deep-red font-semibold text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-lg shadow-primary-red/10">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </form>

        <div className="overflow-x-auto rounded-lg border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/40 text-xs text-secondary-text">
                <th className="p-4 font-semibold w-48">TARİH</th>
                <th className="p-4 font-semibold w-44">YÖNETİCİ / AKTÖR</th>
                <th className="p-4 font-semibold w-36">MODÜL</th>
                <th className="p-4 font-semibold">İŞLEM DETAYI</th>
                <th className="p-4 font-semibold w-32">IP ADRESİ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-xs text-secondary-text whitespace-nowrap">
                    <div className="flex items-center gap-2 font-mono">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(log.createdAt).toLocaleString('tr-TR')}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary-red shrink-0" />
                      <span className="font-bold text-sm text-white">{log.actor?.username || 'Sistem (Oto)'}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs rounded-full border font-medium ${getModuleBadge(log.targetType)}`}>
                      {log.targetType || 'Genel'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white/90">
                    <div>{log.action}</div>
                  </td>
                  <td className="p-4 text-xs text-secondary-text font-mono whitespace-nowrap">
                    {log.ipAddress || '127.0.0.1'}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary-text">
                    <Terminal className="w-8 h-8 text-secondary-text/40 mx-auto mb-2" />
                    Henüz kayıtlı bir sistem aktivitesi bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
