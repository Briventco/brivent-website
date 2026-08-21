export type ProductStatus = "Live" | "In Development" | "Pilot" | "Coming Soon";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  status: ProductStatus;
  image?: string;
  href: string;
}

export interface ServraFaqItem {
  question: string;
  answer: string;
}

export interface ServraStep {
  number: string;
  title: string;
  description: string;
}
