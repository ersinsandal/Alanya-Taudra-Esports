import { prisma } from "@/lib/db";
import { Plus, Edit2, Trash2, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default async function EventsAdminPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: 'desc' },
    include: {
      _count: {
        select: { registrations: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">Etkinlikler</h1>
        <Link href="/admin/events/new" className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Yeni Etkinlik</span>
        </Link>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs text-[#99999F] bg-black/20">
              <th className="p-4 font-medium">ETKİNLİK ADI</th>
              <th className="p-4 font-medium">TÜR / LOKASYON</th>
              <th className="p-4 font-medium">TARİH</th>
              <th className="p-4 font-medium">KATILIMCI</th>
              <th className="p-4 font-medium text-right">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? events.map((e) => (
              <tr key={e.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{e.title}</div>
                  <div className="text-sm text-[#99999F] mt-1 line-clamp-1">{e.description}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white capitalize">{e.type}</div>
                  <div className="text-xs text-[#99999F] mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {e.location || 'Online'}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    {new Date(e.startDate).toLocaleDateString('tr-TR')}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-white">
                    {e._count.registrations} Kişi
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
                <td colSpan={5} className="p-8 text-center text-[#99999F]">Henüz etkinlik bulunmuyor.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
