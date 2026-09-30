import React from 'react';
import { prisma } from '@/lib/db';
import { Search, Plus, Eye, Edit2, FileText, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';

export default async function NewsManagementPage() {
  const user = await getCurrentUser();
  const isModerator = user?.roles?.some((ur: any) => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(ur.role.name));

  const rawNews = await prisma.newsPost.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const news = rawNews.map(n => ({
    id: n.id,
    title: n.title,
    category: n.category,
    date: n.createdAt.toLocaleDateString('tr-TR'),
    status: n.isDraft ? 'Taslak' : 'Yayında',
    views: Math.floor(Math.random() * 500) // Mock view count for now
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">Haber Yönetimi (CMS)</h1>
        {isModerator && (
          <Link href="/admin/news/new" className="bg-primary-red hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Yeni Haber Yaz
          </Link>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Haber başlığı veya kategori ara..." 
              className="w-full bg-[#1A1A24] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-secondary focus:outline-none focus:border-primary-red transition-colors"
            />
          </div>
          
          <select className="bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-red transition-colors cursor-pointer appearance-none">
            <option value="all">Tüm Kategoriler</option>
            <option value="esports">E-Spor</option>
            <option value="game">Oyun</option>
            <option value="tournament">Turnuva</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-secondary border-b border-white/10 bg-[#0B0B0D]">
                <th className="px-6 py-4 font-medium">Haber Başlığı</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Görüntülenme</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#1A1A24] border border-white/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="font-medium text-white">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-secondary border border-white/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Yayında' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-secondary hover:text-white bg-white/5 rounded-md hover:bg-white/10 transition-colors" title="Görüntüle">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-blue-400 hover:text-blue-300 bg-blue-400/10 rounded-md hover:bg-blue-400/20 transition-colors" title="Düzenle">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-primary-red hover:text-red-400 bg-primary-red/10 rounded-md hover:bg-primary-red/20 transition-colors" title="Sil">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {news.length === 0 && (
            <div className="text-center py-12 text-secondary">
              Hiç haber bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
