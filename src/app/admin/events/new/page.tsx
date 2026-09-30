"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    venue: '',
    capacity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API here
    console.log('Saving event', formData);
    router.push('/admin/events');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 text-secondary-text hover:text-white bg-panel border border-white/10 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Yeni Etkinlik Oluştur</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-panel border border-white/10 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary-text mb-2">Etkinlik Adı</label>
            <input 
              type="text" 
              required
              placeholder="Etkinlik adını girin"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Etkinlik Türü</label>
            <select 
              required
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red appearance-none"
            >
              <option value="" disabled>Tür seçin</option>
              <option value="watch_party">Watch Party</option>
              <option value="lan">LAN Turnuvası</option>
              <option value="meetup">Topluluk Buluşması</option>
              <option value="seminar">Seminer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Mekan (Venue)</label>
            <input 
              type="text" 
              required
              placeholder="Örn: Ana Salon"
              value={formData.venue}
              onChange={(e) => setFormData({...formData, venue: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Tarih</label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Saat</label>
            <input 
              type="time" 
              required
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-text mb-2">Kapasite</label>
            <input 
              type="number" 
              required
              min="1"
              placeholder="Katılımcı sayısı"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-red"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button 
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-primary-red hover:bg-deep-red text-white font-medium rounded-lg transition-colors"
          >
            <Save size={18} />
            Etkinliği Oluştur
          </button>
        </div>
      </form>
    </div>
  );
}
