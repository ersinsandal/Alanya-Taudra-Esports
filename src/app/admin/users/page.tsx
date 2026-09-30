"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Filter, 
  Shield,
  Gamepad2,
  Ban
} from "lucide-react";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const mockUsers = [
    { id: "1", ateId: "ATE-001-A9F2", username: "Phantom", email: "phantom@example.com", roles: ["PLAYER"], status: "ACTIVE", gameCount: 2, createdAt: "2024-09-15" },
    { id: "2", ateId: "ATE-002-B8E3", username: "AdminMehmet", email: "mehmet@ate.com", roles: ["ADMIN"], status: "ACTIVE", gameCount: 0, createdAt: "2024-09-10" },
    { id: "3", ateId: "ATE-003-C7D4", username: "ToxicityKing", email: "toxic@example.com", roles: ["PLAYER"], status: "BANNED", gameCount: 1, createdAt: "2024-09-18" },
    { id: "4", ateId: "ATE-004-D6C5", username: "AlanyaRep", email: "rep@alanya.edu", roles: ["SCHOOL_REP", "PLAYER"], status: "ACTIVE", gameCount: 3, createdAt: "2024-09-20" },
    { id: "5", ateId: "ATE-005-E5B6", username: "CS2Leader", email: "cs2@example.com", roles: ["GAME_LEADER", "PLAYER"], status: "ACTIVE", gameCount: 2, createdAt: "2024-09-22" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading text-primary-text">
          ÜYE YÖNETİMİ
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary-text">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Toplam Üye</span>
          </div>
          <span className="text-3xl font-bold text-primary-text">1,245</span>
        </div>
        <div className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary-text">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Yetkili Sayısı</span>
          </div>
          <span className="text-3xl font-bold text-primary-text">12</span>
        </div>
        <div className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary-text">
            <Ban className="w-4 h-4 text-primary-red" />
            <span className="text-sm font-medium">Banlı Üye</span>
          </div>
          <span className="text-3xl font-bold text-primary-red">8</span>
        </div>
        <div className="bg-panel border border-border/50 rounded-xl p-6 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary-text">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-medium">Oyun Ekibi Liderleri</span>
          </div>
          <span className="text-3xl font-bold text-primary-text">4</span>
        </div>
      </div>

      <div className="bg-panel border border-border/50 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" />
            <input 
              type="text" 
              placeholder="Üye ara (ATE ID, Ad)" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-secondary border border-border/50 rounded-lg pl-9 pr-4 py-2 text-sm text-primary-text focus:outline-none focus:border-primary-red"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border/50 rounded-lg text-sm font-medium text-primary-text hover:bg-white/5 transition-colors cursor-pointer">
              <Filter className="w-4 h-4" />
              Rol Filtresi
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border/50">
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase">Üye</th>
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase">ATE ID</th>
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase">Roller</th>
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase">Oyunlar</th>
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase">Durum</th>
                <th className="p-4 text-xs font-semibold text-secondary-text uppercase text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-primary-text">{user.username}</p>
                      <p className="text-xs text-secondary-text">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-sm text-primary-text">{user.ateId}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {user.roles.map(r => (
                        <span key={r} className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r === 'ADMIN' ? 'bg-[#FF1F2D]/20 text-[#FF1F2D] border border-[#FF1F2D]/30' :
                          r === 'GAME_LEADER' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          r === 'SCHOOL_REP' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-secondary text-secondary-text border border-border/50'
                        }`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-secondary-text">{user.gameCount} Bağlı Profil</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary-red/10 text-primary-red'
                    }`}>
                      {user.status === 'ACTIVE' ? 'Aktif' : 'Banlı'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary hover:bg-secondary/80 border border-border/50 rounded-lg text-sm text-primary-text transition-colors"
                    >
                      Yönet
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}