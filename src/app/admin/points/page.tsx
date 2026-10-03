import { prisma } from "@/lib/db";
import { Plus, Edit2, Trash2, Coins } from "lucide-react";

export default async function PointsAdminPage() {
  const transactions = await prisma.pointTransaction.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true
    },
    take: 50
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">Puan Geçmişi</h1>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Manuel Puan Ekle</span>
        </button>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#99999F] bg-black/20">
              <th className="p-4 font-medium">KULLANICI</th>
              <th className="p-4 font-medium">TÜR / AÇIKLAMA</th>
              <th className="p-4 font-medium">MİKTAR</th>
              <th className="p-4 font-medium">TARİH</th>
              <th className="p-4 font-medium text-right">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? transactions.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{t.user?.username || 'Bilinmiyor'}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white capitalize">{t.type}</div>
                  <div className="text-xs text-[#99999F] mt-1">{t.description}</div>
                </td>
                <td className="p-4">
                  <div className={`text-sm font-bold flex items-center gap-1 \${t.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <Coins className="w-4 h-4" />
                    {t.amount > 0 ? '+' : ''}{t.amount}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-[#99999F]">
                    {new Date(t.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-[#99999F] hover:text-[#D00000] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#99999F]">Henüz puan işlemi bulunmuyor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
