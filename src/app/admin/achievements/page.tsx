import { prisma } from "@/lib/db";
import { Trophy, Plus, Edit2, Trash2 } from "lucide-react";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Rozet & Başarımlar</h1>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Yeni Rozet Oluştur</span>
        </button>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#99999F] bg-black/20">
              <th className="p-4 font-medium w-16 text-center">İKON</th>
              <th className="p-4 font-medium">ROZET ADI & AÇIKLAMA</th>
              <th className="p-4 font-medium">TÜR / PUAN</th>
              <th className="p-4 font-medium text-right">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody>
            {achievements.length > 0 ? achievements.map((badge) => (
              <tr key={badge.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-center">
                  <div className="w-10 h-10 bg-[#050505] border border-white/10 rounded-full flex items-center justify-center mx-auto text-[#D00000]">
                    <Trophy className="w-5 h-5" />
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-white">{badge.name}</div>
                  <div className="text-sm text-[#99999F] mt-1">{badge.description}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white capitalize">{badge.type}</div>
                  <div className="text-xs text-[#D00000] font-bold mt-1">+{badge.pointValue || 0} Puan</div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-[#99999F] hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-[#99999F] hover:text-[#D00000] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#99999F]">Henüz rozet eklenmedi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
