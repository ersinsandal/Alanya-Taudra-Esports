"use client";

import React, { useState } from "react";
import { Search, Filter, Coins, ArrowUpRight, ArrowDownRight, Plus, MoreHorizontal } from "lucide-react";

const MOCK_TRANSACTIONS = [
  { id: "1", user: "Ahmet 'Sniper' Yılmaz", amount: 150, type: "earned", reason: "Turnuva 1.liği", date: "2026-09-29 14:30" },
  { id: "2", user: "Can 'Carry' Demir", amount: -50, type: "spent", reason: "Mağaza Harcaması (Forma)", date: "2026-09-29 12:15" },
  { id: "3", user: "Elif 'Support' Kaya", amount: 25, type: "earned", reason: "Günlük Giriş", date: "2026-09-28 09:00" },
  { id: "4", user: "Burak 'Tank' Çelik", amount: 100, type: "earned", reason: "Görev Tamamlandı", date: "2026-09-28 18:45" },
  { id: "5", user: "Zeynep 'Mage' Şahin", amount: -20, type: "spent", reason: "Çekiliş Katılımı", date: "2026-09-27 21:20" },
];

export default function PointsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">ATE Puan Yönetimi</h1>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus className="w-5 h-5" />
          <span>Puan Ekle/Çıkar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-[#F7F7F7]">
            <Coins className="w-8 h-8 text-[#D00000]" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Toplam Dağıtılan Puan</p>
            <p className="text-2xl font-bold text-white">1,245,500</p>
          </div>
        </div>
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-emerald-500">
            <ArrowUpRight className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Bu Ay Kazanılan</p>
            <p className="text-2xl font-bold text-white">45,200</p>
          </div>
        </div>
        <div className="bg-panel border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg text-rose-500">
            <ArrowDownRight className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-[#99999F]">Bu Ay Harcanan</p>
            <p className="text-2xl font-bold text-white">32,850</p>
          </div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl">
        <div className="p-4 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#99999F]" />
            <input
              type="text"
              placeholder="Kullanıcı veya sebep ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#D00000] transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors w-full md:w-auto">
            <Filter className="w-5 h-5" />
            <span>Filtrele</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-[#99999F]">
                <th className="p-4 font-medium">Kullanıcı</th>
                <th className="p-4 font-medium">Miktar</th>
                <th className="p-4 font-medium">Sebep</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white">{tx.user}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-medium ${tx.type === 'earned' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {tx.type === 'earned' ? '+' : ''}{tx.amount}
                    </span>
                  </td>
                  <td className="p-4 text-[#99999F]">{tx.reason}</td>
                  <td className="p-4 text-[#99999F] text-sm">{tx.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#99999F] hover:text-white">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
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
