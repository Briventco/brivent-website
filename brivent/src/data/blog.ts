import { BlogPost, BlogCategory } from "@/types/blog";

export const blogCategories: {
  label: BlogCategory;
  description: string;
  heroImage?: string;
}[] = [
  {
    label: "Company",
    description: "Milestones, announcements, and stories.",
    heroImage: "/images/blog/categories/company.jpg",
  },
  {
    label: "Product",
    description: "Product launches, updates, and lessons.",
    heroImage: "/images/blog/categories/product.jpg",
  },
  {
    label: "Engineering",
    description: "Technical work and engineering lessons.",
    heroImage: "/images/blog/categories/engineering.jpg",
  },
  {
    label: "AI",
    description: "Practical applications of artificial intelligence.",
    heroImage: "/images/blog/categories/ai.jpg",
  },
  {
    label: "Business",
    description: "Strategy, growth, and operations insights.",
    heroImage: "/images/blog/categories/business.jpg",
  },
  {
    label: "Partnerships",
    description: "Collaboration announcements and stories.",
    heroImage: "/images/blog/categories/partnerships.jpg",
  },
  {
    label: "Community",
    description: "Events, people, and ecosystem activity.",
    heroImage: "/images/blog/categories/community.jpg",
  },
  {
    label: "Careers",
    description: "Life at Brivent, roles, and hiring updates.",
    heroImage: "/images/blog/categories/careers.jpg",
  },
];

export const blogPosts: BlogPost[] = [];