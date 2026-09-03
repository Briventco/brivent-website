import { BlogCategory } from "@/types/blog";

export const blogCategories: { label: BlogCategory; description: string }[] = [
  { label: "Company", description: "Milestones, announcements, and stories." },
  { label: "Product", description: "Product launches, updates, and lessons." },
  { label: "Engineering", description: "Technical work and engineering lessons." },
  { label: "AI", description: "Practical applications of artificial intelligence." },
  { label: "Partnerships", description: "Collaboration announcements and stories." },
  { label: "Community", description: "Events, people, and ecosystem activity." },
];

export const blogPosts: BlogPost[] = [];
