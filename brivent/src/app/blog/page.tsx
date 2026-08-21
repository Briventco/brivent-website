import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { BlogHero, Categories, LatestPosts } from "@/components/blog/Sections";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Company announcements, partnerships, product launches, engineering stories, and insights from Brivent.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <Categories />
      <LatestPosts />
    </main>
  );
}
