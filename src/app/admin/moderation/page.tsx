import { prisma } from "@/lib/db";
import { ShieldAlert, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default async function ModerationAdminPage() {
  const actions = await prisma.moderationAction.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      moderator: true,
      user: true
    },
    take: 50
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-[#D00000]" />
          Moderasyon İşlemleri
        </h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#99999F] bg-black/20">
              <th className="p-4 font-medium">MODERATÖR</th>
              <th className="p-4 font-medium">KULLANICI</th>
              <th className="p-4 font-medium">AKSİYON TÜRÜ</th>
              <th className="p-4 font-medium">SEBEP</th>
              <th className="p-4 font-medium">TARİH</th>
            </tr>
          </thead>
          <tbody>
            {actions.length > 0 ? actions.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{a.moderator?.username || 'Sistem'}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-[#D00000]">{a.user?.username || 'Bilinmiyor'}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold capitalize text-yellow-500">
                    {a.actionType}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-[#99999F] max-w-xs truncate">{a.reason}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-[#99999F]">
                    {new Date(a.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#99999F]">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4 opacity-50" />
                  Henüz bir moderasyon aksiyonu bulunmuyor. Platform temiz!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
