"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import { BlogPost } from "@/types/blog";

export default function Insights({ posts }: { posts: BlogPost[] }) {
  const recent = posts.slice(0, 3);

  if (recent.length === 0) return null;

  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-border">
          <SectionHeading
            label="Insights"
            title="Ideas, product updates, and stories from Brivent."
          />
          <Link
            href="/blog"
            className="text-muted hover:text-accent transition-colors text-sm whitespace-nowrap"
          >
            Read the blog →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recent.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
