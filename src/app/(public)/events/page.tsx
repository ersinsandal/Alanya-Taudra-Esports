import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Etkinlikler | ATE Digital Arena",
  description: "ATE Digital Arena topluluk etkinlikleri, turnuvalar ve watch partyler",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  
  const where = type && type !== "TUMU" ? { type: type as any, isActive: true } : { isActive: true };

  let events: any[] = [];
  try {
    events = await db.event.findMany({
      where,
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: [
        { date: "desc" },
      ],
    });
  } catch (error) {
    console.warn("Events DB fetch failed, using fallback:", error);
  }

  // Separate upcoming and past
  const now = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= now);
  const pastEvents = events.filter(e => new Date(e.date) < now);

  const sortedEvents = [...upcomingEvents, ...pastEvents];

  const types = [
    { label: "TÜMÜ", value: "TUMU" },
    { label: "WATCH PARTY", value: "WATCH_PARTY" },
    { label: "LAN", value: "LAN" },
    { label: "TURNUVA", value: "TOURNAMENT" },
    { label: "WORKSHOP", value: "WORKSHOP" },
    { label: "TOPLULUK", value: "COMMUNITY_MEETUP" },
  ];

  return (
    <div className="container py-12 mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-[#F7F7F7]">
            ETKİNLİKLER
          </h1>
          <p className="text-[#99999F] mt-2">
            Toplulukla buluş, beraber izle, beraber oyna.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
        {types.map((t) => (
          <Link
            key={t.value}
            href={`/events${t.value !== "TUMU" ? `?type=${t.value}` : ""}`}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
              (type || "TUMU") === t.value
                ? "bg-[#D00000] text-white"
                : "bg-[#111114] text-[#99999F] hover:bg-[#1A1A1E] hover:text-white border border-[rgba(255,255,255,0.08)]"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {sortedEvents.length === 0 ? (
        <ATEEmptyState
          icon={Calendar}
          title="Etkinlik Bulunamadı"
          description="Bu kategoride şu an için planlanmış bir etkinlik bulunmuyor."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => {
            const isUpcoming = new Date(event.date) >= now;
            
            return (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className={`group flex flex-col bg-[#0B0B0D] rounded-xl border overflow-hidden transition-colors ${
                  isUpcoming 
                    ? "border-[rgba(255,255,255,0.08)] hover:border-[#D00000]/50" 
                    : "border-white/5 opacity-80"
                }`}
              >
                <div className="aspect-video relative bg-[#111114] flex items-center justify-center overflow-hidden">
                  {event.coverImage ? (
                    <Image
                      src={event.coverImage}
                      alt={event.title}
                      fill
                      className={`object-cover transition-transform duration-500 ${isUpcoming ? 'group-hover:scale-105' : 'grayscale'}`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#111114] to-[#1A1A1E] flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-[rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-bold text-white z-10">
                    {event.type.replace("_", " ")}
                  </div>
                  
                  {!isUpcoming && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="px-4 py-2 bg-black/80 rounded border border-white/10 font-bold text-white tracking-widest uppercase">
                        TAMAMLANDI
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-display font-bold text-white mb-4 line-clamp-2 group-hover:text-[#FF1F2D] transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="mt-auto space-y-2.5">
                    <div className="flex items-center text-sm text-[#99999F]">
                      <Calendar className="w-4 h-4 mr-2.5 text-[#D00000]" />
                      {format(event.date, "d MMMM yyyy", { locale: tr })} 
                      {event.time && ` • ${event.time}`}
                    </div>
                    
                    {event.venue && (
                      <div className="flex items-center text-sm text-[#99999F]">
                        <MapPin className="w-4 h-4 mr-2.5 text-[#D00000]" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-[#99999F] pt-3 border-t border-[rgba(255,255,255,0.08)] mt-3">
                      {event.capacity ? (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-[#99999F]" />
                          {event._count.registrations} / {event.capacity} Kayıtlı
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Ticket className="w-4 h-4 mr-2 text-[#99999F]" />
                          Kayıt Açık
                        </div>
                      )}
                      
                      <span className="text-[#FF1F2D] font-medium group-hover:underline text-xs uppercase tracking-wider">
                        Detaylar &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
