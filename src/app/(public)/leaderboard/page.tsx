import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Medal, User, Swords, GraduationCap } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Leaderboard | ATE Digital Arena",
  description: "Alanya'nın en iyi espor oyuncuları ve takımları",
};

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string, game?: string }>;
}) {
  const { type = "OYUNCULAR", game = "TUMU" } = await searchParams;

  const tabs = [
    { label: "OYUNCULAR", value: "OYUNCULAR", icon: User },
    { label: "TAKIMLAR", value: "TAKIMLAR", icon: Swords },
    { label: "OKULLAR", value: "OKULLAR", icon: GraduationCap },
  ];

  const games = [
    { label: "TÜM OYUNLAR", value: "TUMU" },
    { label: "VALORANT", value: "VALORANT" },
    { label: "CS2", value: "CS2" },
    { label: "LEAGUE OF LEGENDS", value: "LOL" },
    { label: "EA FC 24", value: "FC24" },
  ];

  // In a real implementation, you would calculate total points per user/team from PointTransaction
  // Mock data for display purposes
  const leaderboardData = [
    { id: 1, name: "Ahmet 'Fearless' Yılmaz", score: 4500, avatar: null, rank: 1, trend: "up" },
    { id: 2, name: "Mehmet 'Sniper' Demir", score: 4200, avatar: null, rank: 2, trend: "same" },
    { id: 3, name: "Ayşe 'Queen' Kaya", score: 3850, avatar: null, rank: 3, trend: "down" },
    { id: 4, name: "Can 'Ghost' Öz", score: 3400, avatar: null, rank: 4, trend: "up" },
    { id: 5, name: "Elif 'Shadow' Çelik", score: 3100, avatar: null, rank: 5, trend: "same" },
  ];

  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-[#F7F7F7]">
            ALANYA LEADERBOARD
          </h1>
          <p className="text-[#99999F] mt-2">
            Şehrin en iyileri. Turnuvalara katıl, puan topla, sıralamada yüksel.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide flex-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.value}
                href={`/leaderboard?type=${t.value}&game=${game}`}
                className={`flex items-center px-6 py-3 rounded-md whitespace-nowrap text-sm font-bold transition-colors ${
                  type === t.value
                    ? "bg-[#D00000] text-white"
                    : "bg-[#111114] text-[#99999F] hover:bg-[#1A1A1E] hover:text-white border border-[rgba(255,255,255,0.08)]"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {t.label}
              </Link>
            )
          })}
        </div>
        
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
          {games.map((g) => (
            <Link
              key={g.value}
              href={`/leaderboard?type=${type}&game=${g.value}`}
              className={`px-4 py-3 rounded-md whitespace-nowrap text-xs font-bold transition-colors ${
                game === g.value
                  ? "bg-white/10 text-white border border-white/20"
                  : "bg-transparent text-[#99999F] border border-transparent hover:text-white"
              }`}
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>

      {leaderboardData.length === 0 ? (
        <ATEEmptyState
          icon={Trophy}
          title="Henüz Sıralama Yok"
          description="Bu kategoride henüz yeterli veri toplanmadı."
        />
      ) : (
        <>
          {/* Top 3 Podium */}
          <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 h-auto md:h-80 mt-12 md:mt-24">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111114] border-4 border-[#C0C0C0] mb-4 flex items-center justify-center relative overflow-hidden">
                  <User className="w-10 h-10 text-[#C0C0C0]" />
                  <div className="absolute bottom-0 w-full bg-[#C0C0C0] text-black text-center text-xs font-bold py-0.5">#2</div>
                </div>
                <div className="bg-[#111114] border border-[#C0C0C0]/30 rounded-t-xl w-full p-6 text-center h-32 md:h-40 flex flex-col justify-between">
                  <h3 className="font-bold text-white truncate">{top3[1].name}</h3>
                  <div className="text-[#C0C0C0] font-display font-bold text-2xl">{top3[1].score} PTS</div>
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {top3[0] && (
              <div className="w-full md:w-1/3 order-1 md:order-2 flex flex-col items-center -mt-8 md:-mt-16">
                <Medal className="w-12 h-12 text-[#FFD700] mb-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#111114] border-4 border-[#FFD700] mb-4 flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                  <User className="w-12 h-12 text-[#FFD700]" />
                  <div className="absolute bottom-0 w-full bg-[#FFD700] text-black text-center text-xs font-bold py-1">#1</div>
                </div>
                <div className="bg-gradient-to-b from-[#FFD700]/10 to-[#111114] border border-[#FFD700]/30 rounded-t-xl w-full p-6 text-center h-36 md:h-48 flex flex-col justify-between shadow-[0_-10px_30px_rgba(255,215,0,0.05)]">
                  <h3 className="font-bold text-white truncate text-lg">{top3[0].name}</h3>
                  <div className="text-[#FFD700] font-display font-bold text-3xl">{top3[0].score} PTS</div>
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {top3[2] && (
              <div className="w-full md:w-1/3 order-3 md:order-3 flex flex-col items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111114] border-4 border-[#CD7F32] mb-4 flex items-center justify-center relative overflow-hidden">
                  <User className="w-10 h-10 text-[#CD7F32]" />
                  <div className="absolute bottom-0 w-full bg-[#CD7F32] text-black text-center text-xs font-bold py-0.5">#3</div>
                </div>
                <div className="bg-[#111114] border border-[#CD7F32]/30 rounded-t-xl w-full p-6 text-center h-28 md:h-32 flex flex-col justify-between">
                  <h3 className="font-bold text-white truncate">{top3[2].name}</h3>
                  <div className="text-[#CD7F32] font-display font-bold text-xl">{top3[2].score} PTS</div>
                </div>
              </div>
            )}
          </div>

          {/* List */}
          <div className="bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#0B0B0D] border-b border-white/5 text-xs uppercase tracking-wider text-[#99999F]">
                <tr>
                  <th className="px-6 py-4 font-medium w-16 text-center">#</th>
                  <th className="px-6 py-4 font-medium">İsim</th>
                  <th className="px-6 py-4 font-medium text-right">ATE Puanı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rest.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-center font-bold text-[#99999F]">
                      {item.rank}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white/10 mr-3 flex items-center justify-center">
                          <User className="w-4 h-4 text-[#99999F]" />
                        </div>
                        <span className="font-bold text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-display font-bold text-[#D00000]">
                      {item.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
