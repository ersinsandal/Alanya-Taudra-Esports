"use client";

import { useState } from "react";
import { Shield, Key, Bell, CheckCircle2, AlertCircle, X, User, Mail, Save, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsClient({ user }: { user: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hesap");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  
  // Account Form
  const [isSaving, setIsSaving] = useState(false);
  const [email] = useState(user.email);
  const [username] = useState(user.username);
  
  // Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const tabs = [
    { id: "hesap", label: "Hesap Bilgileri", icon: User },
    { id: "guvenlik", label: "Güvenlik & Şifre", icon: Key },
    { id: "bildirimler", label: "Bildirim Tercihleri", icon: Bell },
  ];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Yeni şifreler eşleşmiyor.", "error");
      return;
    }
    
    setIsChangingPassword(true);
    try {
      // Assuming a changePassword server action exists or will exist
      const { changePassword } = await import('@/lib/actions/auth');
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        showToast("Şifreniz başarıyla güncellendi.", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(res.error || "Şifre güncellenirken hata oluştu.", "error");
      }
    } catch (err) {
      showToast("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8 relative">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border transition-all animate-in fade-in slide-in-from-bottom-4 ${
          toast.type === "success" ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40" : toast.type === "error" ? "bg-red-950/90 text-red-200 border-red-500/40" : "bg-blue-950/90 text-blue-200 border-blue-500/40"
        }`}>
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          {toast.type === "info" && <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-bold font-heading text-white mb-6">Ayarlar</h1>
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id ? "bg-primary-red/10 text-primary-red border border-primary-red/20 font-bold" : "text-secondary-text hover:bg-secondary/50 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {activeTab === "hesap" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="mb-8">
              <h2 className="text-xl font-bold font-heading text-white mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-red" /> Hesap Bilgileri
              </h2>
              <p className="text-sm text-secondary-text">Platforma giriş yaptığınız temel hesap bilgileriniz.</p>
            </div>
            
            <div className="space-y-6 max-w-lg">
              <div>
                <label className="text-sm font-medium text-secondary-text mb-1.5 block">Kullanıcı Adı</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="text" value={username} disabled className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white/70 cursor-not-allowed" />
                </div>
                <p className="text-xs text-white/40 mt-1">Kullanıcı adınızı değiştiremezsiniz.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-secondary-text mb-1.5 block">E-Posta Adresi</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="email" value={email} disabled className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white/70 cursor-not-allowed" />
                </div>
                <p className="text-xs text-white/40 mt-1">E-posta adresi değişimi için destek talebi oluşturmanız gerekmektedir.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "guvenlik" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="mb-8">
              <h2 className="text-xl font-bold font-heading text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-red" /> Güvenlik & Şifre
              </h2>
              <p className="text-sm text-secondary-text">Hesabınızı güvende tutmak için şifrenizi güçlü belirleyin.</p>
            </div>
            
            <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
              <div>
                <label className="text-sm font-medium text-secondary-text mb-1.5 block">Mevcut Şifre</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full bg-black/50 border border-white/10 focus:border-primary-red rounded-lg pl-10 pr-4 py-2.5 text-white outline-none transition-colors" placeholder="••••••••" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-secondary-text mb-1.5 block">Yeni Şifre</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} className="w-full bg-black/50 border border-white/10 focus:border-primary-red rounded-lg pl-10 pr-4 py-2.5 text-white outline-none transition-colors" placeholder="••••••••" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-secondary-text mb-1.5 block">Yeni Şifre (Tekrar)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} className="w-full bg-black/50 border border-white/10 focus:border-primary-red rounded-lg pl-10 pr-4 py-2.5 text-white outline-none transition-colors" placeholder="••••••••" />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-white/5">
                <button type="submit" disabled={isChangingPassword} className="px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50">
                  {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Şifreyi Güncelle
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "bildirimler" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center py-20 animate-in fade-in slide-in-from-bottom-2">
            <Bell className="w-16 h-16 text-secondary-text mb-4 opacity-50" />
            <h2 className="text-xl font-bold font-heading text-white mb-2">Bildirim Tercihleri</h2>
            <p className="text-secondary-text max-w-md">E-posta ve uygulama içi bildirim tercihlerinizi yönetme ekranı çok yakında eklenecektir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
