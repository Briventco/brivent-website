import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { blogPosts } from "@/data/blog";
import { formatDate, getRelatedPosts } from "@/lib/utils";
import Container from "@/components/shared/Container";
import BlogCard from "@/components/shared/BlogCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return buildMetadata({
      title: "Article",
      description: "A story from Brivent.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.ogImage,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(blogPosts, post.slug);

  return (
    <main>
      <section className="bg-dark-bg pt-40 pb-10">
        <Container>
          <Link
            href="/blog"
            className="text-white/40 hover:text-accent text-sm transition-colors"
          >
            ← All insights
          </Link>
          
          {/* Title section - like screenshot */}
          <p className="text-accent text-[10px] tracking-widest uppercase font-semibold mt-6 mb-3">
            {post.category}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-4">
            {post.title}
          </h1>
          
          {/* Image goes here - between title and metadata */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-lg my-6">
            <img
              src="/images/blog/image.png"
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Author and metadata below the image */}
          <div className="flex items-center gap-3 text-sm text-white/50 mt-4">
            <span>{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Article content */}
      <section className="bg-white py-20 border-b border-border">
        <Container>
          <article className="prose prose-slate max-w-3xl text-base text-muted leading-relaxed whitespace-pre-wrap">
            {post.content}
          </article>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-surface py-24">
          <Container>
            <p className="text-[10px] text-accent tracking-widest uppercase font-semibold mb-8">
              Related posts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}