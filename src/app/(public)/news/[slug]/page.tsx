import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.newsPost.findUnique({
    where: { slug },
  });

  if (!post) return { title: "Haber Bulunamadı" };

  return {
    title: `${post.seoTitle || post.title} | ATE Digital Arena`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      images: [post.ogImage || post.coverImage || "/default-og.png"],
    }
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await db.newsPost.findUnique({
    where: { slug },
    include: {
      author: {
        include: { profile: true }
      }
    }
  });

  if (!post) notFound();

  // Update view count (fire and forget for this simple version)
  db.newsPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } }
  }).catch(() => {});

  const relatedPosts = await db.newsPost.findMany({
    where: {
      category: post.category,
      id: { not: post.id },
      isDraft: false
    },
    orderBy: { publishDate: "desc" },
    take: 3
  });

  return (
    <div className="bg-[#050505] min-h-screen pb-24">
      {/* Article Hero */}
      <div className="w-full max-w-5xl mx-auto px-4 pt-12 pb-8">
        <Link href="/news" className="inline-flex items-center text-[#99999F] hover:text-white text-sm font-medium transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Haberlere Dön
        </Link>
        
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#D00000] text-white text-xs font-bold uppercase tracking-wider rounded">
              {post.category.replace("_", " ")}
            </span>
            <span className="text-[#99999F] text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {post.publishDate ? format(post.publishDate, "d MMMM yyyy", { locale: tr }) : "-"}
            </span>
          </div>
          <button className="p-2 text-[#99999F] hover:text-white bg-white/5 rounded-full transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-8 leading-tight uppercase tracking-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden relative">
            {post.author?.profile?.avatarUrl ? (
              <Image src={post.author.profile.avatarUrl} alt={post.author.username} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#99999F]">
                <User className="w-6 h-6" />
              </div>
            )}
          </div>
          <div>
            <div className="text-white font-medium">{post.author?.username || "ATE Admin"}</div>
            <div className="text-xs text-[#99999F]">Editör</div>
          </div>
        </div>

        {post.coverImage && (
          <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden mb-12 border border-white/5 shadow-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-a:text-[#FF1F2D] prose-img:rounded-xl">
          {/* Note: In production, sanitize this HTML! */}
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        
        {/* Tags */}
        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="max-w-3xl mx-auto mt-12 flex flex-wrap gap-2 pt-8 border-t border-white/10">
            {(post.tags as string[]).map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#111114] border border-[rgba(255,255,255,0.08)] text-[#99999F] rounded-full text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-white/5 mt-12 pt-16 bg-[#0B0B0D]">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-heading font-black text-white mb-8 uppercase tracking-tight">İlgili Haberler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/news/${rp.slug}`} className="group bg-[#111114] rounded-xl border border-white/5 overflow-hidden hover:border-[#D00000]/50 transition-colors">
                  <div className="aspect-video relative bg-[#0B0B0D]">
                    {rp.coverImage && <Image src={rp.coverImage} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-white line-clamp-2 group-hover:text-[#FF1F2D] transition-colors">{rp.title}</h3>
                    <div className="text-xs text-[#99999F] mt-2">
                      {rp.publishDate ? format(rp.publishDate, "d MMM yyyy", { locale: tr }) : "-"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
