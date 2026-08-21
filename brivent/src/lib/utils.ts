import { BlogPost } from "@/types/blog";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getRelatedPosts(
  posts: BlogPost[],
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return posts
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
