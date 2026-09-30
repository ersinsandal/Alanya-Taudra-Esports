import { db } from "@/lib/db";
import Image from "next/image";
import { PartnershipForm } from "@/components/features/partners/partnership-form";

export const metadata = {
  title: "Partnerler & Sponsorlar | ATE Digital Arena",
  description: "ATE Digital Arena'nın değerli partnerleri ve sponsorluk fırsatları",
};

export default async function PartnersPage() {
  let sponsors: any[] = [];
  try {
    sponsors = await db.sponsor.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.warn("Sponsors DB fetch failed, using fallback:", error);
  }

  const tiers = [
    { id: "MAIN_PARTNER", label: "ANA PARTNER", gridClass: "col-span-full mb-12", imageClass: "h-32" },
    { id: "OFFICIAL_PARTNER", label: "RESMİ PARTNERLER", gridClass: "col-span-1 md:col-span-3 mb-8", imageClass: "h-24" },
    { id: "TECHNOLOGY_PARTNER", label: "TEKNOLOJİ PARTNERLERİ", gridClass: "col-span-1 md:col-span-4", imageClass: "h-20" },
    { id: "COMMUNITY_PARTNER", label: "TOPLULUK PARTNERLERİ", gridClass: "col-span-1 md:col-span-4", imageClass: "h-16" },
    { id: "LOCAL_PARTNER", label: "YEREL PARTNERLER", gridClass: "col-span-1 md:col-span-4", imageClass: "h-16" },
  ];

  return (
    <div className="container py-12 mx-auto">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-4">
          PARTNERLER & SPONSORLAR
        </h1>
        <p className="text-[#99999F] text-lg">
          Alanya'da esporun gelişimine katkı sağlayan ve vizyonumuzu paylaşan değerli partnerlerimiz.
        </p>
      </div>

      <div className="space-y-16 mb-24">
        {tiers.map(tier => {
          const tierSponsors = sponsors.filter(s => s.tier === tier.id);
          if (tierSponsors.length === 0) return null;

          return (
            <div key={tier.id} className="text-center">
              <h2 className="text-sm font-bold text-[#99999F] tracking-widest uppercase mb-8 pb-4 border-b border-[rgba(255,255,255,0.08)] inline-block min-w-[200px]">
                {tier.label}
              </h2>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {tierSponsors.map(sponsor => (
                  <a 
                    key={sponsor.id} 
                    href={sponsor.website || "#"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block group p-6 bg-[#111114] border border-[rgba(255,255,255,0.05)] rounded-2xl hover:border-white/20 transition-all hover:-translate-y-1"
                  >
                    <div className={`relative w-48 ${tier.imageClass} flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300`}>
                      {sponsor.logoUrl ? (
                        <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" />
                      ) : (
                        <span className="text-xl font-display font-bold text-white/50">{sponsor.name}</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Partner with us Form */}
      <div className="max-w-3xl mx-auto bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 md:p-12 relative overflow-hidden" id="partner-form">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D00000] opacity-5 blur-[100px] rounded-full" />
        
        <div className="relative z-10 text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Partner Olmak İstiyorum</h2>
          <p className="text-[#99999F]">
            ATE Digital Arena ile işbirliği yapmak ve Alanya'nın espor ekosisteminde yer almak için aşağıdaki formu doldurun.
          </p>
        </div>

        <PartnershipForm />
      </div>
    </div>
  );
}
