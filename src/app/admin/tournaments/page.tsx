import { prisma } from "@/lib/db";
import { Trophy, Plus, Edit2, Trash2, Users, Calendar } from "lucide-react";
import Link from "next/link";

export default async function TournamentsAdminPage() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      game: true,
      _count: {
        select: {
          teams: true,
          players: true
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">Turnuvalar</h1>
        <Link href="/admin/tournaments/new" className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Yeni Turnuva</span>
        </Link>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#99999F] bg-black/20">
              <th className="p-4 font-medium">TURNUVA ADI & OYUN</th>
              <th className="p-4 font-medium">DURUM</th>
              <th className="p-4 font-medium">TARİH</th>
              <th className="p-4 font-medium">KATILIMCI</th>
              <th className="p-4 font-medium text-right">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.length > 0 ? tournaments.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-[#99999F] mt-1 flex items-center gap-2">
                    <Trophy className="w-3 h-3" />
                    {t.game.name}
                  </div>
                </td>
                <td className="p-4">
                  <span className={px-2 py-1 text-xs font-bold rounded uppercase \}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    {new Date(t.startDate).toLocaleDateString('tr-TR')}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-secondary" />
                    {t._count.teams} / {t.maxTeams || 'Limitsiz'} Takım
                  </div>
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
                <td colSpan={5} className="p-8 text-center text-[#99999F]">Henüz turnuva bulunmuyor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
