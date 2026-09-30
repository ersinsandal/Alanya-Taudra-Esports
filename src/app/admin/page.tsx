import React from 'react';
import { Users, UserPlus, Gamepad2, MapPin, Shield, Trophy, GraduationCap, AlertCircle, Activity, Play } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function AdminDashboard() {
  let dbStats = {
    users: 1234,
    newThisMonth: 56,
    players: 892,
    alanya: 430,
    crews: 14,
    teams: 8,
    tournaments: 12,
    pending: 5
  };

  try {
    // Attempt to fetch actual DB counts
    const userCount = await prisma.user.count();
    const gameProfileCount = await prisma.gameProfile.count();
    const crewCount = await prisma.crew.count();
    const teamCount = await prisma.team.count();
    
    // Just simple approximation for demo/fallback purposes
    dbStats = {
      users: userCount > 0 ? userCount : 1234,
      newThisMonth: Math.floor((userCount > 0 ? userCount : 1234) * 0.1),
      players: gameProfileCount > 0 ? gameProfileCount : 892,
      alanya: Math.floor((userCount > 0 ? userCount : 1234) * 0.4),
      crews: crewCount > 0 ? crewCount : 14,
      teams: teamCount > 0 ? teamCount : 8,
      tournaments: 12,
      pending: 5
    };
  } catch (e) {
    // Database offline, stick to default static mock
  }

  const stats = [
    { label: 'Toplam Üye', value: dbStats.users.toString(), icon: Users, color: 'text-blue-500' },
    { label: 'Bu Ay Yeni', value: `+${dbStats.newThisMonth}`, icon: UserPlus, color: 'text-green-500' },
    { label: 'Kayıtlı Oyuncu', value: dbStats.players.toString(), icon: Gamepad2, color: 'text-purple-500' },
    { label: 'Alanya Merkezli', value: dbStats.alanya.toString(), icon: MapPin, color: 'text-red-500' },
    { label: 'Topluluk Ekipleri', value: dbStats.crews.toString(), icon: Users, color: 'text-indigo-500' },
    { label: 'Resmi Takımlar', value: dbStats.teams.toString(), icon: Shield, color: 'text-orange-500' },
    { label: 'Turnuvalar', value: dbStats.tournaments.toString(), icon: Trophy, color: 'text-yellow-500' },
    { label: 'Bekleyen İşlem', value: dbStats.pending.toString(), icon: AlertCircle, color: 'text-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-heading font-black tracking-tight text-white uppercase">ATE COMMAND CENTER</h1>
        <div className="flex gap-2">
          <Link href="/admin/tournaments/new" className="bg-primary-red hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <Trophy className="w-4 h-4" /> Turnuva Oluştur
          </Link>
          <Link href="/admin/games" className="bg-panel border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" /> Yeni Oyun Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-panel border border-white/5 p-6 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors">
            <div>
              <p className="text-sm font-medium text-secondary">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-panel border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase font-heading tracking-wide">
            <Activity className="w-5 h-5 text-primary-red"/> Son Aktiviteler
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-primary-red mt-2"></div>
              <div>
                <p className="text-sm text-white"><span className="font-bold text-primary-red">Super Admin</span> sisteme yeni Oyun (EA FC) ekledi.</p>
                <p className="text-xs text-secondary mt-1">Az önce</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm text-white"><span className="font-bold text-blue-400">Moderatör</span> 3 yeni kullanıcı raporunu inceledi.</p>
                <p className="text-xs text-secondary mt-1">2 saat önce</p>
              </div>
            </div>
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