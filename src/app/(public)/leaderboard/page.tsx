import { prisma } from "@/lib/db";
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

  let leaderboardData = [];

  if (type === "OYUNCULAR") {
    const points = await prisma.pointTransaction.groupBy({
      by: ['userId'],
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 50
    });
    
    // Fetch users manually
    for (let i = 0; i < points.length; i++) {
      const user = await prisma.user.findUnique({
        where: { id: points[i].userId },
        include: { profile: true }
      });
      if (user) {
        leaderboardData.push({
          id: user.id,
          name: user.username,
          score: points[i]._sum.amount || 0,
          avatar: null,
          rank: i + 1,
          trend: "same"
        });
      }
    }
  } else if (type === "TAKIMLAR") {
    const teams = await prisma.team.findMany({
      take: 50,
      include: {
        members: {
          include: {
            user: {
              include: {
                points: true
              }
            }
          }
        }
      }
    });

    leaderboardData = teams.map((t, idx) => {
      let teamScore = 0;
      t.members.forEach(m => {
        m.user.points.forEach(p => teamScore += p.amount);
      });
      return {
        id: t.id,
        name: t.name,
        score: teamScore,
        avatar: t.logo,
        rank: 0,
        trend: "same"
      };
    }).sort((a, b) => b.score - a.score).map((t, idx) => ({ ...t, rank: idx + 1 })).filter(t => t.score > 0);
  } else if (type === "OKULLAR") {
    const schools = await prisma.school.findMany({
      take: 50,
      include: {
        users: {
          include: {
            user: {
              include: { points: true }
            }
          }
        }
      }
    });

    leaderboardData = schools.map((s, idx) => {
      let schoolScore = 0;
      s.users.forEach(u => {
        if(u.user?.points) {
            u.user.points.forEach(p => schoolScore += p.amount);
        }
      });
      return {
        id: s.id,
        name: s.name,
        score: schoolScore,
        avatar: s.logo,
        rank: 0,
        trend: "same"
      };
    }).sort((a, b) => b.score - a.score).map((s, idx) => ({ ...s, rank: idx + 1 })).filter(s => s.score > 0);
  }

  const top3 = leaderboardData.slice(0, 3);
  const rest = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F7F7F7] pt-24 pb-20 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#FF1F2D]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black font-space mb-4 tracking-tighter">
            LİDERLİK <span className="text-[#FF1F2D]">TABLOSU</span>
          </h1>
          <p className="text-[#99999F] max-w-2xl mx-auto text-lg">
            Arena'nın en iyileri. Puan topla, sıralamada yüksel ve efsaneler arasına adını yazdır.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.value}
                  href={`/leaderboard?type=${tab.value}&game=${game}`}
                  className={`flex items-center px-6 py-3 rounded-full border text-sm font-bold transition-all whitespace-nowrap ${
                    type === tab.value
                      ? 'bg-primary-red border-primary-red text-white shadow-[0_0_15px_rgba(255,31,45,0.4)]'
                      : 'bg-panel border-white/10 text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="flex overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar gap-2">
            {games.map((g) => (
              <Link
                key={g.value}
                href={`/leaderboard?type=${type}&game=${g.value}`}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap ${
                  game === g.value
                    ? 'bg-primary-red border-primary-red text-white'
                    : 'bg-panel border-white/10 text-secondary hover:bg-white/5 hover:text-white'
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
            title="Henüz Kayıt Yok"
            description="Bu kategori için henüz liderlik tablosu verisi bulunmuyor."
          />
        ) : (
          <>
            {/* Top 3 Podium */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 mb-16 mt-20">
              {/* Rank 2 */}
              {top3[1] && (
                <div className="flex flex-col items-center order-2 md:order-1 w-full md:w-1/3 max-w-[250px]">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-[#111111] border-4 border-slate-300 flex items-center justify-center overflow-hidden">
                      {top3[1].avatar ? (
                        <Image src={top3[1].avatar} alt={top3[1].name} fill className="object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-[#99999F]" />
                      )}
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center font-bold text-black border-4 border-[#050505]">
                      2
                    </div>
                  </div>
                  <h3 className="font-bold text-center mb-1 text-lg truncate w-full px-4">{top3[1].name}</h3>
                  <div className="text-[#99999F] text-sm mb-4">{top3[1].score.toLocaleString()} Puan</div>
                  <div className="w-full h-32 md:h-40 bg-gradient-to-t from-slate-300/20 to-slate-300/5 rounded-t-lg border-t-2 border-slate-300/30 flex items-center justify-center">
                    <Medal className="w-8 h-8 text-slate-300 opacity-50" />
                  </div>
                </div>
              )}

              {/* Rank 1 */}
              {top3[0] && (
                <div className="flex flex-col items-center order-1 md:order-2 w-full md:w-1/3 max-w-[300px] z-10">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full bg-[#111111] border-4 border-yellow-400 flex items-center justify-center overflow-hidden">
                      {top3[0].avatar ? (
                        <Image src={top3[0].avatar} alt={top3[0].name} fill className="object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-[#99999F]" />
                      )}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-black text-black border-4 border-[#050505] text-xl shadow-[0_0_20px_rgba(250,204,21,0.5)]">
                      1
                    </div>
                  </div>
                  <h3 className="font-bold text-center mb-1 text-xl truncate w-full px-4">{top3[0].name}</h3>
                  <div className="text-yellow-400 text-sm mb-4 font-bold">{top3[0].score.toLocaleString()} Puan</div>
                  <div className="w-full h-40 md:h-52 bg-gradient-to-t from-yellow-400/20 to-yellow-400/5 rounded-t-lg border-t-2 border-yellow-400/30 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-yellow-400 opacity-70" />
                  </div>
                </div>
              )}

              {/* Rank 3 */}
              {top3[2] && (
                <div className="flex flex-col items-center order-3 w-full md:w-1/3 max-w-[250px]">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-[#111111] border-4 border-amber-600 flex items-center justify-center overflow-hidden">
                      {top3[2].avatar ? (
                        <Image src={top3[2].avatar} alt={top3[2].name} fill className="object-cover" />
                      ) : (
                        <User className="w-10 h-10 text-[#99999F]" />
                      )}
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-bold text-black border-4 border-[#050505]">
                      3
                    </div>
                  </div>
                  <h3 className="font-bold text-center mb-1 text-lg truncate w-full px-4">{top3[2].name}</h3>
                  <div className="text-[#99999F] text-sm mb-4">{top3[2].score.toLocaleString()} Puan</div>
                  <div className="w-full h-24 md:h-32 bg-gradient-to-t from-amber-600/20 to-amber-600/5 rounded-t-lg border-t-2 border-amber-600/30 flex items-center justify-center">
                    <Medal className="w-8 h-8 text-amber-600 opacity-50" />
                  </div>
                </div>
              )}
            </div>

            {/* Rest of Leaderboard */}
            {rest.length > 0 && (
              <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-xs text-[#99999F]">
                        <th className="p-4 font-medium w-16 text-center">SIRA</th>
                        <th className="p-4 font-medium">İSİM</th>
                        <th className="p-4 font-medium text-right">PUAN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rest.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-center font-bold text-[#99999F]">{item.rank}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                                {item.avatar ? (
                                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                                ) : (
                                  <User className="w-4 h-4 text-[#99999F]" />
                                )}
                              </div>
                              <span className="font-bold truncate">{item.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-bold text-[#FF1F2D]">
                            {item.score.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
