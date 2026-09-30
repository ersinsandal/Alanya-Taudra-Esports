import Link from "next/link";
import { Plus, Swords, Calendar, Clock, Globe, Shield } from "lucide-react";

export default function ScrimsPage() {
  return (
    <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-text flex items-center gap-3">
            <Swords className="w-8 h-8 text-primary-red" />
            SCRIM FINDER
          </h1>
          <p className="text-secondary-text mt-1">Takımın için antrenman maçları bul veya oluştur.</p>
        </div>
        
        <Link 
          href="/scrims/new" 
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-red text-primary-text font-medium rounded-lg hover:bg-deep-red transition-colors"
        >
          <Plus className="w-5 h-5" />
          Scrim Oluştur
        </Link>
      </div>

      <div className="flex gap-4 border-b border-border/50 mb-8">
        <button className="px-4 py-3 text-sm font-medium text-primary-red border-b-2 border-primary-red">
          AÇIK SCRIMLER
        </button>
        <button className="px-4 py-3 text-sm font-medium text-secondary-text hover:text-primary-text">
          SCRIMLERİM
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Empty State or Mock Data */}
        <div className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center">
                <span className="font-bold text-xs">VAL</span>
              </div>
              <div>
                <h3 className="font-bold text-primary-text">ATE Esports</h3>
                <p className="text-xs text-secondary-text">Tier 3 / Orta Seviye</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded bg-success/20 text-success">
              Açık
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-2 text-sm text-secondary-text">
              <Calendar className="w-4 h-4" />
              <span>Bugün</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-text">
              <Clock className="w-4 h-4" />
              <span>21:00 TSİ</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-text">
              <Globe className="w-4 h-4" />
              <span>Frankfurt</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-secondary-text">
              <Shield className="w-4 h-4" />
              <span>BO3</span>
            </div>
          </div>
          
          <div className="pt-4 mt-2 border-t border-border/50 flex justify-end">
            <button className="px-4 py-2 bg-secondary border border-border/50 text-primary-text font-medium rounded-lg hover:bg-secondary/80 transition-colors text-sm">
              İstek Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
