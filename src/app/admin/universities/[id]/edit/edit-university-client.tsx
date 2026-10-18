'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2 } from 'lucide-react';
import { updateUniversity } from '../../actions';

export default function EditUniversityClient({ university }: { university: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: university.name || '',
    type: university.type || 'STATE',
    city: university.city || '',
    isActive: university.isActive ?? true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateUniversity(university.id, formData);
      router.push('/admin/universities');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#99999F]">Üniversite Adı</label>
          <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#99999F]">Şehir</label>
          <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#99999F]">Tür</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D00000]">
            <option className="bg-[#050505] text-white" value="STATE">Devlet</option>
            <option className="bg-[#050505] text-white" value="FOUNDATION">Vakıf</option>
          </select>
        </div>
        <div className="space-y-2 flex items-center mt-8">
          <input id="isActive" name="isActive" type="checkbox" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-[#D00000] bg-[#050505] border-white/10 rounded" />
          <label htmlFor="isActive" className="ml-3 text-sm font-medium text-white">Aktif (Kayıtlara Açık)</label>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button disabled={loading} type="submit" className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Kaydet
        </button>
      </div>
    </form>
  );
}
