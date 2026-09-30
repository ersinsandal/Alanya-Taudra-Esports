'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Users, Lock } from 'lucide-react';

type SchoolType = {
  id: string;
  name: string;
  slug: string;
  type?: string;
  _count: { profiles?: number; students?: number };
};

export default function SchoolsClient({
  schools,
  universities,
  user
}: {
  schools: SchoolType[];
  universities: SchoolType[];
  user: any;
}) {
  const [activeTab, setActiveTab] = useState<'highschools' | 'universities'>('highschools');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const displayData = activeTab === 'highschools' ? schools : universities;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex gap-2 shadow-2xl">
          <button
            onClick={() => setActiveTab('highschools')}
            className={`relative px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-colors ${
              activeTab === 'highschools' ? 'text-white' : 'text-white/40 hover:text-white/80'
            }`}
          >
            {activeTab === 'highschools' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-red rounded-full shadow-[0_0_15px_rgba(255,31,45,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              LİSELER
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('universities')}
            className={`relative px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-colors ${
              activeTab === 'universities' ? 'text-white' : 'text-white/40 hover:text-white/80'
            }`}
          >
            {activeTab === 'universities' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-red rounded-full shadow-[0_0_15px_rgba(255,31,45,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              ÜNİVERSİTELER
            </span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {displayData.map((itemObj) => (
            <motion.div key={itemObj.id} variants={item}>
              <Link href={activeTab === 'highschools' ? `/schools/${itemObj.slug || itemObj.id}` : `/universities/${itemObj.slug || itemObj.id}`}>
                <div className="relative h-[220px] rounded-2xl bg-[#0a0a0c] border border-white/5 overflow-hidden group hover:border-primary-red/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,31,45,0.15)] flex flex-col justify-between">
                  
                  {/* Subtle Background Gradient / Pattern on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glowing Top Border Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-red/0 to-transparent group-hover:via-primary-red transition-all duration-700" />

                  {/* Content Top */}
                  <div className="relative z-10 p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-heading font-black text-white uppercase leading-snug tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                      {itemObj.name}
                    </h3>
                  </div>
                  
                  {/* Content Bottom (Footer) */}
                  <div className="relative z-10 px-6 pb-6 pt-4 mt-auto flex justify-between items-end">
                    {activeTab === 'highschools' ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Kurum Tipi</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          itemObj.type === 'PUBLIC' 
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {itemObj.type === 'PUBLIC' ? 'Devlet' : 'Özel'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Kurum Tipi</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          itemObj.type === 'STATE' 
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {itemObj.type === 'STATE' ? 'Devlet' : 'Vakıf'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Kayıtlı Oyuncu</span>
                      
                      {!user ? (
                        <div className="flex items-center text-[10px] font-bold text-secondary bg-black/40 px-2 py-1 rounded-md border border-white/5">
                          <Lock className="w-3 h-3 mr-1" /> Gizli
                        </div>
                      ) : (
                        <div className="flex items-center text-sm font-bold text-white/80 bg-white/5 px-3 py-1 rounded-md border border-white/10 group-hover:bg-primary-red/10 group-hover:text-primary-red group-hover:border-primary-red/30 transition-colors">
                          <Users className="w-3.5 h-3.5 mr-1.5" />
                          {itemObj._count?.profiles || itemObj._count?.students || 0}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
