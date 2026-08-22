import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "servra",
    title: "Servra — AI Order Agent for Restaurants",
    category: "AI & Automation",
    challenge:
      "Restaurants managing orders over WhatsApp often miss messages, repeat the same menu questions, and lose time manually calculating totals during busy periods.",
    approach:
      "We designed Servra to sit directly on a vendor's existing WhatsApp number, so customers could keep using a channel they already trust while the repetitive parts of ordering are handled automatically.",
    solution:
      "Servra responds to customer messages, shares the menu, takes orders in natural language (including voice notes where supported), calculates totals, and notifies the vendor to confirm or reject each order.",
    technology: ["WhatsApp", "AI / LLM", "Automation"],
    outcome:
      "Servra is live and in use, giving restaurants a faster way to handle WhatsApp orders without requiring customers to download a new app.",
    image: "/images/products/servra/img.png",
  },
  {
    slug: "jo-tech-gadgets-hub",
    title: "JO TECH Gadgets Hub",
    category: "Web Development / E-Commerce",
    description:
      "A modern e-commerce platform concept built from scratch for a technology and gadgets business, including product catalogue, e-commerce functionality, and an administrative backend.",
    technology: [],
    image: "/images/products/jo-tech/img.png",
    liveUrl: "https://jo-tech-f4mz.vercel.app/",
  },
];