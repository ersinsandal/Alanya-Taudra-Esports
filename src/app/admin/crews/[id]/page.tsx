import React from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CrewDetailsAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const crew = await prisma.crew.findUnique({
    where: { id },
    include: {
      game: true,
      members: { include: { user: true } },
      leaders: { include: { user: true } }
    }
  });

  if (!crew) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/crews" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">{crew.name} Detayları</h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-secondary text-sm">Bağlı Oyun</h3>
            <p className="text-white font-medium">{crew.game.name}</p>
          </div>
          <div>
            <h3 className="text-secondary text-sm">Üye Sayısı</h3>
            <p className="text-white font-medium">{crew.members.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Liderler</h2>
        {crew.leaders.length > 0 ? (
          <ul className="space-y-2">
            {crew.leaders.map(l => (
              <li key={l.id} className="text-[#99999F]">{l.user.username}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[#99999F]">Atanmış lider yok.</p>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Üyeler</h2>
        {crew.members.length > 0 ? (
          <ul className="space-y-2">
            {crew.members.map(m => (
              <li key={m.id} className="text-[#99999F]">{m.user.username}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[#99999F]">Ekipte henüz üye yok.</p>
        )}
      </div>
    </div>
  );
}
