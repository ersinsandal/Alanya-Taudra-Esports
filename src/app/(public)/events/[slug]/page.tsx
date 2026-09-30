import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, MapPin, Users, Info, ExternalLink, ShieldAlert } from "lucide-react";
import { registerForEvent, cancelRegistration } from "@/lib/actions/events";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await db.event.findUnique({
    where: { slug },
  });

  if (!event) return { title: "Etkinlik Bulunamadı" };

  return {
    title: `${event.title} | ATE Digital Arena`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await db.event.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { registrations: true },
      },
      registrations: true, // we will mock auth
    },
  });

  if (!event) notFound();

  // Mocking auth
  const userId = "mock-user-id"; 
  const isRegistered = event.registrations.some(r => r.userId === userId);
  const isFull = event.capacity ? event._count.registrations >= event.capacity : false;
  const isPast = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[400px] md:h-[500px] bg-[#111114] border-b border-[rgba(255,255,255,0.08)]">
        {event.coverImage && (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        
        <div className="container relative h-full flex flex-col justify-end pb-12 mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded text-xs font-bold text-white uppercase tracking-wider mb-4">
              {event.type.replace("_", " ")}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#99999F]">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-[#D00000]" />
                <span className="text-white text-lg">
                  {format(event.date, "d MMMM yyyy", { locale: tr })}
                  {event.time && ` - ${event.time}`}
                </span>
              </div>
              
              {event.venue && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-[#D00000]" />
                  <span className="text-white text-lg">{event.venue}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111114] rounded-2xl p-8 border border-[rgba(255,255,255,0.08)]">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-[#D00000]" /> Etkinlik Detayları
              </h2>
              <div className="prose prose-invert max-w-none text-lg text-[#99999F] leading-relaxed">
                <p>{event.description || "Etkinlik detayları bulunmamaktadır."}</p>
              </div>
            </div>

            {event.mapUrl && (
              <div className="bg-[#111114] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
                <div className="p-4 bg-[#0B0B0D] border-b border-white/5 flex items-center justify-between">
                  <h3 className="font-bold text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#D00000]" /> Konum
                  </h3>
                  <a href={event.mapUrl} target="_blank" rel="noreferrer" className="text-sm text-[#FF1F2D] hover:underline flex items-center">
                    Haritada Aç <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
                <div className="aspect-video w-full bg-white/5 flex items-center justify-center">
                  <span className="text-[#99999F]">Harita Embed Alanı (Iframe)</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[#111114] rounded-2xl p-6 border border-[rgba(255,255,255,0.08)] sticky top-24">
              <h3 className="font-display font-bold text-white mb-6 text-xl">Kayıt Durumu</h3>
              
              <div className="space-y-4 mb-8">
                {event.capacity && (
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-[#99999F] flex items-center">
                      <Users className="w-4 h-4 mr-2" /> Kapasite
                    </span>
                    <span className="text-white font-bold">
                      {event._count.registrations} / {event.capacity}
                    </span>
                  </div>
                )}
                
                {event.ageRequirement && (
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <span className="text-[#99999F] flex items-center">
                      <ShieldAlert className="w-4 h-4 mr-2" /> Yaş Sınırı
                    </span>
                    <span className="text-white font-bold">
                      +{event.ageRequirement}
                    </span>
                  </div>
                )}
              </div>

              {!isPast ? (
                isRegistered ? (
                  <div className="space-y-4">
                    <div className="w-full py-4 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-center font-bold uppercase tracking-wide">
                      Kayıtlısınız
                    </div>
                    <form action={async () => {
                      "use server";
                      await cancelRegistration(event.id);
                    }}>
                      <button type="submit" className="w-full py-3 text-[#99999F] hover:text-white text-sm underline transition-colors">
                        Kaydı İptal Et
                      </button>
                    </form>
                  </div>
                ) : isFull ? (
                  <div className="w-full py-4 bg-white/5 text-[#99999F] border border-white/10 rounded-xl text-center font-bold uppercase tracking-wide">
                    Kontenjan Dolu
                  </div>
                ) : (
                  <form action={async () => {
                    "use server";
                    await registerForEvent(event.id);
                  }}>
                    <button type="submit" className="w-full py-4 bg-[#D00000] hover:bg-[#FF1F2D] text-white rounded-xl font-bold uppercase tracking-wide transition-all hover:scale-[1.02] shadow-lg shadow-[#D00000]/20">
                      Hemen Kayıt Ol
                    </button>
                  </form>
                )
              ) : (
                <div className="w-full py-4 bg-white/5 text-[#99999F] border border-white/10 rounded-xl text-center font-bold uppercase tracking-wide">
                  Etkinlik Tamamlandı
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
