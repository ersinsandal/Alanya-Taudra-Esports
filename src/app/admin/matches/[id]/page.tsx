"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save, Swords, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MatchDetailPage() {
  const params = useParams();
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [mvp, setMvp] = useState("");

  const mockMatch = {
    id: params.id,
    teamA: "Dark Passage",
    teamB: "SuperMassive",
    game: "VALORANT",
    tournament: "Kış Kupası 2026",
    maps: ["Ascent", "Bind", "Haven"],
    playersA: ["Player1", "Player2", "Player3", "Player4", "Player5"],
    playersB: ["Player6", "Player7", "Player8", "Player9", "Player10"]
  };

  const allPlayers = [...mockMatch.playersA, ...mockMatch.playersB];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/matches" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-space font-bold tracking-tight text-white">Maç Detayı & Skor Girişi</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#D00000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Save className="w-4 h-4" />
          Skoru Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-panel border border-white/10 rounded-xl p-8">
            <div className="text-center mb-8">
              <span className="text-[#D00000] font-medium tracking-wider text-sm uppercase">{mockMatch.tournament} - {mockMatch.game}</span>
            </div>
            
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1 text-center">
                <h3 className="text-3xl font-space font-bold text-white mb-4">{mockMatch.teamA}</h3>
                <input 
                  type="number" 
                  value={scoreA}
                  onChange={(e) => setScoreA(parseInt(e.target.value) || 0)}
                  className="w-24 h-24 text-center text-5xl font-bold bg-[#050505] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D00000]"
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <Swords className="w-12 h-12 text-[#99999F]" />
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium text-[#99999F]">BO3</span>
              </div>

              <div className="flex-1 text-center">
                <h3 className="text-3xl font-space font-bold text-white mb-4">{mockMatch.teamB}</h3>
                <input 
                  type="number" 
                  value={scoreB}
                  onChange={(e) => setScoreB(parseInt(e.target.value) || 0)}
                  className="w-24 h-24 text-center text-5xl font-bold bg-[#050505] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#D00000]"
                />
              </div>
            </div>
          </div>

          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-space font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Maçın MVP'si
            </h3>
            <select 
              value={mvp}
              onChange={(e) => setMvp(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D00000]"
            >
              <option value="">MVP Seçiniz...</option>
              {allPlayers.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-panel border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-space font-bold text-white mb-4">Harita Havuzu</h3>
            <div className="space-y-2">
              {mockMatch.maps.map((map, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-white font-medium">{map}</span>
                  <span className="text-xs text-[#99999F]">Harita {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
