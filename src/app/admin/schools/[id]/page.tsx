import React from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function SchoolDetailsAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const school = await prisma.school.findUnique({
    where: { id },
    include: {
      representative: { include: { user: true } },
      profiles: { include: { user: true } }
    }
  });

  if (!school) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/schools" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">{school.name} Detayları</h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-secondary text-sm">İlçe / İl</h3>
            <p className="text-white font-medium">{school.district} / {school.city}</p>
          </div>
          <div>
            <h3 className="text-secondary text-sm">Kayıtlı Oyuncu</h3>
            <p className="text-white font-medium">{school.profiles.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Temsilci</h2>
        {school.representative ? (
          <p className="text-[#99999F]">{school.representative.user.username}</p>
        ) : (
          <p className="text-[#99999F]">Atanmış temsilci yok.</p>
        )}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Oyuncular</h2>
        {school.profiles.length > 0 ? (
          <ul className="space-y-2">
            {school.profiles.map(p => (
              <li key={p.id} className="text-[#99999F]">{p.user.username}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[#99999F]">Kayıtlı oyuncu yok.</p>
        )}
      </div>
    </div>
  );
}
