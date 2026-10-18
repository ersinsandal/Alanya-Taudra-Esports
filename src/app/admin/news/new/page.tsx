'use client';
import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Save, Send, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createNews } from '../actions';

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
      formData.append('status', submitter.value);

      await createNews(formData);
      router.push('/admin/news');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/news" className="p-2 text-secondary-text hover:text-white bg-panel border border-white/10 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Haber Ekle (Dış Link)</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="submit"
              name="status"
              value="Taslak"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-panel border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              Taslak Kaydet
            </button>
            <button 
              type="submit"
              name="status"
              value="Yayında"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-[#A00000] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
              Yayınla
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-panel border border-white/10 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Haber Başlığı / Manşet</label>
            <input 
              type="text" 
              name="title"
              required
              className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              placeholder="Örn: ATE Yeni Espor Merkezini Açtı!"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Kategori</label>
              <select 
                name="category"
                className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              >
                <option className="bg-[#050505] text-white" value="ATE">ATE (Genel)</option>
                <option className="bg-[#050505] text-white" value="TOURNAMENT">Turnuva</option>
                <option className="bg-[#050505] text-white" value="COMMUNITY">Topluluk</option>
                <option className="bg-[#050505] text-white" value="GAME">Oyun Güncellemesi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Kapak Fotoğrafı URL</label>
              <input 
                type="url" 
                name="coverImage"
                required
                className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="https://resimlinki.com/gorsel.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Haberin Gerçek Linki (Dış Bağlantı)</label>
            <input 
              type="url" 
              name="link"
              required
              className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              placeholder="https://örnek-haber-sitesi.com/haber"
            />
            <p className="text-sm text-[#99999F] mt-2">Kullanıcı "Tamamını Oku" dediğinde bu linke yönlendirilecektir.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
