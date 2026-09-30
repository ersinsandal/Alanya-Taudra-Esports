import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Crosshair, Users, Shield, Trophy, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ATEEmptyState } from '@/components/ui/empty-state';

export const metadata: Metadata = {
  title: 'Oyuncular | ATE Digital Arena',
};

export default async function PlayersPage({ searchParams }: { searchParams: Promise<{ game?: string }> | { game?: string } }) {
  let users: any[] = [];
  try {
    users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        profile: {
          showGameProfiles: true
        }
      },
      include: {
        profile: {
          include: {
            school: true,
            university: true,
          }
        },
        gameProfiles: {
          include: { game: true }
        },
        roles: {
          include: { role: true }
        },
        pointTransactions: true,
      },
      take: 50,
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.warn("Players DB fetch failed, using fallback:", error);
  }

  // Calculate points and prepare data
  const players = users.map(user => {
    const totalPoints = user.pointTransactions?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;
    const schoolName = user.profile?.university?.name || user.profile?.school?.name || null;
    const mainRole = user.roles?.[0]?.role?.name || 'Oyuncu';
    
    return {
      ...user,
      totalPoints,
      schoolName,
      mainRole
    };
  });

  // Sort by points descending (like a leaderboard)
  players.sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mt-12 mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary-red/10 rounded-full mb-6">
          <Users className="w-8 h-8 text-primary-red" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
          OYUNCULAR
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Arenada yerini alan tüm esporcular, topluluk üyeleri ve ATE Liderlik Tablosu.
        </p>
      </div>

      {players.length === 0 ? (
        <ATEEmptyState
          icon={Users}
          title="Henüz Oyuncu Yok"
          description="Arenaya ilk adımı atan sen ol."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => {
            const mainGame = player.gameProfiles?.[0];
            return (
              <Card key={player.id} className="bg-panel border-white/5 hover:border-primary-red/30 transition-all duration-300 group overflow-hidden relative">
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
                
                <CardContent className="p-6 relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-black/50 border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1.5 backdrop-blur-sm">
                      <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-xs font-bold text-white">{player.totalPoints} PTS</span>
                    </div>
                    {player.mainRole !== 'Oyuncu' && (
                      <Badge className="bg-primary-red/20 text-primary-red border border-primary-red/20 font-bold uppercase text-[10px] tracking-wider">
                        {player.mainRole}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col items-center text-center mt-2 mb-6">
                    <div className="relative mb-4">
                      <Avatar className="w-24 h-24 border-2 border-white/10 group-hover:border-primary-red transition-colors shadow-2xl">
                        <AvatarImage src={player.profile?.avatarUrl || ''} className="object-cover" />
                        <AvatarFallback className="bg-[#111114] text-white/40">
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      </Avatar>
                      {player.profile?.isAlanya && (
                        <div className="absolute -bottom-2 -right-2 bg-[#D00000] p-1.5 rounded-full border-2 border-panel" title="Alanya Oyuncusu">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <Link href={`/u/${player.username}`} className="font-heading font-black text-2xl text-white hover:text-primary-red transition-colors mb-1 uppercase tracking-tight">
                      {player.username}
                    </Link>
                    <p className="text-xs text-secondary font-mono bg-white/5 px-2 py-0.5 rounded">{player.ateId}</p>
                  </div>

                  <div className="flex-1" />

                  <div className="space-y-3 w-full">
                    {player.schoolName && (
                      <div className="flex items-center text-xs text-secondary bg-white/5 p-2 rounded-lg border border-white/5">
                        <Building2 className="w-4 h-4 mr-2 text-white/40" />
                        <span className="truncate">{player.schoolName}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 justify-center">
                      {mainGame ? (
                        <>
                          <Badge variant="outline" className="border-white/10 text-white/70 bg-black/40">
                            {mainGame.game?.name || mainGame.gameId}
                          </Badge>
                          {mainGame.currentRank && (
                            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                              {mainGame.currentRank}
                            </Badge>
                          )}
                        </>
                      ) : (
                        <Badge variant="outline" className="border-white/10 text-white/30 border-dashed">
                          Oyun Profili Yok
                        </Badge>
                      )}
                      
                      {mainGame?.lookingForTeam && (
                        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/20">Takım Arıyor</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
