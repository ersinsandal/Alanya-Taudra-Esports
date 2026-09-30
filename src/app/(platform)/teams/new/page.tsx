"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function NewTeamPage() {
  return (
    <div className="max-w-3xl mx-auto w-full p-4 md:p-8">
      <Link href="/dashboard" className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary-text mb-8 w-fit">
        <ArrowLeft className="w-4 h-4" />
        Geri Dön
      </Link>

      <div className="bg-panel border border-border/50 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary-red/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-red" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-primary-text">TAKIM OLUŞTUR</h1>
            <p className="text-sm text-secondary-text">Yeni bir e-spor takımı kur ve turnuvalara katıl.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border/50 rounded-xl bg-secondary/20 mb-8 cursor-pointer hover:bg-secondary/40 transition-colors">
            <Upload className="w-8 h-8 text-secondary-text mb-3" />
            <p className="text-sm font-medium text-primary-text">Takım Logosu Yükle</p>
            <p className="text-xs text-secondary-text mt-1">Önerilen: 512x512px, maks 2MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Takım Adı</label>
              <input type="text" placeholder="Örn: ATE Esports" className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary-text">Kısaltma (Tag)</label>
              <input type="text" placeholder="Örn: ATE" maxLength={5} className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red uppercase" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">Oyun</label>
            <select className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red appearance-none">
              <option value="">Oyun Seçiniz</option>
              <option value="valorant">VALORANT</option>
              <option value="cs2">Counter-Strike 2</option>
              <option value="lol">League of Legends</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary-text">Açıklama</label>
            <textarea rows={4} placeholder="Takımından kısaca bahset..." className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-2.5 text-primary-text focus:outline-none focus:border-primary-red resize-none" />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/50">
            <label className="flex items-center gap-3 p-4 border border-border/50 rounded-lg bg-secondary/10 cursor-pointer hover:bg-secondary/30 transition-colors">
              <input type="checkbox" className="w-5 h-5 accent-primary-red rounded border-border" />
              <div>
                <p className="text-sm font-medium text-primary-text flex items-center gap-2">
                  Açık Takım <Shield className="w-4 h-4 text-success" />
                </p>
                <p className="text-xs text-secondary-text mt-0.5">Herkes takıma katılmak için başvurabilir.</p>
              </div>
            </label>
          </div>

          <div className="pt-6 flex justify-end gap-4">
            <Link href="/dashboard" className="px-6 py-2.5 bg-secondary text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors">
              İptal
            </Link>
            <button type="button" className="px-6 py-2.5 bg-primary-red text-primary-text font-medium rounded-lg hover:bg-deep-red transition-colors">
              Takımı Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
