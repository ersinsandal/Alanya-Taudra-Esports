import React from 'react';
import { Building2, Users, Trophy, UserCog, Edit, Info } from 'lucide-react';

export const metadata = {
  title: 'Üniversite Yönetimi | ATE Digital Arena Admin',
  description: 'Üniversiteler, temsilciler ve kayıtlı oyuncular',
};

export default function UniversitiesAdminPage() {
  const universities = [
    {
      id: 1,
      name: "ALKÜ (Alanya Alaaddin Keykubat Üniversitesi)",
      rep: "Mehmet Yılmaz",
      players: 34,
      teams: 3,
      logoColor: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      name: "Alanya Üniversitesi",
      rep: "Ayşe Demir",
      players: 28,
      teams: 2,
      logoColor: "from-orange-500 to-red-600"
    }
  ];

  const registeredPlayers = [
    { id: 1, name: "Burak 'FakerTR' Ak", uni: "ALKÜ", faculty: "Mühendislik", game: "LOL", date: "2026-09-15" },
    { id: 2, name: "Ali 'Entry' Vefa", uni: "ALKÜ", faculty: "Turizm", game: "VALORANT", date: "2026-09-16" },
    { id: 3, name: "Can 'AWP' Öz", uni: "Alanya Üniversitesi", faculty: "İletişim", game: "CS2", date: "2026-09-20" },
    { id: 4, name: "Merve 'Healer' Tekin", uni: "Alanya Üniversitesi", faculty: "Mimarlık", game: "LOL", date: "2026-09-22" },
    { id: 5, name: "Deniz 'Smurf' Kılıç", uni: "ALKÜ", faculty: "Spor Bilimleri", game: "VALORANT", date: "2026-09-25" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">ÜNİVERSİTE YÖNETİMİ</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {universities.map((uni) => (
          <div key={uni.id} className="bg-panel border border-white/10 rounded-xl overflow-hidden flex flex-col sm:flex-row">
            <div className={`sm:w-32 h-32 sm:h-auto bg-gradient-to-br ${uni.logoColor} flex items-center justify-center p-6 shrink-0`}>
              <Building2 className="w-12 h-12 text-white/80" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 line-clamp-2" title={uni.name}>{uni.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <UserCog className="w-4 h-4" />
                    <span>Temsilci: <strong className="text-white font-medium">{uni.rep}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Users className="w-4 h-4" />
                    <span>Kayıtlı Oyuncu: <strong className="text-white font-medium">{uni.players}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#99999F]">
                    <Trophy className="w-4 h-4" />
                    <span>Aktif Takım: <strong className="text-white font-medium">{uni.teams}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Info className="w-4 h-4" />
                  Detay
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Düzenle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-space font-bold text-lg text-white">Kayıtlı Oyuncular</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyuncu</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Üniversite</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Fakülte</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Oyun</th>
                <th className="p-4 text-xs font-medium text-[#99999F] uppercase tracking-wider">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registeredPlayers.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-medium text-white">{p.name}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.uni}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.faculty}</td>
                  <td className="p-4 text-sm text-white font-medium">{p.game}</td>
                  <td className="p-4 text-sm text-[#99999F]">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
