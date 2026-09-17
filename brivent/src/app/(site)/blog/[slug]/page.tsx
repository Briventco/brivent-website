import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/api";
import { blogCategories } from "@/data/blog";
import {
  formatDate,
  getRelatedPosts,
  slugifyCategory,
  categoryFromSlug,
  sortPinnedFirst,
} from "@/lib/utils";
import Container from "@/components/shared/Container";
import BlogCard from "@/components/shared/BlogCard";
import { BlogPost, BlogCategory } from "@/types/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const postSlugs = posts.map((post) => ({ slug: post.slug }));
  const categorySlugs = blogCategories.map((cat) => ({
    slug: slugifyCategory(cat.label),
  }));
  return [...postSlugs, ...categorySlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (post) {
    return buildMetadata({
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      path: `/blog/${post.slug}`,
      ogImage: post.ogImage,
    });
  }

  const categoryLabels = blogCategories.map((c) => c.label);
  const category = categoryFromSlug(slug, categoryLabels);

  if (category) {
    return buildMetadata({
      title: `For ${category}`,
      description: `${category} stories and updates from Brivent.`,
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: "Article",
    description: "A story from Brivent.",
    path: `/blog/${slug}`,
  });
}

function CategoryPage({
  category,
  posts,
}: {
  category: BlogCategory;
  posts: BlogPost[];
}) {
  const categoryMeta = blogCategories.find((c) => c.label === category);
  const categoryPosts = sortPinnedFirst(
    posts.filter((post) => post.category === category)
  );

  return (
    <main>
      <section className="relative pt-40 pb-20 overflow-hidden bg-dark-bg">
        {categoryMeta?.heroImage && (
          <img
            src={categoryMeta.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-dark-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(21,43,249,0.15),_transparent_60%)] pointer-events-none" />

        <Container className="relative text-center max-w-3xl mx-auto">
          <p className="text-accent text-[10px] tracking-widest uppercase font-semibold mb-4">
            Insights
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            For <span className="text-accent">{category}</span>
          </h1>
          {categoryMeta?.description && (
            <p className="text-white/70 text-lg leading-relaxed">
              {categoryMeta.description}
            </p>
          )}
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-xl p-12 text-center">
              <p className="text-sm text-muted-light">
                No posts in this category yet. Check back soon.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

function ArticlePage({ post, posts }: { post: BlogPost; posts: BlogPost[] }) {
  const related = getRelatedPosts(posts, post.slug);
  const contentHtml = marked.parse(post.content, { async: false });

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

          <p className="text-accent text-[10px] tracking-widest uppercase font-semibold mt-6 mb-3">
            {post.category}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-4">
            {post.title}
          </h1>

          <div className="relative w-full aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-lg my-6">
            <img
              src={post.coverImage || "/images/blog/image.png"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

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

      <section className="bg-white py-20 border-b border-border">
        <Container>
          <article
            className="prose prose-slate max-w-3xl text-base text-muted leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
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

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();

  const post = posts.find((p) => p.slug === slug);
  if (post) {
    return <ArticlePage post={post} posts={posts} />;
  }

  const categoryLabels = blogCategories.map((c) => c.label);
  const category = categoryFromSlug(slug, categoryLabels);
  if (category) {
    return <CategoryPage category={category} posts={posts} />;
  }

  notFound();
}