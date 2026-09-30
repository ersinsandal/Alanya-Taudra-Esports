"use client";
import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Save, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewNewsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: ''
  });

  const handleSubmit = (status: string) => {
    // In a real app, send to API here
    console.log('Saving as', status, formData);
    router.push('/admin/news');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/news" className="p-2 text-secondary-text hover:text-white bg-panel border border-white/10 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Haber Ekle</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleSubmit('Taslak')}
            className="flex items-center gap-2 px-4 py-2 bg-panel border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Save size={18} />
            Taslak Kaydet
          </button>
          <button 
            onClick={() => handleSubmit('Yayında')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-deep-red text-white font-medium rounded-lg transition-colors"
          >
            <Send size={18} />
            Yayınla
          </button>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-secondary-text mb-2">Haber Başlığı</label>
          <input 
            type="text" 
            placeholder="Dikkat çekici bir başlık girin"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-2">Kategori</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red appearance-none"
          >
            <option value="" disabled>Kategori seçin</option>
            <option value="espor">Espor</option>
            <option value="oyun">Oyun</option>
            <option value="turnuva">Turnuva</option>
            <option value="platform">Platform</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-2">Kapak Görseli</label>
          <div className="w-full border-2 border-dashed border-white/10 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white/20 transition-colors">
            <div className="bg-white/5 p-4 rounded-full mb-4">
              <ImageIcon className="text-secondary-text" size={32} />
            </div>
            <p className="text-white font-medium mb-1">Görsel yüklemek için tıklayın</p>
            <p className="text-secondary-text text-sm">PNG, JPG veya WEBP (Maks 5MB)</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-2">İçerik</label>
          <div className="border border-white/10 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-[#050505] p-2 border-b border-white/10 flex gap-2">
              <button className="px-3 py-1 text-secondary-text hover:text-white rounded hover:bg-white/5 font-bold">B</button>
              <button className="px-3 py-1 text-secondary-text hover:text-white rounded hover:bg-white/5 italic">I</button>
              <button className="px-3 py-1 text-secondary-text hover:text-white rounded hover:bg-white/5 underline">U</button>
            </div>
            <textarea 
              rows={12}
              placeholder="Haber içeriğini buraya yazın..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-[#0B0B0D] p-4 text-white resize-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
