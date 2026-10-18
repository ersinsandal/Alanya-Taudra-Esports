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
  MapPin 
} from "lucide-react";
import { updateUserAdmin } from "@/lib/actions/admin-users";

export default function EditUserClient({ user }: { user: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(user.status);
  
  // Prepare roles
  const currentRoles = user.roles?.map((r: any) => r.role.name) || [];
  const [roles, setRoles] = useState<string[]>(currentRoles);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateUserAdmin(user.id, { status, roles });
      if (res.success) {
        alert("Kullanıcı başarıyla güncellendi.");
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
              onClick={() => setStatus("ACTIVE")}
              className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${status === "ACTIVE" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-black/40 border-white/5 text-secondary-text hover:border-white/10"}`}
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold">Aktif</span>
            </button>
            <button 
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableRoles.map(r => (
              <label key={r.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${roles.includes(r.id) ? "bg-primary-red/10 border-primary-red/30 text-white" : "bg-black/40 border-white/5 text-secondary-text hover:border-white/10"}`}>
                <input 
                  type="checkbox" 
                  checked={roles.includes(r.id)} 
                  onChange={() => handleRoleToggle(r.id)}
                  className="w-4 h-4 rounded bg-black/50 border border-white/20 checked:bg-primary-red" 
                />
                <span className="text-sm font-medium">{r.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-primary-red text-white font-bold rounded-xl hover:bg-deep-red transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Değişiklikleri Kaydet
          </button>
        </div>

      </div>
    </div>
  );
}
