"use client";

import { useState } from "react";

interface ScrimItemProps {
  scrim: {
    team: string;
    game: string;
    time: string;
    format: string;
    req: string;
  };
}

export function CommunityScrimItem({ scrim }: ScrimItemProps) {
  const [sent, setSent] = useState(false);

  return (
    <div className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center gap-3 hover:border-white/20 transition-colors group">
      <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-red/10 transition-colors">
        <span className="text-xs font-bold text-white/50 group-hover:text-primary-red transition-colors">{scrim.game.substring(0, 4)}</span>
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-white group-hover:text-primary-red transition-colors">{scrim.team}</div>
        <div className="text-xs text-secondary">{scrim.time} • {scrim.format || 'Bo3'} • {scrim.req}</div>
      </div>
      <button 
        onClick={() => setSent(true)}
        disabled={sent}
        className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
          sent 
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
            : "bg-white/10 hover:bg-white/20 text-white border border-transparent"
        }`}
      >
        {sent ? "İstek Gönderildi" : "İstek Gönder"}
      </button>
    </div>
  );
}
