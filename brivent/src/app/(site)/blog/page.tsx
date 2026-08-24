import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/api";
import { BlogHero, Categories, LatestPosts } from "@/components/blog/Sections";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Company announcements, partnerships, product launches, engineering stories, and insights from Brivent.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      <BlogHero />
      <Categories />
      <LatestPosts posts={posts} />
    </main>
  );
}
