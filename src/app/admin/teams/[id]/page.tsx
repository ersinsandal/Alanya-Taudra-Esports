import React from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Shield, ArrowLeft, Gamepad2, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth/session';
import TeamRolesClient from './team-roles-client';
import DeleteTeamButton from './delete-team-button';

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const isSuperAdmin = user?.roles?.some((ur: any) => ur.role.name === 'SUPER_ADMIN') || false;

  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      game: true,
      members: {
        include: {
          user: true
        }
      }
    }
  });

  const dbRoles = await prisma.role.findMany({
    select: { name: true, displayName: true }
  });

  if (!team) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/teams" className="p-2 text-secondary hover:text-white bg-panel border border-white/10 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary-red" />
          {team.name}
        </h1>
        {isSuperAdmin && <DeleteTeamButton teamId={team.id} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Takım Bilgileri</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-secondary uppercase tracking-wider font-bold">Oyun</label>
                <div className="flex items-center gap-2 mt-1 text-white">
                  <Gamepad2 className="w-4 h-4 text-primary-red" />
                  <span className="font-medium">{team.game.name}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-secondary uppercase tracking-wider font-bold">Durum</label>
                <div className="mt-1">
                  {team.isOpen ? (
                    <span className="text-emerald-400 font-medium">Aktif</span>
                  ) : (
                    <span className="text-red-400 font-medium">Pasif</span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-secondary uppercase tracking-wider font-bold">Açıklama</label>
                <p className="mt-1 text-sm text-[#99999F]">{team.description || 'Açıklama yok.'}</p>
              </div>
            </div>
          </div>
          
          <TeamRolesClient 
            teamId={team.id} 
            initialRoles={team.approverRoles} 
            availableRoles={dbRoles}
            isSuperAdmin={isSuperAdmin} 
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-red" />
                Takım Kadrosu ({team.members.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#99999F]">
                <thead className="text-xs uppercase bg-white/5 text-white border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Kullanıcı Adı</th>
                    <th className="px-6 py-4">Rol</th>
                    <th className="px-6 py-4">Katılım Tarihi</th>
                    <th className="px-6 py-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {team.members.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{m.user.username}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          m.role === 'CAPTAIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          'bg-white/5 text-secondary border-white/10'
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">{m.joinedAt.toLocaleDateString('tr-TR')}</td>
                      <td className="px-6 py-4 text-right">
                        {isSuperAdmin && (
                           <button className="text-xs font-medium text-primary-red hover:text-red-400">Çıkar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {team.members.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-secondary">
                        Bu takımda henüz oyuncu bulunmuyor.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
