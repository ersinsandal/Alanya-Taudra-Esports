import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Newspaper, User, ArrowRight } from "lucide-react";
import { ATEEmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Haberler | ATE Digital Arena",
  description: "ATE Digital Arena'dan en son haberler, duyurular ve espor gelişmeleri",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  
  const where = category && category !== "TUMU" 
    ? { category: category as any, isDraft: false } 
    : { isDraft: false };

  let news: any[] = [];
  try {
    news = await db.newsPost.findMany({
      where,
      include: {
        author: true,
      },
      orderBy: { publishDate: "desc" },
    });
  } catch (error) {
    console.warn("News DB fetch failed, using fallback:", error);
  }

  const categories = [
    { label: "TÜMÜ", value: "TUMU" },
    { label: "ATE", value: "ATE" },
    { label: "OKUL", value: "OKUL" },
    { label: "TURNUVA", value: "TURNUVA" },
    { label: "TOPLULUK", value: "TOPLULUK" },
    { label: "DUYURU", value: "DUYURU" },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mt-12 mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
          HABERLER
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto">
          Arenadan en son gelişmeler ve duyurular.
        </p>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.value}
            href={`/news${cat.value !== "TUMU" ? `?category=${cat.value}` : ""}`}
            className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
              (category || "TUMU") === cat.value
                ? "bg-primary-red text-white"
                : "bg-panel text-secondary hover:bg-white/5 hover:text-white border border-white/5"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {news.length === 0 ? (
        <ATEEmptyState
          icon={Newspaper}
          title="Haber Bulunamadı"
          description="Bu kategoride henüz bir haber yayınlanmamış."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((post: any) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group flex flex-col bg-panel rounded-xl border border-white/5 overflow-hidden hover:border-primary-red/50 transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/10] relative bg-black/50 flex items-center justify-center overflow-hidden border-b border-white/5">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Newspaper className="w-12 h-12 text-white/10" />
                )}
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary-red rounded text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-secondary mb-3 flex items-center">
                  <span className="flex-1">
                    {post.publishDate ? format(post.publishDate, "d MMMM yyyy", { locale: tr }) : "-"}
                  </span>
                  <span className="flex items-center text-white/40">
                    <User className="w-3 h-3 mr-1" /> {post.author?.username || "Admin"}
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-black text-white mb-3 line-clamp-2 group-hover:text-primary-red transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-sm text-secondary line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {post.excerpt || (post.content && typeof post.content === 'string' ? post.content.substring(0, 120).replace(/<[^>]+>/g, '') + "..." : "")}
                </p>
                
                <div className="flex items-center text-primary-red text-sm font-bold uppercase tracking-widest mt-auto">
                  Devamını Oku <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
