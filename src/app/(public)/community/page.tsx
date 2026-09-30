import { Metadata } from 'next';
import { db } from "@/lib/db";
import Link from "next/link";
import { Users, Search, Target, Trophy, MessageSquare } from "lucide-react";
import { CommunityScrimItem } from "./CommunityScrimItem";

export const metadata: Metadata = {
  title: "Topluluk | ATE Digital Arena",
  description: "ATE Digital Arena topluluğuna katıl, takım bul, rakiplerle eşleş",
};

export default async function CommunityPage() {
  // 1. Fetch LFT (Looking For Team) Players
  let lftPlayers: any[] = [];
  try {
    const lftUsers = await db.user.findMany({
      where: {
        status: 'ACTIVE',
        gameProfiles: { some: { lookingForTeam: true } }
      },
      include: {
        gameProfiles: { include: { game: true } }
      },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    lftPlayers = lftUsers.map(user => {
      const profile = user.gameProfiles.find(p => p.lookingForTeam);
      return {
        id: user.id,
        username: user.username,
        game: profile?.game?.name || profile?.gameId || 'Oyun',
        rank: profile?.currentRank || 'Derecesiz',
        role: profile?.currentRank ? 'Dereceli' : 'Oyuncu'
      };
    });
  } catch (error) {
    console.error("LFT fetch failed:", error);
  }

  // 2. Fetch Open Scrims
  let openScrims: any[] = [];
  try {
    const scrims = await db.scrim.findMany({
      where: { status: 'OPEN' },
      include: {
        creatorTeam: true,
        game: true,
      },
      take: 5,
      orderBy: { date: 'asc' }
    });

    openScrims = scrims.map(scrim => ({
      id: scrim.id,
      team: scrim.creatorTeam.name,
      game: scrim.game.name,
      time: scrim.date.toLocaleString('tr-TR', { weekday: 'short', hour: '2-digit', minute:'2-digit' }),
      format: 'Bo' + scrim.bestOf,
      req: scrim.averageLevel || 'Fark Etmez'
    }));
  } catch (error) {
    console.error("Scrims fetch failed:", error);
  }

  // 3. Fetch Top Players
  let topPlayers: any[] = [];
  try {
    const allUsers = await db.user.findMany({
      where: { status: 'ACTIVE' },
      include: { pointTransactions: true },
    });
    
    const usersWithPoints = allUsers.map(u => ({
      id: u.id,
      username: u.username,
      score: u.pointTransactions.reduce((acc, curr) => acc + curr.amount, 0)
    })).filter(u => u.score > 0);

    topPlayers = usersWithPoints.sort((a, b) => b.score - a.score).slice(0, 5);
  } catch (error) {
    console.error("Top players fetch failed:", error);
  }

  return (
    <div className="container py-12 mx-auto max-w-7xl px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 mt-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-2">
            ATE TOPLULUĞU
          </h1>
          <p className="text-secondary text-lg">
            Oyun arkadaşı bul, takım kur, yeni yetenekler keşfet ve rekabet et.
          </p>
        </div>
        <a 
          href="https://discord.gg/atedigitalarena" 
          target="_blank" 
          rel="noreferrer"
          className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-md font-bold transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5" /> Discord'a Katıl
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* LFT Section */}
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col h-full hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-black text-white flex items-center uppercase tracking-wide">
              <Search className="w-5 h-5 mr-2 text-primary-red" /> Takım Arayanlar
            </h2>
            <Link href="/players" className="text-xs text-primary-red hover:underline uppercase font-bold tracking-wider">
              Tümü &rarr;
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {lftPlayers.length > 0 ? lftPlayers.map((player) => (
              <Link href={`/u/${player.username}`} key={player.id}>
                <div className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center gap-3 hover:border-white/20 transition-colors group">
                  <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-red/10 transition-colors">
                    <span className="text-xs font-bold text-white/50 group-hover:text-primary-red transition-colors">{player.game.substring(0, 4)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-primary-red transition-colors">{player.username}</div>
                    <div className="text-xs text-secondary">{player.rank} • {player.role}</div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="text-sm text-secondary p-4 text-center bg-black/20 rounded-lg border border-white/5">Takım arayan oyuncu bulunmuyor.</div>
            )}
          </div>
        </div>

        {/* Scrims Section */}
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col h-full hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-black text-white flex items-center uppercase tracking-wide">
              <Target className="w-5 h-5 mr-2 text-primary-red" /> Açık Scrimler
            </h2>
          </div>
          <div className="space-y-4 flex-1">
            {openScrims.length > 0 ? openScrims.map((scrim) => (
              <CommunityScrimItem key={scrim.id} scrim={scrim} />
            )) : (
              <div className="text-sm text-secondary p-4 text-center bg-black/20 rounded-lg border border-white/5">Şu an açık scrim ilanı bulunmuyor.</div>
            )}
          </div>
        </div>

        {/* Top Players Preview */}
        <div className="bg-panel border border-white/5 rounded-xl p-6 flex flex-col h-full hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-black text-white flex items-center uppercase tracking-wide">
              <Trophy className="w-5 h-5 mr-2 text-primary-red" /> Liderlik Tablosu
            </h2>
            <Link href="/players" className="text-xs text-primary-red hover:underline uppercase font-bold tracking-wider">
              Tümü &rarr;
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {topPlayers.length > 0 ? topPlayers.map((player, idx) => (
              <Link href={`/u/${player.username}`} key={player.id}>
                <div className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between hover:border-white/20 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 text-center font-bold ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-secondary'}`}>
                      #{idx + 1}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-primary-red transition-colors">{player.username}</div>
                  </div>
                  <div className="text-xs font-bold text-primary-red bg-primary-red/10 px-2 py-1 rounded">{player.score} PTS</div>
                </div>
              </Link>
            )) : (
              <div className="text-sm text-secondary p-4 text-center bg-black/20 rounded-lg border border-white/5">Henüz sıralama oluşmadı.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
