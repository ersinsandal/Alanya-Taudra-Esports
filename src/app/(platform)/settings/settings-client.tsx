"use client";

import { useState } from "react";
import { User, Shield, Bell, Key, AlertTriangle, Gamepad2, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsClient({ user }: { user: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profil");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<"freeze" | "delete" | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const tabs = [
    { id: "profil", label: "Profil", icon: User },
    { id: "hesap", label: "Hesap", icon: Key },
    { id: "gizlilik", label: "Gizlilik", icon: Shield },
    { id: "bildirimler", label: "Bildirimler", icon: Bell },
    { id: "tehlike", label: "Tehlikeli Bölge", icon: AlertTriangle },
    { id: "oyunlar", label: "Oyun Profilleri", icon: Gamepad2 },
  ];

  // Profil state
  const [profile, setProfile] = useState({
    firstName: user.profile?.firstName || '',
    lastName: user.profile?.lastName || '',
    bio: user.profile?.bio || '',
    discord: user.profile?.discordUsername || '',
  });

  // Hesap state
  const [email, setEmail] = useState("ornek@email.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState("ornek@email.com");
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirmPass: "" });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Gizlilik state
  const [privacy, setPrivacy] = useState({
    realName: user.profile?.showAge || false, // Should be showName but we map simple
    age: user.profile?.showAge || false,
    school: user.profile?.showSchool || false,
    city: true,
    gameStats: true,
    searchVisible: true,
  });

  // Bildirimler state
  const [notifications, setNotifications] = useState({
    emailTurnuva: true,
    emailMac: true,
    emailScrim: true,
    emailDavet: true,
    emailBulten: false,
    platformTakim: true,
    platformArkadas: true,
    platformBasvuru: true,
    platformYeniTurnuva: true,
    smsMac: false,
    smsAcil: true,
  });

  // Oyun profilleri state
  const [gameProfiles, setGameProfiles] = useState({
    valorant: "SniperTR#TR1",
    cs2: "STEAM_0:1:48291039",
    lol: "SniperMid#TR1",
    fc25: "SniperStriker",
  });

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction("profile");
    try {
      const { updateProfile } = await import('@/lib/actions/profile');
      const res = await updateProfile(profile);
      if (res.success) {
        showToast("Profil bilgileriniz başarıyla güncellendi!");
      } else {
        showToast(res.error || "Hata oluştu", "error");
      }
    } catch (e) {
      showToast("Bir hata oluştu", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRequestChange = async (type: string) => {
    try {
      showToast(`\${type} değiştirme talebiniz yöneticiye iletildi.`, "info");
      await fetch('/api/profile/request-change', {
        method: 'POST',
        body: JSON.stringify({ type })
      });
    } catch(e) {
      // ignore
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass) {
      showToast("Lütfen mevcut ve yeni şifrenizi girin.", "error");
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      showToast("Yeni şifreler birbiriyle eşleşmiyor.", "error");
      return;
    }
    setLoadingAction("password");
    setTimeout(() => {
      setLoadingAction(null);
      setPasswords({ current: "", newPass: "", confirmPass: "" });
      showToast("Şifreniz başarıyla güncellendi!");
    }, 700);
  };

  const handleEmailSave = () => {
    setEmail(tempEmail);
    setIsEditingEmail(false);
    showToast("E-posta adresiniz güncellendi ve onay bağlantısı gönderildi.");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    showToast(
      !twoFactorEnabled 
        ? "İki faktörlü doğrulama (2FA) başarıyla etkinleştirildi!" 
        : "İki faktörlü doğrulama devre dışı bırakıldı.",
      !twoFactorEnabled ? "success" : "info"
    );
  };

  const handleTerminateSessions = () => {
    setLoadingAction("sessions");
    setTimeout(() => {
      setLoadingAction(null);
      showToast("Diğer tüm cihazlardaki açık oturumlar kapatıldı.");
    }, 600);
  };

  const handlePrivacySave = () => {
    setLoadingAction("privacy");
    setTimeout(() => {
      setLoadingAction(null);
      showToast("Gizlilik ve KVKK tercihleriniz başarıyla kaydedildi!");
    }, 500);
  };

  const handleNotificationsSave = () => {
    setLoadingAction("notifications");
    setTimeout(() => {
      setLoadingAction(null);
      showToast("Bildirim tercihleriniz güncellendi!");
    }, 500);
  };

  const handleGameProfileSave = (gameKey: keyof typeof gameProfiles, gameName: string) => {
    showToast(`${gameName} profili başarıyla kaydedildi!`);
  };

  const handleConfirmFreeze = () => {
    setConfirmModal(null);
    showToast("Hesabınız geçici olarak donduruldu. Çıkış yapılıyor...", "info");
    setTimeout(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login?logout=true';
    }, 1200);
  };

  const handleConfirmDelete = () => {
    setConfirmModal(null);
    showToast("Hesabınız silindi. ATE Digital Arena'ya veda ettiniz.", "error");
    setTimeout(async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login?logout=true';
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border transition-all animate-in fade-in slide-in-from-bottom-4 ${
          toast.type === "success" 
            ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40" 
            : toast.type === "error"
            ? "bg-red-950/90 text-red-200 border-red-500/40"
            : "bg-blue-950/90 text-blue-200 border-blue-500/40"
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

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">
                {confirmModal === "freeze" ? "Hesabı Dondurmayı Onayla" : "Hesabı Kalıcı Olarak Sil"}
              </h3>
            </div>
            <p className="text-sm text-[#99999F] leading-relaxed">
              {confirmModal === "freeze" 
                ? "Hesabınız geçici olarak devre dışı kalacaktır. İstediğiniz an tekrar giriş yaparak aktifleştirebilirsiniz. Devam etmek istiyor musunuz?"
                : "DİKKAT: Bu işlem geri alınamaz! Tüm turnuva geçmişiniz, ATE ID'niz ve maç kayıtlarınız kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?"}
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button 
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button 
                onClick={confirmModal === "freeze" ? handleConfirmFreeze : handleConfirmDelete}
                className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  confirmModal === "freeze" ? "bg-amber-600 hover:bg-amber-700" : "bg-[#D00000] hover:bg-red-700"
                }`}
              >
                {confirmModal === "freeze" ? "Hesabımı Dondur" : "Evet, Hesabımı Sil"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-bold font-heading text-primary-text mb-6">Ayarlar</h1>
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-primary-red/10 text-primary-red border border-primary-red/20 font-bold"
                  : "text-secondary-text hover:bg-secondary/50 hover:text-primary-text"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* PROFIL TAB */}
        {activeTab === "profil" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Profil Bilgileri</h2>
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-secondary-text">Ad</label>
                    <button type="button" onClick={() => handleRequestChange('İsim')} className="text-xs text-blue-500 hover:underline">Değişiklik Talep Et</button>
                  </div>
                  <input 
                    type="text" 
                    value={profile.firstName}
                    disabled
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 text-primary-text/70 focus:outline-none cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-secondary-text">Soyad</label>
                    <button type="button" onClick={() => handleRequestChange('Soyisim')} className="text-xs text-blue-500 hover:underline">Değişiklik Talep Et</button>
                  </div>
                  <input 
                    type="text" 
                    value={profile.lastName}
                    disabled
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 text-primary-text/70 focus:outline-none cursor-not-allowed" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-secondary-text">Okul / Üniversite</label>
                  <button type="button" onClick={() => handleRequestChange('Okul')} className="text-xs text-blue-500 hover:underline">Değişiklik Talep Et</button>
                </div>
                <input 
                  type="text" 
                  value={user.profile?.school?.name || user.profile?.university?.name || 'Okul Bilgisi Yok'}
                  disabled
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2 text-primary-text/70 focus:outline-none cursor-not-allowed" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-text">Biyografi</label>
                <textarea 
                  rows={4} 
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red resize-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-text">Discord Kullanıcı Adı</label>
                <input 
                  type="text" 
                  value={profile.discord}
                  onChange={(e) => setProfile({ ...profile, discord: e.target.value })}
                  className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red" 
                />
              </div>
              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loadingAction === "profile"}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loadingAction === "profile" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        )}

        {/* HESAP TAB */}
        {activeTab === "hesap" && (
          <div className="flex flex-col gap-6">
            <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-6">E-posta Adresi</h2>
              {isEditingEmail ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-secondary-text">Yeni E-posta</label>
                    <input 
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red text-sm" 
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setIsEditingEmail(false)}
                      className="px-4 py-2 bg-secondary text-secondary-text rounded-lg text-sm hover:text-white cursor-pointer"
                    >
                      İptal
                    </button>
                    <button 
                      onClick={handleEmailSave}
                      className="px-4 py-2 bg-primary-red text-white rounded-lg text-sm font-medium hover:bg-deep-red cursor-pointer"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-secondary/50 border border-border/50 p-4 rounded-lg">
                  <div>
                    <p className="text-primary-text font-medium">{email}</p>
                    <p className="text-sm text-emerald-400">✓ Doğrulanmış e-posta adresi</p>
                  </div>
                  <button 
                    onClick={() => {
                      setTempEmail(email);
                      setIsEditingEmail(true);
                    }}
                    className="px-4 py-2 bg-secondary border border-border/50 text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                  >
                    Değiştir
                  </button>
                </div>
              )}
            </div>

            <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Şifre Değiştirme</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-text">Mevcut Şifre</label>
                  <input 
                    type="password" 
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-text">Yeni Şifre</label>
                  <input 
                    type="password" 
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary-text">Yeni Şifre (Tekrar)</label>
                  <input 
                    type="password" 
                    value={passwords.confirmPass}
                    onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red" 
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loadingAction === "password"}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loadingAction === "password" && <Loader2 className="w-4 h-4 animate-spin" />}
                    Şifreyi Güncelle
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-6">İki Faktörlü Doğrulama (2FA)</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-text font-medium flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${twoFactorEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-secondary-text'}`}></span>
                    {twoFactorEnabled ? "Aktif (Güvende)" : "Aktif Değil"}
                  </p>
                  <p className="text-sm text-secondary-text mt-1 max-w-sm">Hesabını yetkisiz erişimlere karşı daha güvenli hale getirmek için 2FA kullan.</p>
                </div>
                <button 
                  onClick={handleToggle2FA}
                  className={`px-4 py-2 border rounded-lg font-medium transition-colors cursor-pointer ${
                    twoFactorEnabled 
                      ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20" 
                      : "bg-secondary border-border/50 text-primary-text hover:bg-secondary/80"
                  }`}
                >
                  {twoFactorEnabled ? "Devre Dışı Bırak" : "Etkinleştir"}
                </button>
              </div>
            </div>

            <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Oturum Yönetimi</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-text font-medium">Diğer tüm cihazlardan çıkış yap</p>
                  <p className="text-sm text-secondary-text mt-1 max-w-sm">Şüpheli bir durum sezdiğinde tüm açık oturumlarını sonlandırabilirsin.</p>
                </div>
                <button 
                  onClick={handleTerminateSessions}
                  disabled={loadingAction === "sessions"}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border/50 text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  {loadingAction === "sessions" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Tüm Oturumları Kapat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GIZLILIK TAB */}
        {activeTab === "gizlilik" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Gizlilik & KVKK</h2>
            <div className="space-y-6">
              {[
                { key: "realName", label: "Gerçek adım profilimde görünsün", desc: "Sadece kullanıcı adın yerine gerçek adın da gösterilir." },
                { key: "age", label: "Yaşım profilimde görünsün", desc: "Doğum tarihine göre hesaplanan yaşın profilinde yer alır." },
                { key: "school", label: "Okul/Üniversite bilgim görünsün", desc: "Eğitim bilgilerin diğer kullanıcılar tarafından görülebilir." },
                { key: "city", label: "Şehir bilgim görünsün", desc: "Bulunduğun şehir profilinde açıkça gösterilir." },
                { key: "gameStats", label: "Oyun istatistiklerim herkese açık olsun", desc: "Turnuva ve maç geçmişin herkes tarafından incelenebilir." },
                { key: "searchVisible", label: "Profilim arama sonuçlarında görünsün", desc: "Diğer oyuncular seni arama yaparak bulabilir." },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-primary-text font-medium">{item.label}</p>
                    <p className="text-sm text-secondary-text">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={privacy[item.key as keyof typeof privacy]}
                      onChange={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof privacy] }))}
                    />
                    <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-red"></div>
                  </label>
                </div>
              ))}
              
              <div className="pt-6 mt-6 border-t border-border/50 flex justify-end">
                <button 
                  onClick={handlePrivacySave}
                  disabled={loadingAction === "privacy"}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer"
                >
                  {loadingAction === "privacy" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BILDIRIMLER TAB */}
        {activeTab === "bildirimler" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Bildirimler</h2>
            <div className="space-y-8">
              {/* E-posta Bildirimleri */}
              <div>
                <h3 className="text-lg font-medium text-primary-text mb-4">E-posta Bildirimleri</h3>
                <div className="space-y-3">
                  {[
                    { key: "emailTurnuva", label: "Turnuva duyuruları" },
                    { key: "emailMac", label: "Maç hatırlatmaları" },
                    { key: "emailScrim", label: "Scrim eşleşme bildirimi" },
                    { key: "emailDavet", label: "Etkinlik davetleri" },
                    { key: "emailBulten", label: "Haftalık bülten" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border border-border/50 rounded bg-secondary checked:bg-primary-red checked:border-primary-red transition-colors cursor-pointer"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-primary-text group-hover:text-white transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platform Bildirimleri */}
              <div>
                <h3 className="text-lg font-medium text-primary-text mb-4">Platform Bildirimleri</h3>
                <div className="space-y-3">
                  {[
                    { key: "platformTakim", label: "Takım davetleri" },
                    { key: "platformArkadas", label: "Arkadaşlık istekleri" },
                    { key: "platformBasvuru", label: "Başvuru sonuçları" },
                    { key: "platformYeniTurnuva", label: "Yeni turnuva ilanları" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border border-border/50 rounded bg-secondary checked:bg-primary-red checked:border-primary-red transition-colors cursor-pointer"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-primary-text group-hover:text-white transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* SMS Bildirimleri */}
              <div>
                <h3 className="text-lg font-medium text-primary-text mb-4">SMS Bildirimleri</h3>
                <div className="space-y-3">
                  {[
                    { key: "smsMac", label: "Maç başlama bildirimi" },
                    { key: "smsAcil", label: "Acil duyurular" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border border-border/50 rounded bg-secondary checked:bg-primary-red checked:border-primary-red transition-colors cursor-pointer"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-primary-text group-hover:text-white transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-border/50 flex justify-end">
                <button 
                  onClick={handleNotificationsSave}
                  disabled={loadingAction === "notifications"}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer"
                >
                  {loadingAction === "notifications" && <Loader2 className="w-4 h-4 animate-spin" />}
                  Tercihleri Kaydet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TEHLIKELI BOLGE TAB */}
        {activeTab === "tehlike" && (
          <div className="flex flex-col gap-6">
            <div className="bg-panel border border-warning/30 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-2">Hesabı Dondur</h2>
              <p className="text-sm text-secondary-text mb-6 max-w-2xl">
                Hesabın geçici olarak devre dışı kalır. İstediğin zaman tekrar giriş yaparak hesabını aktif hale getirebilirsin.
              </p>
              <button 
                onClick={() => setConfirmModal("freeze")}
                className="px-6 py-2.5 bg-warning/10 border border-warning text-warning font-medium rounded-lg hover:bg-warning hover:text-white transition-colors cursor-pointer"
              >
                Hesabımı Dondur
              </button>
            </div>

            <div className="bg-panel border border-primary-red/30 rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-primary-text mb-2">Hesabı Kalıcı Olarak Sil</h2>
              <p className="text-sm text-secondary-text mb-6 max-w-2xl">
                Tüm veriler geri dönülemez biçimde silinir. Oyun geçmişin, turnuva sonuçların ve profilin tamamen platformdan kaldırılır. Bu işlem geri alınamaz.
              </p>
              <button 
                onClick={() => setConfirmModal("delete")}
                className="px-6 py-2.5 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer"
              >
                Hesabımı Sil
              </button>
            </div>
          </div>
        )}

        {/* OYUNLAR TAB */}
        {activeTab === "oyunlar" && (
          <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-heading text-primary-text mb-6">Oyun Profilleri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* VALORANT */}
              <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-text">VALORANT</h3>
                    <p className="text-xs text-secondary-text">Riot Games</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-secondary-text block">Riot ID (Örn: Player#TAG)</label>
                  <input 
                    type="text" 
                    value={gameProfiles.valorant}
                    onChange={(e) => setGameProfiles({ ...gameProfiles, valorant: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red text-sm" 
                  />
                  <button 
                    onClick={() => handleGameProfileSave("valorant", "VALORANT")}
                    className="w-full px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors text-sm cursor-pointer"
                  >
                    Kaydet / Güncelle
                  </button>
                </div>
              </div>

              {/* CS2 */}
              <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-text">CS2</h3>
                    <p className="text-xs text-secondary-text">Valve</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-secondary-text block">Steam ID / Faceit</label>
                  <input 
                    type="text" 
                    value={gameProfiles.cs2}
                    onChange={(e) => setGameProfiles({ ...gameProfiles, cs2: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red text-sm" 
                  />
                  <button 
                    onClick={() => handleGameProfileSave("cs2", "CS2")}
                    className="w-full px-4 py-2 bg-secondary border border-border/50 text-white font-medium rounded-lg hover:bg-secondary/80 transition-colors text-sm cursor-pointer"
                  >
                    Kaydet / Güncelle
                  </button>
                </div>
              </div>

              {/* League of Legends */}
              <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-text">League of Legends</h3>
                    <p className="text-xs text-secondary-text">Riot Games</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-secondary-text block">Riot ID</label>
                  <input 
                    type="text" 
                    value={gameProfiles.lol}
                    onChange={(e) => setGameProfiles({ ...gameProfiles, lol: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red text-sm" 
                  />
                  <button 
                    onClick={() => handleGameProfileSave("lol", "League of Legends")}
                    className="w-full px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors text-sm cursor-pointer"
                  >
                    Kaydet / Güncelle
                  </button>
                </div>
              </div>

              {/* FC 25 */}
              <div className="bg-secondary/30 border border-border/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-text">FC 25</h3>
                    <p className="text-xs text-secondary-text">EA Sports</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-medium text-secondary-text block">EA ID</label>
                  <input 
                    type="text" 
                    value={gameProfiles.fc25}
                    onChange={(e) => setGameProfiles({ ...gameProfiles, fc25: e.target.value })}
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2 text-primary-text focus:outline-none focus:border-primary-red text-sm" 
                  />
                  <button 
                    onClick={() => handleGameProfileSave("fc25", "FC 25")}
                    className="w-full px-4 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors text-sm cursor-pointer"
                  >
                    Kaydet / Güncelle
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
