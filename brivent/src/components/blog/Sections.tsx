"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import { blogCategories } from "@/data/blog";
import { BlogPost } from "@/types/blog";
import { formatDate, slugifyCategory, sortPinnedFirst } from "@/lib/utils";

function LinePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 400"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="blog-hero-lines"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(15)"
        >
          <line x1="0" y1="60" x2="120" y2="60" stroke="var(--accent)" strokeWidth="1" />
          <line x1="60" y1="0" x2="60" y2="120" stroke="var(--accent)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(#blog-hero-lines)" />
    </svg>
  );
}

export function BlogHero() {
  return (
    <section className="relative bg-surface pt-40 pb-20 overflow-hidden">
      <LinePattern />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-6">
            Insights
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Ideas, products, lessons, and{" "}
            <span className="text-accent">stories from Brivent.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
            Follow what we are building, what we are learning, and how we
            think about technology.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function Categories() {
  return (
    <section className="bg-white py-16 border-b border-border">
      <Container>
        <div className="flex flex-wrap justify-center gap-3">
          {blogCategories.map((cat) => (
            <Link
              key={cat.label}
              href={`/blog/${slugifyCategory(cat.label)}`}
              className="text-xs font-medium text-muted border border-border rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors"
              title={cat.description}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface CategoryRowsProps {
  posts: BlogPost[];
}

export function CategoryRows({ posts }: CategoryRowsProps) {
  const featured = ["Company", "AI"] as const;

  const rows = blogCategories.filter((cat) =>
    (featured as readonly string[]).includes(cat.label)
  );

  return (
    <section className="bg-surface py-20 overflow-hidden">
      <div className="flex flex-col gap-24 md:gap-32">
        {rows.map((cat, i) => {
          const reversed = i % 2 === 1;
          const cover = posts.find(
            (p) => p.category === cat.label
          )?.coverImage;

          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full px-8 md:px-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-10 lg:gap-16">
                {/* TEXT COLUMN */}
                <div className={reversed ? "lg:order-2" : "lg:order-1"}>
                  <p className="text-accent text-[10px] tracking-[0.35em] font-semibold uppercase mb-4">
                    For {cat.label}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.02] mb-5">
                    {cat.label}
                  </h2>
                  <p className="text-muted text-[15px] leading-relaxed mb-8 max-w-[380px]">
                    {cat.description}
                  </p>
                  <Link
                    href={`/blog/${slugifyCategory(cat.label)}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-accent text-accent font-semibold text-[13px] transition-colors hover:bg-accent hover:text-white"
                  >
                    Read {cat.label}
                  </Link>
                </div>

                {/* IMAGE COLUMN — narrower card, rounded, accent edge strip */}
                <div className={reversed ? "lg:order-1" : "lg:order-2"}>
                  <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] max-w-[420px] lg:ml-auto shadow-xl">
                    {cover ? (
                      <img
                        src={cover}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-light">
                          {cat.label}
                        </span>
                      </div>
                    )}

                    {/* accent color strip along the outer edge */}
                    <div
                      className={`absolute top-0 bottom-0 w-6 ${
                        reversed ? "left-0" : "right-0"
                      }`}
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function DotWorldMap() {
  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.35) 1.5px, transparent 1.5px)",
        backgroundSize: "7px 7px",
        maskImage: "url('/images/world-map.svg')",
        WebkitMaskImage: "url('/images/world-map.svg')",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "75% auto",
        WebkitMaskSize: "75% auto",
      }}
    />
  );
}

export function GlobalSection() {
  return (
    <section className="mt-24 mb-20">
      <div className="relative overflow-hidden rounded-[28px] bg-[#210b5c] min-h-[360px]">
        <DotWorldMap />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#210b5c]/40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-6 text-center"
        >
          <p className="!text-center text-[#00AEEF] text-xs md:text-sm font-semibold tracking-[0.45em] uppercase mb-5">
            WE ARE GLOBAL
          </p>

          <h2 className="!text-center text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-7">
            Let&apos;s Build the future together
          </h2>

          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white/20 border border-white/50 text-white font-semibold text-sm md:text-base backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white/30 hover:border-white hover:-translate-y-0.5"
          >
            Build With Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface LatestPostsProps {
  posts: BlogPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const ordered = sortPinnedFirst(posts);
  const featuredPost = ordered[0];
  const gridPosts = featuredPost ? ordered.slice(1) : ordered;

  return (
    <section className="bg-surface py-24">
      <Container>
        {featuredPost && (
          <>
            <div className="text-center max-w-4xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-muted mb-2">{featuredPost.excerpt}</p>
                <p className="text-muted text-sm">
                  Created on {formatDate(featuredPost.publishedAt)}
                </p>
              </motion.div>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block relative w-full aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-lg mb-12"
            >
              <img
                src={featuredPost.coverImage || "/images/blog/image.png"}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </Link>
          </>
        )}

        <GlobalSection />

        <SectionHeading
          label="Latest"
          title="Read the latest from Brivent."
          className="mb-12"
        />

        {gridPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-light">
              Blog posts will appear here once published by Operations.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}