"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, X, Edit2, Shield } from "lucide-react";
import Image from "next/image";

export function EditProfileModal({ user, children }: { user: any, children?: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    firstName: user.profile?.firstName || '',
    lastName: user.profile?.lastName || '',
    bio: user.profile?.bio || '',
    discord: user.profile?.discordUsername || '',
    birthDate: user.profile?.birthDate ? new Date(user.profile.birthDate).toISOString().split('T')[0] : '',
    privacyAge: user.profile?.privacyAge || 'PUBLIC',
    privacyGames: user.profile?.privacyGames || 'PUBLIC'
  });

  const [avatarPreview, setAvatarPreview] = useState(user.profile?.avatarUrl || null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { updateProfile } = await import('@/lib/actions/profile');
      await updateProfile(profile);
      setIsOpen(false);
      router.refresh();
    } catch (e) {
      alert("Hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'ı aşamaz.");
      return;
    }

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { uploadAvatar } = await import('@/lib/actions/profile');
      const res = await uploadAvatar(formData);
      if (res.success) {
        setAvatarPreview(res.avatarUrl);
        router.refresh();
      } else {
        alert(res.error || "Fotoğraf yüklenemedi");
      }
    } catch (err) {
      alert("Fotoğraf yüklenirken bir hata oluştu");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
        {children || (
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 text-sm">
            <Edit2 className="w-4 h-4" />
            Profili Düzenle
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111114] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold font-heading text-white mb-6">Profili Düzenle</h2>
            
            <div className="mb-8 flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary-red">
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-text text-xs">Yok</div>
                )}
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} disabled={uploadingAvatar} className="flex items-center gap-2 px-4 py-2 bg-secondary border border-white/10 text-white text-sm rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Camera className="w-4 h-4" /> Fotoğraf Değiştir
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-secondary-text mb-1 block">Ad</label>
                  <input type="text" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="text-sm text-secondary-text mb-1 block">Soyad</label>
                  <input type="text" value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
              </div>
              <div>
                <label className="text-sm text-secondary-text mb-1 block">Biyografi (Kendinden Bahset)</label>
                <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white resize-none" placeholder="Espor geçmişin, hedeflerin..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-secondary-text mb-1 block">Discord</label>
                  <input type="text" value={profile.discord} onChange={(e) => setProfile({...profile, discord: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
                <div>
                  <label className="text-sm text-secondary-text mb-1 block">Doğum Tarihi</label>
                  <input type="date" value={profile.birthDate} onChange={(e) => setProfile({...profile, birthDate: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5 mt-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary-red"/> Gizlilik Ayarları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 p-4 rounded-lg border border-white/5">
                    <label className="text-sm text-white font-medium mb-2 block">Yaş Görünürlüğü</label>
                    <select value={profile.privacyAge} onChange={(e) => setProfile({...profile, privacyAge: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white">
                      <option value="PUBLIC" className="bg-[#050505]">Herkese Açık</option>
                      <option value="TEAM" className="bg-[#050505]">Sadece Ekibe Açık</option>
                      <option value="PRIVATE" className="bg-[#050505]">Tamamen Gizli</option>
                    </select>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg border border-white/5">
                    <label className="text-sm text-white font-medium mb-2 block">Oyun Profilleri</label>
                    <select value={profile.privacyGames} onChange={(e) => setProfile({...profile, privacyGames: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white">
                      <option value="PUBLIC" className="bg-[#050505]">Herkese Açık</option>
                      <option value="TEAM" className="bg-[#050505]">Sadece Ekibe Açık</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-secondary-text hover:text-white cursor-pointer">İptal</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-red text-white rounded-lg font-medium hover:bg-deep-red flex items-center gap-2 cursor-pointer">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
