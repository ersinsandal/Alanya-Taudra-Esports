"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  User,
  Shield,
  Gamepad2,
  Ban,
  Mail,
  Calendar,
  Save,
  AlertTriangle
} from "lucide-react";

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const [selectedRole, setSelectedRole] = useState("PLAYER");
  
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/users"
          className="p-2 bg-secondary border border-border/50 rounded-lg text-secondary-text hover:text-primary-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading text-primary-text flex items-center gap-3">
            Kullanıcı Profili
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">AKTİF</span>
          </h1>
          <p className="text-sm text-secondary-text">ATE-001-A9F2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div className="bg-panel border border-border/50 rounded-xl p-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-border/50 mb-6">
              <div className="w-24 h-24 rounded-full bg-secondary border-2 border-border/50 mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-secondary-text" />
              </div>
              <h2 className="text-xl font-bold text-primary-text">Phantom</h2>
              <p className="text-sm text-secondary-text mb-4">phantom@example.com</p>
              
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="px-2 py-1 rounded text-xs font-bold bg-secondary text-primary-text border border-border/50">PLAYER</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-secondary-text" />
                <span className="text-secondary-text">Kayıt:</span>
                <span className="text-primary-text font-medium ml-auto">15 Eyl 2024</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-secondary-text" />
                <span className="text-secondary-text">E-posta:</span>
                <span className="text-emerald-400 font-medium ml-auto">Doğrulandı</span>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="bg-panel border border-primary-red/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-red mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Tehlikeli İşlemler
            </h3>
            <p className="text-sm text-secondary-text mb-4">
              Kullanıcı hesabını askıya alabilir veya tamamen platformdan uzaklaştırabilirsiniz.
            </p>
            <button className="w-full py-2 bg-primary-red/10 border border-primary-red/30 text-primary-red rounded-lg font-medium hover:bg-primary-red hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Ban className="w-4 h-4" />
              Hesabı Banla
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Role Management */}
          <div className="bg-panel border border-border/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-red" />
              Rol Yönetimi
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { id: "PLAYER", label: "Oyuncu / Üye", desc: "Standart platform kullanıcısı" },
                { id: "GAME_LEADER", label: "Oyun Lideri", desc: "Ekip yönetimi ve turnuva düzenleme" },
                { id: "SCHOOL_REP", label: "Okul Temsilcisi", desc: "Okul takımlarını yönetir" },
                { id: "MODERATOR", label: "Moderatör", desc: "İçerik denetimi yapar" },
                { id: "ADMIN", label: "Admin", desc: "Genel sistem yönetimi" },
              ].map((role) => (
                <label 
                  key={role.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRole === role.id 
                    ? 'bg-primary-red/10 border-primary-red' 
                    : 'bg-secondary/30 border-border/50 hover:bg-secondary/60'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <input 
                    type="radio" 
                    name="role" 
                    checked={selectedRole === role.id}
                    onChange={() => setSelectedRole(role.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className={`font-medium ${selectedRole === role.id ? 'text-primary-red' : 'text-primary-text'}`}>
                      {role.label}
                    </div>
                    <div className="text-xs text-secondary-text mt-0.5">{role.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2 bg-primary-red text-white font-medium rounded-lg hover:bg-deep-red transition-colors cursor-pointer">
                <Save className="w-4 h-4" />
                Rolü Kaydet
              </button>
            </div>
          </div>
          
          {/* Game Profiles */}
          <div className="bg-panel border border-border/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-text mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary-red" />
              Bağlı Oyun Profilleri
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-primary-red/10 flex items-center justify-center font-bold text-sm text-primary-red">
                  VAL
                </div>
                <div>
                  <div className="text-sm font-bold text-primary-text">VALORANT</div>
                  <div className="text-xs font-mono text-secondary-text">Phantom#TR1</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-primary-red/10 flex items-center justify-center font-bold text-sm text-primary-red">
                  CS2
                </div>
                <div>
                  <div className="text-sm font-bold text-primary-text">CS2</div>
                  <div className="text-xs font-mono text-secondary-text">STEAM_0:1:12345678</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
