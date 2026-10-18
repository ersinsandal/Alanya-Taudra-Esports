'use client';
import React, { useState } from 'react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createMedia } from '../actions';

export default function NewMediaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await createMedia(formData);
      router.push('/admin/media');
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
            <Link href="/admin/media" className="p-2 text-secondary-text hover:text-white bg-panel border border-white/10 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Medya Ekle</h1>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-[#A00000] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
            Kaydet
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-panel border border-white/10 rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Medya Başlığı</label>
              <input 
                type="text" 
                name="title"
                required
                className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
                placeholder="Örn: 2026 Büyük Final Anları"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tür</label>
              <select 
                name="type"
                className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              >
                <option className="bg-[#050505] text-white" value="PHOTO">Fotoğraf</option>
                <option className="bg-[#050505] text-white" value="VIDEO">Video</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Medya URL (Bağlantı)</label>
            <input 
              type="url" 
              name="url"
              required
              className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Açıklama (Opsiyonel)</label>
            <textarea 
              name="description"
              rows={4}
              className="w-full bg-[#111114] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red transition-colors resize-none"
              placeholder="Medya hakkında kısa açıklama..."
            />
          </div>
        </div>
      </form>
    </div>
  );
}
