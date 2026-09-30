"use client";

import { ArrowLeft, Swords } from "lucide-react";
import Link from "next/link";

export default function NewScrimPage() {
  return (
    <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
      <Link href="/scrims" className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-text mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" />
        Geri Dön
      </Link>

      <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary-red/10 flex items-center justify-center">
            <Swords className="w-5 h-5 text-primary-red" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-primary-text">SCRIM OLUŞTUR</h1>
            <p className="text-sm text-secondary-text">Antrenman maçı için rakip ara.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">Takım Seç</label>
            <select className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red appearance-none">
              <option value="">Takımınızı Seçin</option>
              <option value="1">ATE Esports (VALORANT)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Tarih</label>
              <input type="date" className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Saat</label>
              <input type="time" className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Format</label>
              <select className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red appearance-none">
                <option value="bo1">Best of 1 (BO1)</option>
                <option value="bo3">Best of 3 (BO3)</option>
                <option value="bo5">Best of 5 (BO5)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Sunucu</label>
              <select className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red appearance-none">
                <option value="frankfurt">Frankfurt</option>
                <option value="istanbul">Istanbul</option>
                <option value="paris">Paris</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">Ek Notlar</label>
            <textarea rows={3} placeholder="Belirtmek istediğiniz diğer kurallar veya bilgiler..." className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red resize-none" />
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-border/50">
            <Link href="/scrims" className="px-6 py-2.5 bg-secondary text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors">
              İptal
            </Link>
            <button type="button" className="px-6 py-2.5 bg-primary-red text-primary-text font-medium rounded-lg hover:bg-deep-red transition-colors">
              Scrim Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
