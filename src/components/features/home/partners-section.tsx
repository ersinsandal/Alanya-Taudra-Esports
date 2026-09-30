import Image from 'next/image';
import Link from 'next/link';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string | null;
}

interface PartnersSectionProps {
  sponsors: Sponsor[];
}

export function PartnersSection({ sponsors }: PartnersSectionProps) {
  return (
    <section className="py-20 bg-[#0B0B0D] border-t border-[rgba(255,255,255,0.08)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-space text-2xl font-bold text-[#F7F7F7]">PARTNERLERİMİZ</h2>
          <div className="w-12 h-1 bg-[#D00000] mx-auto mt-4" />
        </div>

        {sponsors.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {sponsors.map((sponsor) => (
              sponsor.website ? (
                <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer" className="block hover:opacity-100 transition-opacity">
                  <div className="relative w-32 h-16 md:w-40 md:h-20">
                    <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                  </div>
                </a>
              ) : (
                <div key={sponsor.id} className="relative w-32 h-16 md:w-40 md:h-20 hover:opacity-100 transition-opacity">
                  <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[#99999F] mb-6">Partnerimiz olmak için bizimle iletişime geçin.</p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.05)] rounded text-sm font-medium transition-colors"
            >
              İletişime Geç
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
