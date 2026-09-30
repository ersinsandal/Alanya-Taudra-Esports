import Image from "next/image";
import Link from "next/link";
import { Shield, Trophy, Users, GraduationCap, Calendar } from "lucide-react";
import { SchoolLeagueClient } from "./ClientLeaguePage";

export const metadata = {
  title: "Alanya Lise Ligi | ATE Digital Arena",
  description: "Alanya liselerinin e-spor sahası",
};

const standings = [
  { rank: 1, name: "Alanya Anadolu Lisesi", played: 14, won: 12, lost: 2, draw: 0, points: 36 },
  { rank: 2, name: "Alanya Fen Lisesi", played: 14, won: 11, lost: 3, draw: 0, points: 33 },
  { rank: 3, name: "Alanya Bahçeşehir Koleji", played: 14, won: 9, lost: 4, draw: 1, points: 28 },
  { rank: 4, name: "ALKÜ Vakfı Koleji", played: 14, won: 8, lost: 5, draw: 1, points: 25 },
  { rank: 5, name: "Alanya Ted Koleji", played: 14, won: 6, lost: 8, draw: 0, points: 18 },
  { rank: 6, name: "Alanya Doğa Koleji", played: 14, won: 5, lost: 9, draw: 0, points: 15 },
  { rank: 7, name: "Alanya Final Akademi", played: 14, won: 3, lost: 11, draw: 0, points: 9 },
  { rank: 8, name: "Gazipaşa Fen Lisesi", played: 14, won: 1, lost: 13, draw: 0, points: 3 },
];

const matches = [
  { team1: "Alanya Anadolu Lisesi", team2: "Alanya Fen Lisesi", date: "Bugün 19:00", game: "VALORANT" },
  { team1: "Alanya Bahçeşehir Koleji", team2: "ALKÜ Vakfı Koleji", date: "Yarın 20:00", game: "CS2" },
  { team1: "Alanya Ted Koleji", team2: "Alanya Doğa Koleji", date: "Cumartesi 18:30", game: "LOL" },
];

export default function SchoolLeaguePage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')] z-0" />
        
        <div className="container relative z-20 mx-auto text-center px-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-[#D00000]/20 border border-[#D00000]/30 rounded-full text-[#FF1F2D] text-sm font-bold uppercase tracking-widest mb-6">
            <GraduationCap className="w-4 h-4 mr-2" /> SEZON 1 — 2024-2025
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight">
            ATE ALANYA <br /> LİSE LİGİ
          </h1>
          <p className="text-xl text-[#99999F] max-w-2xl mx-auto mb-10">
            Alanya liselerinin e-spor sahası. Okulunu temsil et, rekabete katıl, şampiyonluğa ulaş.
          </p>
          <SchoolLeagueClient />
        </div>
      </div>

      <div className="container mx-auto mt-12 space-y-24">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] p-8 rounded-2xl text-center hover:border-white/20 transition-colors">
            <div className="w-16 h-16 bg-[#D00000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#FF1F2D]" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-4">Okulunu Temsil Et</h3>
            <p className="text-[#99999F]">Kendi lisenin resmi takımını kur, onurun için savaş.</p>
          </div>
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] p-8 rounded-2xl text-center hover:border-white/20 transition-colors">
            <div className="w-16 h-16 bg-[#D00000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-[#FF1F2D]" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-4">Büyük Ödüller</h3>
            <p className="text-[#99999F]">Okuluna özel ekipman destekleri ve ATE Academy bursları kazan.</p>
          </div>
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] p-8 rounded-2xl text-center hover:border-white/20 transition-colors">
            <div className="w-16 h-16 bg-[#D00000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-[#FF1F2D]" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-4">Topluluk</h3>
            <p className="text-[#99999F]">Şehrindeki diğer oyuncularla tanış, dostluklar kur.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Standings */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-3">
              <Trophy className="text-[#D00000]" /> Puan Durumu
            </h2>
            <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#0B0B0D] border-b border-white/10 text-[#99999F] text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Sıra</th>
                      <th className="px-6 py-4 font-semibold">Okul</th>
                      <th className="px-6 py-4 font-semibold text-center">O</th>
                      <th className="px-6 py-4 font-semibold text-center text-success">G</th>
                      <th className="px-6 py-4 font-semibold text-center text-primary-red">M</th>
                      <th className="px-6 py-4 font-semibold text-center text-yellow-500">B</th>
                      <th className="px-6 py-4 font-semibold text-center text-white">Puan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {standings.map((team, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-[#99999F]">{team.rank}</td>
                        <td className="px-6 py-4 font-bold text-white">{team.name}</td>
                        <td className="px-6 py-4 text-center text-[#99999F]">{team.played}</td>
                        <td className="px-6 py-4 text-center text-success">{team.won}</td>
                        <td className="px-6 py-4 text-center text-primary-red">{team.lost}</td>
                        <td className="px-6 py-4 text-center text-yellow-500">{team.draw}</td>
                        <td className="px-6 py-4 text-center font-bold text-white text-lg">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-3">
              <Calendar className="text-[#D00000]" /> Haftanın Maçları
            </h2>
            <div className="space-y-4">
              {matches.map((match, idx) => (
                <div key={idx} className="bg-panel border border-white/10 rounded-xl p-5 hover:border-primary-red/50 transition-colors">
                  <div className="text-xs font-bold text-primary-red uppercase tracking-wider mb-4 flex justify-between">
                    <span>{match.game}</span>
                    <span className="text-[#99999F]">{match.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-right font-bold text-white text-sm line-clamp-2">{match.team1}</div>
                    <div className="px-3 py-1 bg-[#0B0B0D] rounded text-sm text-[#99999F] font-black italic">VS</div>
                    <div className="flex-1 text-left font-bold text-white text-sm line-clamp-2">{match.team2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Participating Schools Grid */}
        <div className="space-y-8 pb-12">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-white uppercase">Katılan Okullar</h2>
            <p className="text-secondary mt-2">1. Sezon Mücadele Eden Ekipler</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {standings.map((team, idx) => (
              <div key={idx} className="bg-panel border border-white/5 rounded-xl p-6 text-center hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0B0B0D] border border-white/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-secondary" />
                </div>
                <span className="font-bold text-white text-sm">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
