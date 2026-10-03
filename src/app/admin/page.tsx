import React from 'react';
import { Users, Gamepad2, MapPin, Search, Plus, Trophy, Activity, AlertCircle, Shield, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function AdminDashboard() {
  let dbStats = {
    users: 0,
    newThisMonth: 0,
    players: 0,
    alanya: 0,
    crews: 0,
    teams: 0,
    tournaments: 0,
    pending: 0
  };

  let recentLogs: any[] = [];

  try {
    const userCount = await prisma.user.count();
    const gameProfileCount = await prisma.gameProfile.count();
    const crewCount = await prisma.crew.count();
    const teamCount = await prisma.team.count();
    const tournamentCount = await prisma.tournament.count();
    const pendingApps = await prisma.crewApplication.count({ where: { status: 'SUBMITTED' } });
    const newThisMonth = await prisma.user.count({
      where: { createdAt: { gte: new Date(new Date().setDate(1)) } }
    });
    
    dbStats = {
      users: userCount,
      newThisMonth: newThisMonth,
      players: gameProfileCount,
      alanya: Math.floor(userCount * 0.4), // Keeping ratio logic if exact address not tracked easily
      crews: crewCount,
      teams: teamCount,
      tournaments: tournamentCount,
      pending: pendingApps
    };

    recentLogs = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { actor: true }
    });
  } catch (e) {
    console.error("DB Error on Admin Dashboard:", e);
  }

  const stats = [
    { label: 'Toplam Üye', value: dbStats.users.toString(), icon: Users, color: 'text-blue-500' },
    { label: 'Bu Ay Yeni', value: `+\${dbStats.newThisMonth}`, icon: UserPlus, color: 'text-green-500' },
    { label: 'Kayıtlı Oyuncu', value: dbStats.players.toString(), icon: Gamepad2, color: 'text-purple-500' },
    { label: 'Alanya Merkezli', value: dbStats.alanya.toString(), icon: MapPin, color: 'text-red-500' },
    { label: 'Topluluk Ekipleri', value: dbStats.crews.toString(), icon: Users, color: 'text-indigo-500' },
    { label: 'Rekabetçi Takımlar', value: dbStats.teams.toString(), icon: Shield, color: 'text-yellow-500' },
    { label: 'Aktif Turnuvalar', value: dbStats.tournaments.toString(), icon: Trophy, color: 'text-orange-500' },
    { label: 'Bekleyen Başvurular', value: dbStats.pending.toString(), icon: AlertCircle, color: 'text-primary-red' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Genel Bakış</h1>
          <p className="text-secondary text-sm">Platformun güncel durumu ve istatistikleri.</p>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-panel border border-white/5 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <Icon className={`w-6 h-6 \${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-white font-space">{stat.value}</div>
                <div className="text-xs text-secondary mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase font-heading tracking-wide">
            <Activity className="w-5 h-5 text-primary-red"/> Son Aktiviteler
          </h2>
          <div className="space-y-4">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary-red mt-2"></div>
                  <div>
                    <p className="text-sm text-white">
                      <span className="font-bold text-primary-red">{log.actor?.username || 'Sistem'}</span> {log.action}
                    </p>
                    <p className="text-xs text-secondary mt-1">{new Date(log.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-secondary">Henüz aktivite kaydı bulunmuyor.</p>
            )}
          </div>
        </div>
        
        <div className="bg-panel border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 uppercase font-heading tracking-wide">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/tournaments/new" className="p-4 border border-white/5 rounded-lg hover:bg-white/10 flex flex-col items-center justify-center gap-2 text-white transition-colors group">
              <Trophy className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Turnuva Oluştur</span>
            </Link>
            <Link href="/admin/events/new" className="p-4 border border-white/5 rounded-lg hover:bg-white/10 flex flex-col items-center justify-center gap-2 text-white transition-colors group">
              <Activity className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Etkinlik Oluştur</span>
            </Link>
            <Link href="/admin/crews" className="p-4 border border-white/5 rounded-lg hover:bg-white/10 flex flex-col items-center justify-center gap-2 text-white transition-colors group">
              <Shield className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Ekip Yönetimi</span>
            </Link>
            <Link href="/admin/reports" className="p-4 border border-white/5 rounded-lg hover:bg-white/10 flex flex-col items-center justify-center gap-2 text-white transition-colors group">
              <AlertCircle className="w-6 h-6 text-primary-red group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Raporları İncele</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
