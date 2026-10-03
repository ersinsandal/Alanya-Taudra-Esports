import { Search, Filter, Shield, Activity, Clock, Terminal } from "lucide-react";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AuditLogsPage({
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

  const logs = await prisma.auditLog.findMany({
    where: q ? {
      OR: [
        { action: { contains: q } },
        { targetType: { contains: q } },
        { actor: { username: { contains: q } } }
      ]
    } : undefined,
    include: { actor: true },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white flex items-center gap-3">
            <Terminal className="w-8 h-8 text-secondary" />
            SİSTEM LOGLARI
          </h1>
          <p className="text-secondary mt-1">Platformdaki tüm yönetici ve sistem aktiviteleri.</p>
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
              placeholder="İşlem, modül veya admin ara..." 
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-secondary focus:outline-none focus:border-white/30"
            />
          </div>
          <button type="submit" className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs text-secondary">
                <th className="p-4 font-medium w-48">TARİH</th>
                <th className="p-4 font-medium">ADMİN / SİSTEM</th>
                <th className="p-4 font-medium">MODÜL</th>
                <th className="p-4 font-medium">İŞLEM</th>
                <th className="p-4 font-medium">IP ADRESİ</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm text-secondary flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {new Date(log.createdAt).toLocaleString('tr-TR')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary-red" />
                      <span className="font-bold text-white">{log.actor?.username || 'Sistem (Oto)'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-white/5 text-secondary text-xs rounded border border-white/10">
                      {log.targetType || 'Genel'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white">{log.action}</td>
                  <td className="p-4 text-sm text-secondary font-mono">{log.ipAddress || 'localhost'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-secondary">
                    Log kaydı bulunamadı.
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
