"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Trophy, 
  Gamepad2, 
  Users, 
  Medal, 
  Bell, 
  CalendarDays, 
  FileText, 
  Clock,
  ArrowRight,
  X
} from "lucide-react";

function AddGameModal({ 
  isOpen, 
  onClose,
  onSave
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (game: { name: string; tag: string }) => void;
}) {
  const [selectedGame, setSelectedGame] = useState("VALORANT");
  const [tag, setTag] = useState("");
  
  if (!isOpen) return null;

  const getLabel = () => {
    switch (selectedGame) {
      case "VALORANT": return "Riot ID (Örn: Player#TAG)";
      case "CS2": return "Steam ID / Faceit";
      case "LEAGUE OF LEGENDS": return "Riot ID";
      case "FC 25": return "EA ID";
      default: return "ID";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tag.trim()) return;
    onSave({ name: selectedGame, tag: tag.trim() });
    setTag("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-panel border border-border/50 rounded-xl p-6 w-full max-w-md m-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold font-heading text-primary-text">Oyun Profili Ekle</h2>
          <button onClick={onClose} className="text-secondary-text hover:text-primary-text transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">Oyun Seç</label>
            <select 
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red"
            >
              <option value="VALORANT">VALORANT</option>
              <option value="CS2">CS2</option>
              <option value="LEAGUE OF LEGENDS">LEAGUE OF LEGENDS</option>
              <option value="FC 25">FC 25</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">{getLabel()}</label>
            <input 
              type="text" 
              required
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Örn: Player#TR1" 
              className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red" 
            />
          </div>
          
          <div className="pt-4 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-secondary border border-border/50 text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              İptal
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DashboardClient({ user, stats, teams, applications }: any) {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [userGames, setUserGames] = useState<Array<{ name: string; tag: string }>>([
    { name: "VALORANT", tag: "Player#TR1" }
  ]);
  const username = user?.username || "User";

  const handleAddGame = (game: { name: string; tag: string }) => {
    setUserGames(prev => [...prev.filter(g => g.name !== game.name), game]);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary-text">
          Welcome back, {username}. 👋
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ATE Score", value: "1,250", icon: Trophy, color: "text-primary-red" },
          { label: "Maçlar", value: "34", icon: Gamepad2, color: "text-accent-red" },
          { label: "Takımlar", value: "2", icon: Users, color: "text-primary-text" },
          { label: "Başarılar", value: "8", icon: Medal, color: "text-warning" },
        ].map((stat, i) => (
          <div key={i} className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-sm font-medium text-secondary-text">{stat.label}</span>
            </div>
            <span className="text-3xl font-bold font-heading text-primary-text">{stat.value}</span>
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-current opacity-[0.03] rounded-full ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Takım Durumu */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-red" />
              Takım Durumu
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-secondary-text" />
              </div>
              <h3 className="text-lg font-medium text-primary-text mb-2">Henüz takımın yok.</h3>
              <p className="text-sm text-secondary-text mb-6 max-w-sm">
                Bir takıma katılarak turnuvalarda yer alabilir, scrim maçlarına çıkabilirsin.
              </p>
              <Link href="/teams" className="px-6 py-2 bg-primary-red text-primary-text font-medium rounded-lg hover:bg-deep-red transition-colors">
                Takım Bul
              </Link>
            </div>
          </section>

          {/* Yaklaşan Etkinlikler */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary-red" />
              Yaklaşan Etkinlikler
            </h2>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-secondary-text mb-4">Henüz etkinliğe katılmadın.</p>
              <Link href="/events" className="text-primary-red hover:text-accent-red font-medium text-sm flex items-center gap-1">
                Etkinlikleri Keşfet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Oyun Profilleri */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-heading text-primary-text flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary-red" />
                Oyun Profilleri
              </h2>
              {userGames.length > 0 && (
                <button 
                  onClick={() => setIsGameModalOpen(true)}
                  className="text-xs bg-primary-red/10 text-primary-red hover:bg-primary-red hover:text-white px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  + Oyun Ekle
                </button>
              )}
            </div>
            
            {userGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userGames.map((game, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary-red/10 flex items-center justify-center font-bold text-xs text-primary-red">
                        {game.name.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary-text leading-tight">{game.name}</p>
                        <p className="text-xs text-secondary-text font-mono">{game.tag}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                      Bağlı
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-secondary-text mb-4">Henüz oyun profili eklemedin.</p>
                <button 
                  onClick={() => setIsGameModalOpen(true)}
                  className="px-6 py-2 bg-secondary border border-border/50 text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  Oyun Ekle
                </button>
              </div>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-8">
          {/* Aktif Bildirimler */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-heading text-primary-text flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary-red" />
                Bildirimler
              </h2>
              <Link href="/notifications" className="text-xs text-primary-red hover:text-accent-red font-medium">
                Tümünü Gör
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-primary-text" />
                </div>
                <div>
                  <p className="text-sm text-primary-text">Hoş geldin! Profilini tamamlayarak daha fazla özellikten faydalanabilirsin.</p>
                  <span className="text-xs text-secondary-text mt-1 block">Az önce</span>
                </div>
              </div>
            </div>
          </section>

          {/* Başvurularım */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <h2 className="text-lg font-bold font-heading text-primary-text mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-red" />
              Başvurularım
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-primary-text">VALORANT Oyun Liderliği</span>
                </div>
                <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">Bekliyor</span>
              </div>
            </div>
          </section>

          {/* Profil Tamamlama */}
          <section className="bg-panel border border-border/50 rounded-xl p-6">
            <h2 className="text-lg font-bold font-heading text-primary-text mb-4">Profil Tamamlama</h2>
            <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
              <div className="bg-primary-red h-2.5 rounded-full" style={{ width: `${stats.profileCompletion}%` }}></div>
            </div>
            <p className="text-sm text-secondary-text mb-4">{stats.profileCompletion}% Tamamlandı</p>
            <Link href="/settings" className="text-sm text-primary-red hover:text-accent-red font-medium flex items-center gap-1">
              Profilini Tamamla <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>

      <AddGameModal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)} 
        onSave={handleAddGame}
      />
    </div>
  );
}
