"use client";
import { useState } from 'react';
import { Bell, Check, Users, Trophy, Info } from "lucide-react";
import Link from 'next/link';

export default function NotificationsClient({ initialNotifications }: { initialNotifications: any[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const getIcon = (type: string) => {
    switch(type) {
      case 'TEAM_INVITE': return <Users className="w-6 h-6 text-primary-red" />;
      case 'TOURNAMENT': return <Trophy className="w-6 h-6 text-warning" />;
      default: return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (diff < 60) return diff + ' saniye önce';
    if (diff < 3600) return Math.floor(diff / 60) + ' dakika önce';
    if (diff < 86400) return Math.floor(diff / 3600) + ' saat önce';
    return Math.floor(diff / 86400) + ' gün önce';
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', { method: 'POST' });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const markAsRead = async (id: string, currentRead: boolean) => {
    if (currentRead) return;
    try {
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-heading text-primary-text flex items-center gap-3">
          <Bell className="w-8 h-8 text-primary-red" />
          BİLDİRİMLER
        </h1>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-primary-red hover:text-accent-red font-medium flex items-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          Tümünü Okundu İşaretle
        </button>
      </div>

      <div className="bg-panel border border-border/50 rounded-xl overflow-hidden">
        <div className="flex flex-col">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => markAsRead(n.id, n.isRead)}
              className={`p-4 md:p-6 border-b border-border/50 transition-colors cursor-pointer flex gap-4 ${n.isRead ? 'hover:bg-secondary/20' : 'bg-secondary/10 hover:bg-secondary/30'}`}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-primary-text">{n.title}</h3>
                  <span className="text-xs text-secondary-text whitespace-nowrap">{getTimeAgo(n.createdAt)}</span>
                </div>
                <p className="text-sm text-secondary-text mt-1">
                  {n.message}
                </p>
                {n.link && (
                  <div className="mt-3">
                    <Link href={n.link} className="text-primary-red hover:underline text-sm font-medium">
                      Detayları Gör →
                    </Link>
                  </div>
                )}
              </div>
              {!n.isRead && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary-red mt-2 shrink-0" />
              )}
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-8 text-center text-secondary-text">
              Henüz hiç bildiriminiz yok.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
