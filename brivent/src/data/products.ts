import { Product, ServraFaqItem, ServraStep } from "@/types/product";

export const products: Product[] = [
  {
    slug: "servra",
    name: "Servra",
    tagline: "Chat. Order. Done.",
    category: "AI & Automation",
    description:
      "Servra is an AI Order Agent for restaurants. It sits directly on a vendor's existing WhatsApp number and helps manage ordering conversations from the moment a customer sends a message.",
    status: "Live",
    image: "/images/products/servra/img.png",
    href: "/products/servra",
  },
];

export const servraSteps: ServraStep[] = [
  {
    number: "01",
    title: "A customer sends a message.",
    description: "The customer uses the restaurant's existing WhatsApp contact.",
  },
  {
    number: "02",
    title: "Servra responds.",
    description:
      "The AI Order Agent can respond to common ordering requests and guide the customer through the menu.",
  },
  {
    number: "03",
    title: "The customer orders naturally.",
    description:
      "Customers can communicate in normal language and, where supported, use voice notes.",
  },
  {
    number: "04",
    title: "Servra calculates the order.",
    description: "The order details and total are prepared for the vendor.",
  },
  {
    number: "05",
    title: "The vendor takes control.",
    description: "The vendor receives the order and can confirm or reject it.",
  },
];

export const servraBenefits: string[] = [
  "Instant responses",
  "Fewer missed orders",
  "Natural-language ordering",
  "Voice-note support",
  "No new customer app",
  "Simple vendor onboarding",
];

export const servraFaq: ServraFaqItem[] = [];