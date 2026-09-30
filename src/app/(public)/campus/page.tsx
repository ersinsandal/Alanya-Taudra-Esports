import Image from "next/image";
import Link from "next/link";
import { Swords, Zap, Globe, MessageSquare, Calendar, Trophy, Users } from "lucide-react";
import { CampusRegistrationClient } from "./CampusRegistrationClient";

export const metadata = {
  title: "Campus Clash | ATE Digital Arena",
  description: "Alanya üniversite e-spor arenası",
};

const standings = [
  { university: "Alanya Alaaddin Keykubat Üniversitesi", code: "ALKÜ", points: 120 },
  { university: "Alanya Üniversitesi", code: "ALANYA", points: 95 },
];

const fixtures = [
  { date: "15 Ekim Cuma 20:00", game: "VALORANT", team1: "ALKÜ Esports", team2: "Alanya Uni", result: "2 - 1" },
  { date: "16 Ekim Cumartesi 19:00", game: "League of Legends", team1: "ALKÜ Esports", team2: "Alanya Uni", result: "Bekleniyor" },
  { date: "22 Ekim Cuma 21:00", game: "CS2", team1: "ALKÜ Esports", team2: "Alanya Uni", result: "Bekleniyor" },
];

export default function CampusClashPage() {
  return (
    <div className="min-h-screen pb-24 bg-[#050505]">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-[rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[#050505] z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
        
        <div className="container relative z-20 mx-auto text-center px-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-[#FF1F2D]/10 border border-[#FF1F2D]/20 rounded-full text-[#FF1F2D] text-sm font-bold uppercase tracking-widest mb-6">
            <Swords className="w-4 h-4 mr-2" /> Üniversite E-spor Arenası
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 uppercase tracking-tight">
            CAMPUS CLASH
          </h1>
          <p className="text-xl text-[#99999F] max-w-2xl mx-auto mb-10">
            ALKÜ ve Alanya Üniversitesi arasındaki ezeli rekabet. Kampüsünü seç, sahaya in.
          </p>
          <CampusRegistrationClient />
        </div>
      </div>

      <div className="container mx-auto mt-20 space-y-24">
        {/* University Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-12">
          {/* ALKU */}
          <div className="flex flex-col items-center group w-full md:w-1/3 p-8 rounded-3xl bg-gradient-to-br from-[#111114] to-[#0A0A0C] border border-white/5 hover:border-primary-red/50 transition-colors relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-primary-red opacity-10 blur-[50px] rounded-full z-0" />
            <div className="w-32 h-32 rounded-full bg-[#0B0B0D] border-4 border-white/10 flex items-center justify-center mb-6 group-hover:border-primary-red transition-colors relative z-10">
              <div className="text-3xl font-display font-black text-white">ALKÜ</div>
            </div>
            <h2 className="text-2xl font-display font-bold text-white text-center mb-6 relative z-10">
              Alanya Alaaddin Keykubat<br />Üniversitesi
            </h2>
            <div className="space-y-3 w-full text-sm text-[#99999F] relative z-10 bg-black/20 p-4 rounded-xl">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Temsilci:</span> <span className="text-white font-bold">Mehmet Yılmaz</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Kayıtlı Oyuncu:</span> <span className="text-white font-bold">34</span>
              </div>
              <div className="flex justify-between">
                <span>Aktif Takım:</span> <span className="text-white font-bold">3</span>
              </div>
            </div>
          </div>
          
          <div className="text-5xl font-display font-black text-[#333] italic">
            VS
          </div>
          
          {/* Alanya Uni */}
          <div className="flex flex-col items-center group w-full md:w-1/3 p-8 rounded-3xl bg-gradient-to-bl from-[#111114] to-[#0A0A0C] border border-white/5 hover:border-blue-500/50 transition-colors relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500 opacity-10 blur-[50px] rounded-full z-0" />
            <div className="w-32 h-32 rounded-full bg-[#0B0B0D] border-4 border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors relative z-10">
              <div className="text-3xl font-display font-black text-white text-center leading-tight">ALANYA<br/>ÜNİ.</div>
            </div>
            <h2 className="text-2xl font-display font-bold text-white text-center mb-6 relative z-10">
              Alanya<br />Üniversitesi
            </h2>
            <div className="space-y-3 w-full text-sm text-[#99999F] relative z-10 bg-black/20 p-4 rounded-xl">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Temsilci:</span> <span className="text-white font-bold">Ayşe Demir</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Kayıtlı Oyuncu:</span> <span className="text-white font-bold">28</span>
              </div>
              <div className="flex justify-between">
                <span>Aktif Takım:</span> <span className="text-white font-bold">2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Standings */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-white flex items-center gap-3 uppercase">
              <Trophy className="text-[#D00000]" /> Puan Durumu
            </h3>
            <div className="bg-panel border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#0B0B0D] border-b border-white/10 text-[#99999F] text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Sıra</th>
                    <th className="px-6 py-4 font-semibold">Üniversite</th>
                    <th className="px-6 py-4 font-semibold text-center text-white">Puan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {standings.map((uni, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">#{idx + 1}</td>
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded text-secondary">{uni.code}</span>
                        {uni.university}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-primary-red text-xl">{uni.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fixtures */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-white flex items-center gap-3 uppercase">
              <Calendar className="text-[#D00000]" /> Fikstür
            </h3>
            <div className="space-y-4">
              {fixtures.map((fixture, idx) => (
                <div key={idx} className="bg-panel border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                  <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-3 flex justify-between">
                    <span className="text-white">{fixture.game}</span>
                    <span>{fixture.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-right font-bold text-white text-base">{fixture.team1}</div>
                    <div className={`px-4 py-1.5 rounded text-sm font-black ${fixture.result === 'Bekleniyor' ? 'bg-[#0B0B0D] text-secondary' : 'bg-primary-red text-white'}`}>
                      {fixture.result === 'Bekleniyor' ? 'VS' : fixture.result}
                    </div>
                    <div className="flex-1 text-left font-bold text-white text-base">{fixture.team2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Discord and Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-2xl p-10">
            <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-[#FF1F2D]" /> Neden Katılmalısın?
            </h3>
            <ul className="space-y-4 text-[#99999F]">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[#D00000] mt-2 mr-3 flex-shrink-0" />
                Üniversitenin resmi takımlarında yer alma şansı
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[#D00000] mt-2 mr-3 flex-shrink-0" />
                Ulusal üniversite ligleri için eleme maçları
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[#D00000] mt-2 mr-3 flex-shrink-0" />
                Ödüllü kampüs içi turnuvalar
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[#D00000] mt-2 mr-3 flex-shrink-0" />
                Espor sektöründe staj ve kariyer fırsatları
              </li>
            </ul>
          </div>
          
          <div className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2] opacity-20 blur-[50px] rounded-full" />
            <MessageSquare className="w-12 h-12 text-[#5865F2] mb-6 relative z-10" />
            <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">
              Kampüs Topluluğuna Katıl
            </h3>
            <p className="text-[#99999F] mb-8 relative z-10">
              Üniversitene özel kanallarda takım arkadaşı bul, antrenman maçları ayarla ve turnuvalara hazırlan.
            </p>
            <a href="https://discord.gg/atedigitalarena" target="_blank" rel="noreferrer" className="px-8 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-md font-bold transition-colors shadow-lg shadow-[#5865F2]/20 relative z-10 flex items-center gap-2">
              Discord'a Katıl
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
