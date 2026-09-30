'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Users, Shield, School, Trophy, Newspaper, Calendar, Loader2 } from 'lucide-react';

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'user' | 'team' | 'school' | 'tournament' | 'news' | 'event';
  url: string;
};

type GroupedResults = Record<string, SearchResult[]>;

const ICONS = {
  user: Users,
  team: Shield,
  school: School,
  tournament: Trophy,
  news: Newspaper,
  event: Calendar,
};

const LABELS = {
  user: 'Oyuncular',
  team: 'Takımlar',
  school: 'Okullar',
  tournament: 'Turnuvalar',
  news: 'Haberler',
  event: 'Etkinlikler',
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResults>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Custom event listener for toggling from anywhere
  useEffect(() => {
    const handleToggleCommandPalette = () => setIsOpen(true);
    window.addEventListener('toggle-command-palette', handleToggleCommandPalette);
    return () => window.removeEventListener('toggle-command-palette', handleToggleCommandPalette);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults({});
    }
  }, [isOpen]);

  const flatResults = Object.values(results).flat();

  useEffect(() => {
    if (!query.trim()) {
      setResults({});
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data: SearchResult[] = await res.json();
        
        const grouped = data.reduce((acc, item) => {
          if (!acc[item.type]) acc[item.type] = [];
          acc[item.type].push(item);
          return acc;
        }, {} as GroupedResults);
        
        setResults(grouped);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (flatResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = flatResults[selectedIndex];
      if (selected) {
        handleSelect(selected.url);
      }
    }
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-xl z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-[#111114] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-[#99999F]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ne arıyorsunuz? (Oyuncu, takım, turnuva...)"
                className="flex-1 bg-transparent border-none outline-none text-[#F7F7F7] px-3 py-1 placeholder:text-[#99999F]"
              />
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-[#D00000] animate-spin" />
              ) : (
                <div className="flex items-center gap-1 text-xs text-[#99999F]">
                  <kbd className="bg-white/5 px-1.5 py-0.5 rounded">ESC</kbd>
                </div>
              )}
            </div>

            <div className="overflow-y-auto p-2 flex-1">
              {query && flatResults.length === 0 && !isLoading && (
                <div className="text-center py-8 text-[#99999F]">
                  Sonuç bulunamadı.
                </div>
              )}

              {Object.entries(results).map(([type, items]) => {
                const groupType = type as keyof typeof ICONS;
                const Icon = ICONS[groupType] || Search;
                
                return (
                  <div key={type} className="mb-4 last:mb-0">
                    <div className="px-3 py-1.5 text-xs font-medium text-[#99999F] mb-1">
                      {LABELS[groupType] || type}
                    </div>
                    {items.map((item) => {
                      const globalIndex = flatResults.findIndex(r => r.id === item.id);
                      const isSelected = globalIndex === selectedIndex;
                      
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.url)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#D00000]/10 text-white' : 'text-[#99999F] hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D00000]' : ''}`} />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.title}</span>
                            {item.subtitle && (
                              <span className="text-xs opacity-70">{item.subtitle}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
