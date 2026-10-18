"use client";

import Link from "next/link";
import { 
  Trophy, 
  Gamepad2, 
  Users, 
  Bell, 
  CalendarDays, 
  Activity,
  ArrowRight,
  Target,
  Flame,
  Award
} from "lucide-react";

export default function DashboardClient({ user, stats }: { user: any, stats: any }) {
  // Use DB stats if available, otherwise fallback
  const points = stats?.points || 0;
  const matches = stats?.matchesPlayed || 0;
  const winRate = stats?.matchesPlayed ? Math.round((stats.wins / stats.matchesPlayed) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-white">
            Hoş Geldin, <span className="text-[#FF1F2D]">{user.username}</span>
          </h1>
          <p className="text-secondary-text mt-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Platform istatistiklerin ve güncel özetin
          </p>
        </div>
        <Link href={`/u/${user.username}`} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-medium transition-all flex items-center gap-2 hover:border-primary-red/50">
          Profili Görüntüle <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* QUICK STATS - CREATIVE OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden group hover:border-primary-red/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy className="w-16 h-16 text-primary-red" />
          </div>
          <p className="text-secondary-text text-sm font-medium mb-1 relative z-10">Kazanılan Puan</p>
          <p className="text-3xl font-bold text-white font-heading relative z-10">{points.toLocaleString()}</p>
        </div>

        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Gamepad2 className="w-16 h-16 text-blue-500" />
          </div>
          <p className="text-secondary-text text-sm font-medium mb-1 relative z-10">Oynanan Maç</p>
          <p className="text-3xl font-bold text-white font-heading relative z-10">{matches}</p>
        </div>

        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden group hover:border-orange-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-16 h-16 text-orange-500" />
          </div>
          <p className="text-secondary-text text-sm font-medium mb-1 relative z-10">Kazanma Oranı</p>
          <p className="text-3xl font-bold text-white font-heading relative z-10">%{winRate}</p>
        </div>

        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-16 h-16 text-purple-500" />
          </div>
          <p className="text-secondary-text text-sm font-medium mb-1 relative z-10">Takım / Ekip</p>
          <p className="text-3xl font-bold text-white font-heading relative z-10">
            {(user.teamMemberships?.length || 0) + (user.crewMemberships?.length || 0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN FEED / RECENT ACTIVITY */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-panel border border-border/50 rounded-2xl p-6 h-full min-h-[300px] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-red/50 to-transparent"></div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-red" /> İlerleme & Hedefler
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-secondary/10 rounded-xl border border-white/5">
              <Award className="w-12 h-12 text-secondary-text mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-white mb-2">Sezon Henüz Başlamadı</h3>
              <p className="text-secondary-text text-sm max-w-sm">Aktif turnuvalara katılarak veya takımınızla antrenman (scrim) atarak istatistiklerinizi buradan takip edebilirsiniz.</p>
              <Link href="/tournaments" className="mt-6 px-6 py-2 bg-primary-red text-white text-sm font-medium rounded-lg hover:bg-deep-red transition-colors inline-block">
                Turnuvalara Göz At
              </Link>
            </div>
          </section>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div className="space-y-6">
          
          {/* NOTIFICATIONS WIDGET */}
          <section className="bg-panel border border-border/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary-red" /> Bildirimler
              </h2>
              <Link href="/notifications" className="text-xs text-secondary-text hover:text-white transition-colors">Tümünü Gör</Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-secondary/20 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 text-xs font-bold">ATE</span>
                </div>
                <div>
                  <p className="text-sm text-white leading-snug">Hoş geldin! Profilini tamamlayarak takımlara katılmaya hemen başlayabilirsin.</p>
                  <span className="text-[10px] text-secondary-text mt-1 block">Az önce</span>
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS WIDGET */}
          <section className="bg-panel border border-border/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary-red" /> Yaklaşan Etkinlikler
              </h2>
            </div>
            <div className="p-4 bg-secondary/10 rounded-xl border border-white/5 text-center">
              <p className="text-sm text-secondary-text mb-3">Kayıt olduğun bir etkinlik bulunmuyor.</p>
              <Link href="/events" className="text-xs text-primary-red hover:text-white transition-colors font-medium">Etkinlikleri Keşfet &rarr;</Link>
            </div>
          </section>

          {/* PROFILE COMPLETION WIDGET */}
          <section className="bg-panel border border-border/50 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-3">Profil Tamamlama</h2>
            <div className="w-full bg-secondary rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-gradient-to-r from-[#D00000] to-[#FF1F2D] h-full rounded-full relative" style={{ width: `${stats?.profileCompletion || 60}%` }}>
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-secondary-text">%{(stats?.profileCompletion || 60)} Tamamlandı</span>
              <Link href={`/u/${user.username}`} className="text-primary-red hover:text-white transition-colors font-medium">Detaylar</Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}