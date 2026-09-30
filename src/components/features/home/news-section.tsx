import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  publishedAt: Date;
  slug: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-20 bg-[#0B0B0D]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl font-black text-white uppercase tracking-tight">HABERLER</h2>
            <div className="w-16 h-1 bg-[#D00000] mt-4" />
          </div>
          <Link href="/news" className="text-[#99999F] hover:text-[#F7F7F7] transition-colors hidden sm:block">
            Tüm Haberler &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} className="group bg-[#111114] border border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden flex flex-col">
                <div className="relative h-48 bg-[rgba(255,255,255,0.02)]">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[rgba(255,255,255,0.1)]">
                      Görsel Yok
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-[#D00000] text-white rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[#99999F] text-xs mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{item.publishedAt.toLocaleDateString('tr-TR')}</span>
                  </div>
                  <h3 className="font-heading font-black text-lg text-[#F7F7F7] mb-3 line-clamp-2 group-hover:text-[#D00000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#99999F] text-sm line-clamp-3 mb-6 flex-1">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-sm font-medium text-[#F7F7F7] hover:text-[#D00000] transition-colors mt-auto inline-flex items-center"
                  >
                    Devamını Oku &rarr;
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-[#99999F] bg-[#111114] rounded-lg border border-[rgba(255,255,255,0.08)]">
              Henüz haber bulunmuyor.
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/news" className="text-[#99999F] hover:text-[#F7F7F7] transition-colors">
            Tüm Haberler &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
