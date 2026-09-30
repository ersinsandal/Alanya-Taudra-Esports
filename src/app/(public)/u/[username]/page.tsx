import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, GraduationCap, User } from 'lucide-react';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  return { title: `${params.username} | ATE Digital Arena` };
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.roles?.some((r: any) => ['ADMIN', 'SUPER_ADMIN', 'MODERATOR'].includes(r.role.name));

  const user = await prisma.user.findUnique({
    where: { username: params.username, status: 'ACTIVE' },
    include: {
      profile: true,
      gameProfiles: true,
      teamMemberships: {
        include: { team: true }
      },
      achievements: {
        include: { achievement: true }
      }
    }
  });

  if (!user || !user.profile) notFound();

  let isSameTeam = false;
  if (currentUser) {
    const currentUserTeams = await prisma.teamMember.findMany({
      where: { userId: currentUser.id }
    });
    const currentUserTeamIds = currentUserTeams.map(t => t.teamId);
    isSameTeam = user.teamMemberships.some(t => currentUserTeamIds.includes(t.teamId));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-panel border border-white/5 rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <Avatar className="w-24 h-24 border-2 border-primary-red shadow-lg">
            <AvatarImage src={user.profile.avatarUrl || ''} />
            <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-white mb-2">{user.username}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-4">
              <Badge variant="outline" className="border-primary-red text-primary-red bg-primary-red/10">
                {user.ateId}
              </Badge>
              {user.profile.showCity && user.profile.city && (
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {user.profile.city}</div>
              )}
              {user.profile.showSchool && user.profile.studentStatus && (
                <div className="flex items-center gap-1"><GraduationCap className="w-4 h-4"/> Öğrenci</div>
              )}
              {user.profile.discordUsername && (
                <div className="flex items-center gap-1 text-indigo-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                  {user.profile.discordUsername}
                </div>
              )}
              {(isAdmin || currentUser?.id === user.id || isSameTeam) && user.phone && (
                <div className="flex items-center gap-1 text-emerald-400">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  {user.phone}
                </div>
              )}
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {user.createdAt.toLocaleDateString('tr-TR')}</div>
            </div>
            {user.profile.bio && <p className="text-white/80 max-w-3xl">{user.profile.bio}</p>}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-panel border border-white/5 p-1 h-auto">
          <TabsTrigger value="overview" className="px-6 py-3 data-[state=active]:bg-primary-red data-[state=active]:text-white">GENEL BAKIŞ</TabsTrigger>
          {user.profile.showGameProfiles && (
            <TabsTrigger value="games" className="px-6 py-3 data-[state=active]:bg-primary-red data-[state=active]:text-white">OYUNLAR</TabsTrigger>
          )}
          <TabsTrigger value="teams" className="px-6 py-3 data-[state=active]:bg-primary-red data-[state=active]:text-white">TAKIMLAR</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overview cards */}
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
        
        {user.profile.showGameProfiles && (
          <TabsContent value="games">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.gameProfiles.map(gp => (
                <Card key={gp.id} className="bg-panel border-white/5">
                  <CardHeader><CardTitle className="text-white font-heading flex justify-between">
                    <span>{gp.gameId}</span>
                    {gp.lookingForTeam && <Badge variant="outline" className="text-success border-success">LFT</Badge>}
                  </CardTitle></CardHeader>
                  <CardContent className="space-y-2 text-sm text-secondary">
                    {gp.inGameName && <div><span className="text-white/50">IGN:</span> <span className="text-white">{gp.inGameName}</span></div>}
                    {gp.currentRank && <div><span className="text-white/50">Rank:</span> <span className="text-white">{gp.currentRank}</span></div>}
                    {gp.mainRole && <div><span className="text-white/50">Rol:</span> <span className="text-white">{gp.mainRole}</span></div>}
                  </CardContent>
                </Card>
              ))}
             </div>
          </TabsContent>
        )}

        <TabsContent value="teams">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.teamMemberships.map(tm => (
              <Card key={tm.id} className="bg-panel border-white/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-black flex items-center justify-center shrink-0 border border-white/10">
                      {tm.team.logoUrl ? <img src={tm.team.logoUrl} alt="Logo" /> : <div className="text-white/30 font-bold">{tm.team.tag}</div>}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{tm.team.name}</div>
                      <div className="text-secondary text-sm">Rol: <span className="text-white">{tm.role}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {user.teamMemberships.length === 0 && <p className="text-secondary col-span-full">Henüz bir takımda bulunmuyor.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
