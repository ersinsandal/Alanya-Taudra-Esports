import { prisma } from "@/lib/db";
import { Plus, Edit2, Trash2, Image as ImageIcon, Video } from "lucide-react";

export default async function MediaAdminPage() {
  const media = await prisma.mediaItem.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white uppercase">Medya Kütüphanesi</h1>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Yeni Dosya Yükle</span>
        </button>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden p-6">
        {media.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((item) => (
              <div key={item.id} className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#050505] aspect-square flex flex-col items-center justify-center">
                {item.type === 'IMAGE' ? (
                  <ImageIcon className="w-12 h-12 text-[#99999F] mb-2" />
                ) : (
                  <Video className="w-12 h-12 text-[#99999F] mb-2" />
                )}
                <span className="text-xs text-[#99999F] truncate w-full px-2 text-center">{item.title || 'İsimsiz Medya'}</span>
                
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                     <Edit2 className="w-4 h-4" />
                   </button>
                   <button className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#99999F]">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Medya kütüphanesinde henüz dosya yok.</p>
          </div>
        )}
      </div>
    </div>
  );
}
