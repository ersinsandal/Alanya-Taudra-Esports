import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, User, Gamepad2, Shield, Plus, Users, School } from 'lucide-react';
import { EditProfileModal } from './edit-profile-modal';
import Link from 'next/link';
import { EditGamesModal } from './edit-games-modal';

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  return { title: `${resolvedParams.username} | ATE Digital Arena` };
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  console.log('Resolved Params:', resolvedParams);
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.roles?.some((r: any) => ['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(r.role.name));

  const games = await prisma.game.findMany({ where: { isActive: true } });
  const user = await prisma.user.findFirst({
    where: { username: username, status: 'ACTIVE' },
    include: {
      profile: { include: { university: true } },
      gameProfiles: { include: { game: true } },
      teamMemberships: { include: { team: true } },
      crewMemberships: { include: { crew: true } },
      roles: { include: { role: true } },
      achievements: { include: { achievement: true } }
    }
  });

  if (!user || !user.profile) notFound();

  let isSameTeamOrCrew = false;
  if (currentUser) {
    const currentUserTeams = await prisma.teamMember.findMany({ where: { userId: currentUser.id } });
    const currentUserCrews = await prisma.crewMember.findMany({ where: { userId: currentUser.id } });
    
    const teamIds = currentUserTeams.map(t => t.teamId);
    const crewIds = currentUserCrews.map(c => c.crewId);
    
    isSameTeamOrCrew = 
      user.teamMemberships.some(t => teamIds.includes(t.teamId)) ||
      user.crewMemberships.some(c => crewIds.includes(c.crewId));
  }

  const isOwner = currentUser?.id === user.id;
  const canSeeHidden = isOwner || isAdmin || isSameTeamOrCrew;

  // Privacy Check Functions
  const canSeeAge = isOwner || user.profile.privacyAge === 'PUBLIC' || (user.profile.privacyAge === 'TEAM' && canSeeHidden);
  const canSeeGames = isOwner || user.profile.privacyGames === 'PUBLIC' || (user.profile.privacyGames === 'TEAM' && canSeeHidden);

  const calculateAge = (birthDate: Date | null) => {
    if (!birthDate) return null;
    const diff_ms = Date.now() - birthDate.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-panel border border-white/5 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-red to-accent-red"></div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary-red shadow-[0_0_20px_rgba(208,0,0,0.3)] overflow-hidden bg-black/60 flex items-center justify-center shrink-0 relative">
            {user.profile.avatarUrl ? (
              <img 
                src={user.profile.avatarUrl} 
                alt={user.username} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <User className="w-10 h-10 md:w-12 md:h-12 text-secondary-text" />
            )}
          </div>
          
          <div className="flex-1 w-full min-w-0">
            <div className="flex justify-between items-start w-full">
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 truncate pr-4">{user.username}</h1>
              {isOwner && <EditProfileModal user={user} />}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-secondary mb-4">
              <Badge variant="outline" className="border-primary-red text-primary-red bg-primary-red/10">
                {user.ateId}
              </Badge>

              {user.roles?.some(r => r.role.name === 'KURUCU_BASKAN') && (
                <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold border-none shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                  <span className="mr-1">👑</span> Kurucu Başkan
                </Badge>
              )}

              {user.profile.city && (
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-secondary-text"/> {user.profile.city}</div>
              )}

              {user.profile.university && (
                <div className="flex items-center gap-1 text-blue-400"><School className="w-4 h-4"/> {user.profile.university.name}</div>
              )}

              {canSeeAge && user.profile.birthDate && (
                <div className="flex items-center gap-1 text-orange-400"><Calendar className="w-4 h-4"/> {calculateAge(user.profile.birthDate)} Yaşında</div>
              )}

              {user.profile.privacyAge === 'TEAM' && !canSeeHidden && (
                <div className="flex items-center gap-1 text-secondary-text opacity-50" title="Yaş bilgisi sadece ekip üyelerine açık.">
                  <Shield className="w-4 h-4"/> Yaş Ekibe Açık
                </div>
              )}

              {user.profile.privacyAge === 'PRIVATE' && !isOwner && (
                <div className="flex items-center gap-1 text-secondary-text opacity-50" title="Kullanıcı yaş bilgisini gizli tutuyor.">
                  <Shield className="w-4 h-4"/> Yaş Gizli
                </div>
              )}

              {user.profile.discordUsername && (
                <div className="flex items-center gap-1 text-indigo-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                  {user.profile.discordUsername}
                </div>
              )}
            </div>
            {user.profile.bio && <p className="text-white/80 max-w-3xl italic">"{user.profile.bio}"</p>}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-panel border border-white/5 p-1 h-auto flex-wrap">
          <TabsTrigger value="overview" className="px-4 py-3 md:px-6 data-[state=active]:bg-primary-red data-[state=active]:text-white">GENEL BAKIŞ</TabsTrigger>
          <TabsTrigger value="games" className="px-4 py-3 md:px-6 data-[state=active]:bg-primary-red data-[state=active]:text-white flex items-center gap-2">
            OYUN PROFİLLERİ {user.profile.privacyGames === 'TEAM' && <Shield className="w-3 h-3"/>}
          </TabsTrigger>
          <TabsTrigger value="teams" className="px-4 py-3 md:px-6 data-[state=active]:bg-primary-red data-[state=active]:text-white">TAKIMLAR & EKİPLER</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-panel border-white/5">
              <CardHeader><CardTitle className="text-white font-heading">Başarılar</CardTitle></CardHeader>
              <CardContent>
                {user.achievements.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.achievements.map(a => (
                      <Badge key={a.id} variant="secondary">{a.achievement.name}</Badge>
                    ))}
                  </div>
                ) : <p className="text-secondary text-sm">Henüz bir başarı kazanılmadı.</p>}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="games">
          {!canSeeGames ? (
            <div className="bg-panel border border-warning/20 rounded-xl p-12 flex flex-col items-center justify-center text-center">
              <Shield className="w-16 h-16 text-warning/50 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Gizli Oyun Profilleri</h3>
              <p className="text-secondary-text max-w-md">Bu profil, oyun profillerini yalnızca aynı takım veya ekipte bulunduğu arkadaşlarıyla paylaşıyor.</p>
            </div>
          ) : (
            <div>
              {isOwner && (
                <div className="mb-6 flex justify-end">
                  <EditGamesModal user={user} games={games} />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.gameProfiles.map((gp: any) => (
                  <Card key={gp.id} className="bg-panel border-white/5 hover:border-primary-red/30 transition-colors">
                    <CardHeader className="pb-3"><CardTitle className="text-white font-heading flex justify-between items-center">
                      <span className="text-xl">{gp.game.name}</span>
                      {gp.lookingForTeam && <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-500/10">LFT</Badge>}
                    </CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm text-secondary">
                      {gp.inGameName && (
                        <div>
                          <span className="text-white/50 block text-xs mb-1">Oyun İçi Nick (IGN)</span> 
                          <span className="text-white font-mono text-base">{gp.inGameName}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                        {gp.currentRank && <div><span className="text-white/50 block text-xs mb-1">Kademe</span> <span className="text-white font-medium">{gp.currentRank}</span></div>}
                        {gp.mainRole && <div><span className="text-white/50 block text-xs mb-1">Rol</span> <span className="text-white font-medium">{gp.mainRole}</span></div>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {user.gameProfiles.length === 0 && (
                  <p className="text-secondary text-sm col-span-full py-8 text-center bg-black/20 rounded-xl border border-white/5">Henüz oyun profili eklenmemiş.</p>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Gamepad2 className="w-5 h-5 text-primary-red"/> Takımlar</h3>
              {user.teamMemberships.map(tm => (
                <Card key={tm.id} className="bg-panel border-white/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-black flex items-center justify-center shrink-0 border border-white/10">
                      {tm.team.logoUrl ? <img src={tm.team.logoUrl} alt="Logo" /> : <div className="text-white/30 font-bold">{tm.team.slug || tm.team.name.substring(0,3).toUpperCase()}</div>}
                    </div>
                    <div>
                      <div className="font-bold text-white">{tm.team.name}</div>
                      <div className="text-secondary-text text-sm">Rol: <span className="text-white">{tm.role}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {user.teamMemberships.length === 0 && <p className="text-secondary-text text-sm">Henüz bir takıma dahil değil.</p>}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><Users className="w-5 h-5 text-primary-red"/> Ekipler</h3>
              {user.crewMemberships.map(cm => (
                <Card key={cm.id} className="bg-panel border-white/5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-black flex items-center justify-center shrink-0 border border-white/10">
                      {cm.crew.logoUrl ? <img src={cm.crew.logoUrl} alt="Logo" /> : <div className="text-white/30 font-bold">{cm.crew.tag}</div>}
                    </div>
                    <div>
                      <div className="font-bold text-white">{cm.crew.name}</div>
                      <div className="text-secondary-text text-sm">Ekip Üyesi</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {user.crewMemberships.length === 0 && <p className="text-secondary-text text-sm">Henüz bir ekibe dahil değil.</p>}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
