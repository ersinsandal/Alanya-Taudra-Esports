"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Ban, 
  Save, 
  Loader2, 
  CheckCircle2, 
  UserCheck, 
  Target, 
  GraduationCap, 
  Phone, 
  Calendar, 
  MapPin,
  Gamepad2,
  Swords,
  Crown,
  Check,
  Info
} from "lucide-react";
import { updateUserAdmin } from "@/lib/actions/admin-users";

export default function EditUserClient({ 
  user, 
  allGames = [], 
  allTeams = [] 
}: { 
  user: any; 
  allGames?: any[]; 
  allTeams?: any[]; 
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(user.status);
  
  // Roles
  const currentRoles = user.roles?.map((r: any) => r.role.name) || [];
  const [roles, setRoles] = useState<string[]>(currentRoles);

  // Leader games
  const initialLeaderGames = user.crewLeaderships?.map((cl: any) => cl.crew?.gameId).filter(Boolean) || [];
  const [leaderGameIds, setLeaderGameIds] = useState<string[]>(initialLeaderGames);

  // Player games
  const initialPlayerGames = user.gameProfiles?.map((gp: any) => gp.gameId).filter(Boolean) || [];
  const [playerGameIds, setPlayerGameIds] = useState<string[]>(initialPlayerGames);

  // Captain teams
  const initialCaptainTeams = user.teamMemberships?.filter((tm: any) => tm.role === 'CAPTAIN').map((tm: any) => tm.teamId) || [];
  const [captainTeamIds, setCaptainTeamIds] = useState<string[]>(initialCaptainTeams);

  const availableRoles = [
    { id: "USER", label: "Üye" },
    { id: "PLAYER", label: "Oyuncu" },
    { id: "CAPTAIN", label: "Kaptan" },
    { id: "GAME_LEADER", label: "Oyun Lideri" },
    { id: "MODERATOR", label: "Moderatör" },
    { id: "ADMIN", label: "Yönetici" },
    { id: "SUPER_ADMIN", label: "Süper Admin" },
    { id: "KURUCU_BASKAN", label: "Kurucu Başkan" }
  ];

  const handleRoleToggle = (roleId: string) => {
    if (roles.includes(roleId)) {
      setRoles(roles.filter(r => r !== roleId));
    } else {
      setRoles([...roles, roleId]);
    }
  };

  const handleLeaderGameToggle = (gameId: string) => {
    setLeaderGameIds(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const handlePlayerGameToggle = (gameId: string) => {
    setPlayerGameIds(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const handleCaptainTeamToggle = (teamId: string) => {
    setCaptainTeamIds(prev => 
      prev.includes(teamId) ? prev.filter(id => id !== teamId) : [...prev, teamId]
    );
  };

  const handleSave = async () => {
    if (roles.includes("GAME_LEADER") && leaderGameIds.length === 0) {
      alert("Lütfen 'Oyun Lideri' rolü için en az bir oyun seçiniz.");
      return;
    }
    if (roles.includes("PLAYER") && playerGameIds.length === 0) {
      alert("Lütfen 'Oyuncu' rolü için en az bir oyun seçiniz.");
      return;
    }
    if (roles.includes("CAPTAIN") && captainTeamIds.length === 0) {
      alert("Lütfen 'Kaptan' rolü için en az bir takım seçiniz.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await updateUserAdmin(user.id, { 
        status, 
        roles,
        leaderGameIds,
        playerGameIds,
        captainTeamIds
      });
      if (res.success) {
        alert("Kullanıcı ve yetkileri başarıyla güncellendi.");
        router.refresh();
      } else {
        alert(res.error || "Güncelleme başarısız.");
      }
    } catch (e) {
      alert("Sistem hatası.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* LEFT COL: INFO & PURPOSES */}
      <div className="md:col-span-1 space-y-6">
        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-red to-[#FF1F2D]"></div>
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4 text-3xl font-bold text-white border border-white/10">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user.username}</h2>
            <p className="text-sm text-secondary-text mb-3">{user.email}</p>
            <div className="px-3 py-1 bg-primary-red/10 border border-primary-red/20 text-primary-red rounded-lg text-sm font-bold font-mono">
              {user.ateId}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs">
            <div className="flex justify-between items-center text-secondary-text">
              <span className="flex items-center gap-1.5"><UserCheck className="w-3.5 h-3.5 text-primary-red" /> Ad Soyad:</span>
              <span className="text-white font-medium">{user.profile?.firstName} {user.profile?.lastName}</span>
            </div>
            <div className="flex justify-between items-center text-secondary-text">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary-red" /> Telefon:</span>
              <span className="text-white font-medium">{user.phone || 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between items-center text-secondary-text">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary-red" /> Doğum Tarihi:</span>
              <span className="text-white font-medium">{user.profile?.birthDate ? new Date(user.profile.birthDate).toLocaleDateString('tr-TR') : 'Belirtilmedi'}</span>
            </div>
            <div className="flex justify-between items-center text-secondary-text">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary-red" /> Konum:</span>
              <span className="text-white font-medium">{user.profile?.city || (user.profile?.isAlanya ? 'Alanya' : user.profile?.country || 'Belirtilmedi')}</span>
            </div>
            {(user.profile?.school?.name || user.profile?.university?.name) && (
              <div className="flex justify-between items-center text-secondary-text">
                <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-primary-red" /> Okul:</span>
                <span className="text-white font-medium text-right truncate max-w-[150px]" title={user.profile?.school?.name || user.profile?.university?.name}>
                  {user.profile?.school?.name || user.profile?.university?.name}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-secondary-text">
              <span>Kayıt Tarihi:</span>
              <span className="text-white font-medium">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>

        {/* KAYIT AMAÇLARI & HEDEFLERİ (Sadece Süper Admin & Admin Görünümü) */}
        <div className="bg-panel border border-border/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary-red" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Kayıt Hedefleri & Amaçları
            </h3>
          </div>
          <p className="text-[11px] text-secondary-text mb-4">
            Bu üyenin kayıt olurken seçtiği ilgi alanları ve hedefleri (yalnızca yönetim paneline özeldir):
          </p>

          {user.profile?.purpose && user.profile.purpose.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.purpose.map((p: string, idx: number) => (
                <div 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-primary-red/10 border border-primary-red/30 text-white text-xs font-medium flex items-center gap-2 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-red"></span>
                  {p}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-center">
              <span className="text-xs text-secondary-text">Belirtilmiş bir hedef bulunmuyor.</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COL: EDIT CONTROLS */}
      <div className="md:col-span-2 space-y-6">
        
        {/* STATUS */}
        <div className="bg-panel border border-border/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <UserCheck className="w-5 h-5 text-primary-red" /> Hesap Durumu
          </h3>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setStatus("ACTIVE")}
              className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${status === "ACTIVE" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-black/40 border-white/5 text-secondary-text hover:border-white/10"}`}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold">Aktif</span>
            </button>
            <button 
              type="button"
              onClick={() => setStatus("BANNED")}
              className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${status === "BANNED" ? "bg-red-500/10 border-red-500/50 text-red-400" : "bg-black/40 border-white/5 text-secondary-text hover:border-white/10"}`}
            >
              <Ban className="w-6 h-6" />
              <span className="font-bold">Uzaklaştırıldı</span>
            </button>
          </div>
        </div>

        {/* ROLES */}
        <div className="bg-panel border border-border/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary-red" /> Roller & Yetkiler
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableRoles.map(r => {
              const isChecked = roles.includes(r.id);
              return (
                <label 
                  key={r.id} 
                  className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                    isChecked 
                      ? "bg-primary-red/10 border-primary-red/40 text-white shadow-sm" 
                      : "bg-black/40 border-white/5 text-secondary-text hover:border-white/15"
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={() => handleRoleToggle(r.id)}
                    className="w-4 h-4 rounded bg-black/50 border border-white/20 checked:bg-primary-red cursor-pointer" 
                  />
                  <span className="text-xs font-bold">{r.label}</span>
                </label>
              );
            })}
          </div>

          {/* 1. OYUN LİDERİ SEÇİM PANELİ */}
          {roles.includes("GAME_LEADER") && (
            <div className="mt-6 p-4 rounded-xl border border-primary-red/30 bg-primary-red/5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Gamepad2 className="w-4 h-4 text-primary-red" />
                  <span>Oyun Lideri Branşları</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300 font-normal">Kısıtlama Yok (Çoklu Seçim)</span>
                </div>
                <span className="text-xs font-mono font-bold text-primary-red">{leaderGameIds.length} oyun seçildi</span>
              </div>
              <p className="text-xs text-secondary-text">
                Bu kullanıcının liderlik edeceği espor oyunlarını seçiniz:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {allGames.map(game => {
                  const isSelected = leaderGameIds.includes(game.id);
                  return (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleLeaderGameToggle(game.id)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-medium cursor-pointer ${
                        isSelected 
                          ? 'border-primary-red bg-primary-red/20 text-white shadow-sm' 
                          : 'border-white/10 bg-panel text-secondary-text hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {game.icon && (
                        <img src={game.icon} alt={game.name} className="w-5 h-5 rounded object-cover shrink-0" />
                      )}
                      <span className="truncate flex-1 font-semibold">{game.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary-red shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. OYUNCU BRANŞ SEÇİM PANELİ */}
          {roles.includes("PLAYER") && (
            <div className="mt-4 p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Swords className="w-4 h-4 text-blue-400" />
                  <span>Oyuncu Branşları</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-gray-300 font-normal">Kısıtlama Yok (Çoklu Seçim)</span>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400">{playerGameIds.length} oyun seçildi</span>
              </div>
              <p className="text-xs text-secondary-text">
                Bu oyuncunun aktif olarak oynadığı espor branşlarını seçiniz:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1">
                {allGames.map(game => {
                  const isSelected = playerGameIds.includes(game.id);
                  return (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handlePlayerGameToggle(game.id)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs font-medium cursor-pointer ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/20 text-white shadow-sm' 
                          : 'border-white/10 bg-panel text-secondary-text hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {game.icon && (
                        <img src={game.icon} alt={game.name} className="w-5 h-5 rounded object-cover shrink-0" />
                      )}
                      <span className="truncate flex-1 font-semibold">{game.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. TAKIM KAPTANLIĞI PANELİ */}
          {roles.includes("CAPTAIN") && (
            <div className="mt-4 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span>Takım Kaptanlığı</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-300 font-bold">1 Takım = 1 Kaptan Kuralı</span>
                </div>
                <span className="text-xs font-mono font-bold text-yellow-500">{captainTeamIds.length} takım seçildi</span>
              </div>
              <p className="text-xs text-secondary-text">
                Bu kullanıcının kaptanı olacağı takımı seçiniz. Seçilen takımda başka bir kaptan varsa yetkisi bu üyeye aktarılır:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1">
                {allTeams.map(team => {
                  const isSelected = captainTeamIds.includes(team.id);
                  const currentCaptain = team.members.find((m: any) => m.role === 'CAPTAIN')?.user;
                  const isCurrentCaptainThisUser = currentCaptain?.id === user.id;

                  return (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => handleCaptainTeamToggle(team.id)}
                      className={`p-3 rounded-lg border text-left flex flex-col gap-1.5 transition-all text-xs cursor-pointer ${
                        isSelected 
                          ? 'border-yellow-500 bg-yellow-500/20 text-white shadow-sm' 
                          : 'border-white/10 bg-panel text-secondary-text hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white tracking-wide">{team.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-yellow-500 shrink-0" />}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-secondary-text">
                        <span className="text-white/60">{team.game?.name || 'Genel'}</span>
                        <span>
                          {isCurrentCaptainThisUser ? (
                            <span className="text-yellow-400 font-semibold">⭐ Bu Üye Kaptan</span>
                          ) : currentCaptain ? (
                            <span className="text-orange-400">Mevcut: {currentCaptain.username}</span>
                          ) : (
                            <span className="text-emerald-400">Kaptan Boşta</span>
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* SAVE */}
        <div className="flex justify-end pt-4">
          <button 
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3.5 bg-primary-red text-white font-bold rounded-xl hover:bg-deep-red transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(208,0,0,0.3)] font-space uppercase tracking-wider"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Değişiklikleri Kaydet
          </button>
        </div>

      </div>
    </div>
  );
}
