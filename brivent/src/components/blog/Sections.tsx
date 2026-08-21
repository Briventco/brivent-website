"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionLabel from "@/components/shared/SectionLabel";
import BlogCard from "@/components/shared/BlogCard";
import { blogPosts, blogCategories } from "@/data/blog";

export function BlogHero() {
  return (
    <section className="bg-[#0F172A] pt-40 pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel light>Insights</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            Ideas, products, lessons, and stories from Brivent.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
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
        <div className="flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <span
              key={cat.label}
              className="text-xs font-medium text-muted border border-border rounded-full px-4 py-2 hover:border-accent hover:text-accent transition-colors cursor-default"
              title={cat.description}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function LatestPosts() {
  return (
    <section className="bg-surface py-24">
      <Container>
        <SectionHeading
          label="Latest"
          title="Read the latest from Brivent."
          className="mb-12"
        />
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
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
