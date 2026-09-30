const fs = require('fs');
const content = \"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Gamepad2, Shield, Trophy, ArrowLeft, Search } from 'lucide-react';

export default function CrewClient({ crew, user }: { crew: any, user: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const isAuthenticated = !!user;

  const filteredMembers = crew.members.filter((m: any) => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <Shield className="w-16 h-16 text-primary-red mb-6" />
        <h1 className="text-3xl font-heading font-bold text-primary-text mb-4">Erişim Engellendi</h1>
        <p className="text-secondary-text max-w-md mx-auto mb-8">
          Bu ekibin üyelerini ve detaylarını görebilmek için giriş yapmanız gerekmektedir.
        </p>
        <Link href="/login" className="px-6 py-3 bg-primary-red hover:bg-deep-red text-white font-medium rounded-lg transition-colors">
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/crews" className="inline-flex items-center text-sm text-secondary-text hover:text-primary-text mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Oyun Ekiplerine Dön
      </Link>

      <div className="bg-panel border border-border/50 rounded-2xl overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-primary-red/20 to-transparent relative">
          <div className="absolute -bottom-8 left-8 w-24 h-24 bg-[#111114] border-4 border-[#050505] rounded-xl flex items-center justify-center text-primary-red overflow-hidden">
            {crew.cover ? (
              <img src={crew.cover} alt={crew.game} className="w-full h-full object-cover" />
            ) : (
              <Gamepad2 className="w-12 h-12" />
            )}
          </div>
        </div>
        <div className="pt-12 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary-text mb-2">{crew.name}</h1>
            <p className="text-secondary-text flex items-center gap-2">
              <span className="bg-secondary px-2 py-0.5 rounded text-xs border border-border/50">{crew.game}</span>
              Topluluğumuzdaki resmi oyun ekibi
            </p>
          </div>
          <button className="px-6 py-2.5 bg-primary-red hover:bg-deep-red text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary-red/20">
            Ekibe Katıl
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="bg-panel border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-primary-text mb-4 font-heading">İstatistikler</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-secondary-text">
                    <Users className="w-4 h-4 mr-2" /> Üye Sayısı
                  </div>
                  <span className="font-bold text-primary-text">{crew.members.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-secondary-text">
                    <Trophy className="w-4 h-4 mr-2" /> Toplam Kupa
                  </div>
                  <span className="font-bold text-primary-text">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {crew.members.filter((m: any) => m.role === 'Lider').length > 0 && (
            <Card className="bg-panel border-border/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-primary-text mb-4 font-heading">Ekip Lideri</h3>
                {crew.members.filter((m: any) => m.role === 'Lider').map((leader: any) => (
                  <div key={leader.id} className="flex items-center gap-3 mb-3 last:mb-0">
                    <div className="w-10 h-10 rounded-full bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red font-bold uppercase overflow-hidden">
                      {leader.avatar ? <img src={leader.avatar} className="w-full h-full object-cover"/> : leader.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-primary-text text-sm">{leader.name}</div>
                      <div className="text-xs text-secondary-text">{leader.username}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-3">
          <Card className="bg-panel border-border/50">
            <div className="p-6 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold font-heading text-primary-text flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-red" />
                Ekip Üyeleri
              </h2>
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" />
                <input 
                  type="text" 
                  placeholder="Üye, kullanıcı adı veya okul ara..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border/50 rounded-lg text-sm text-primary-text focus:outline-none focus:border-primary-red transition-colors"
                />
              </div>
            </div>
            
            <div className="p-0">
              {filteredMembers.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {filteredMembers.map((member: any) => (
                    <div key={member.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#111114] border border-border/50 flex items-center justify-center text-primary-text font-bold uppercase overflow-hidden">
                          {member.avatar ? <img src={member.avatar} className="w-full h-full object-cover"/> : member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-primary-text flex items-center gap-2">
                            {member.name}
                            {member.role === 'Lider' && (
                              <span className="bg-primary-red/20 text-primary-red text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">Lider</span>
                            )}
                          </div>
                          <div className="text-sm text-secondary-text">{member.username} • {member.school}</div>
                        </div>
                      </div>
                      <Link href={\/players/\\} className="px-4 py-2 text-sm font-medium text-secondary-text hover:text-white border border-border/50 hover:border-white/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        Profili Gör
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-secondary-text">
                  Arama kriterlerine uygun üye bulunamadı.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
\;

fs.writeFileSync('src/app/(public)/crews/[slug]/crew-client.tsx', content, 'utf8');
