export type BlogCategory =
  | "Company"
  | "Product"
  | "Engineering"
  | "AI"
  | "Business"
  | "Partnerships"
  | "Community"
  | "Careers";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime?: string;
  coverImage?: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}
