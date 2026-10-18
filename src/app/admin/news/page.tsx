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
    views: n.viewCount || 0,
    link: n.body // Using body for external link
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
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-secondary border-b border-white/10 bg-[#0B0B0D]">
                <th className="px-6 py-4 font-medium">Haber Başlığı</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Tarih</th>
                <th className="px-6 py-4 font-medium">Görüntülenme</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">Dış Link</th>
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
                      <span className="font-medium text-white max-w-[200px] truncate">{item.title}</span>
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
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline max-w-[150px] truncate block" title={item.link}>
                          Linke Git
                        </a>
                      ) : (
                        <span className="text-xs text-[#99999F]">Link Yok</span>
                      )}
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
