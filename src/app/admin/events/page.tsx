"use client";
import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, MapPin, Users, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const mockEvents = [
  { id: 1, title: 'VALORANT Champions İzleme Partisi', type: 'Watch Party', date: '2023-11-20', time: '18:00', venue: 'Ana Salon', capacity: 250, registered: 210, status: 'Yaklaşan' },
  { id: 2, title: 'CS2 Turnuvası Finalleri', type: 'LAN', date: '2023-11-25', time: '14:00', venue: 'B Sahnesi', capacity: 100, registered: 100, status: 'Dolu' },
  { id: 3, title: 'Topluluk Buluşması', type: 'Meetup', date: '2023-10-05', time: '19:00', venue: 'Kafeterya', capacity: 50, registered: 45, status: 'Geçmiş' },
  { id: 4, title: 'Geliştirici Söyleşisi', type: 'Seminer', date: '2023-12-05', time: '15:00', venue: 'Konferans Salonu', capacity: 150, registered: 30, status: 'Yaklaşan' },
];

export default function EventsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">Etkinlik Yönetimi</h1>
        <Link 
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary-red hover:bg-deep-red text-white font-medium rounded-lg transition-colors"
        >
          <Plus size={18} />
          Yeni Etkinlik Oluştur
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <p className="text-secondary-text text-sm mb-1">Toplam Etkinlik</p>
          <p className="text-2xl font-bold text-white">42</p>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <p className="text-secondary-text text-sm mb-1">Yaklaşan Etkinlikler</p>
          <p className="text-2xl font-bold text-[#10B981]">5</p>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <p className="text-secondary-text text-sm mb-1">Toplam Katılımcı</p>
          <p className="text-2xl font-bold text-[#3B82F6]">3,450</p>
        </div>
        <div className="bg-panel border border-white/10 rounded-xl p-6">
          <p className="text-secondary-text text-sm mb-1">Doluluk Oranı</p>
          <p className="text-2xl font-bold text-white">%85</p>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" size={18} />
            <input 
              type="text" 
              placeholder="Etkinlik ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary-red"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#050505] border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors">
            <Filter size={18} />
            Filtrele
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-[#050505] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/10 text-white">
                  {event.type}
                </span>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  event.status === 'Yaklaşan' ? 'bg-[#10B981]/20 text-[#10B981]' : 
                  event.status === 'Dolu' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 
                  'bg-white/10 text-secondary-text'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{event.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-secondary-text">
                  <Calendar size={16} className="text-primary-red" />
                  {event.date} - {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-text">
                  <MapPin size={16} className="text-primary-red" />
                  {event.venue}
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-text">
                  <Users size={16} className="text-primary-red" />
                  {event.registered} / {event.capacity} Katılımcı
                </div>
              </div>
              
              {/* Progress bar for capacity */}
              <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${(event.registered/event.capacity) > 0.9 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`} 
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-secondary-text hover:text-white bg-panel rounded-lg transition-colors" title="Düzenle">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-secondary-text hover:text-primary-red bg-panel rounded-lg transition-colors" title="Sil">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 text-center text-secondary-text">
              Etkinlik bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
