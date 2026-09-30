import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Play, Image as ImageIcon, Camera } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Medya | ATE Digital Arena",
  description: "ATE Digital Arena'dan fotoğraflar, videolar ve en iyi anlar",
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  
  const where = filter && filter !== "TUMU" 
    ? { type: filter as any } 
    : {};

  const media = await db.mediaItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const filters = [
    { label: "TÜMÜ", value: "TUMU" },
    { label: "FOTOĞRAF", value: "PHOTO" },
    { label: "VİDEO", value: "VIDEO" },
    { label: "HIGHLIGHT", value: "HIGHLIGHT" },
  ];

  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-[#F7F7F7]">
            MEDYA
          </h1>
          <p className="text-[#99999F] mt-2">
            Arenanın en iyi anları, etkinlikler ve turnuvalardan kareler.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
        {filters.map((f) => (
          <Link
            key={f.value}
            href={`/media${f.value !== "TUMU" ? `?filter=${f.value}` : ""}`}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
              (filter || "TUMU") === f.value
                ? "bg-[#D00000] text-white"
                : "bg-[#111114] text-[#99999F] hover:bg-[#1A1A1E] hover:text-white border border-[rgba(255,255,255,0.08)]"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {media.length === 0 ? (
        <ATEEmptyState
          icon={Camera}
          title="Medya Bulunamadı"
          description="Bu kategoride henüz bir medya içeriği bulunmuyor."
        />
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {media.map((item) => (
            <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-[#111114] border border-white/5">
              {item.type === "PHOTO" ? (
                <>
                  <Image 
                    src={item.url} 
                    alt={item.title} 
                    width={600} 
                    height={800} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <ImageIcon className="w-6 h-6 text-white mb-2" />
                    <h3 className="text-white font-bold text-sm line-clamp-2">{item.title}</h3>
                  </div>
                </>
              ) : (
                <a href={item.url} target="_blank" rel="noreferrer" className="block relative">
                  <Image 
                    src={item.thumbnailUrl || "/default-video-bg.jpg"} 
                    alt={item.title} 
                    width={600} 
                    height={338} 
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D00000] flex items-center justify-center pl-1 transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-bold text-sm line-clamp-2">{item.title}</h3>
                    <div className="text-xs text-[#D00000] mt-1 font-bold tracking-wider">{item.type}</div>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
