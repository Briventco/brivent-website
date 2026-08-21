import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import ProductsHero from "@/components/products/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPhilosophy from "@/components/products/ProductPhilosophy";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore Brivent's growing portfolio of technology products, including Servra — an AI Order Agent for restaurants on WhatsApp.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductGrid />
      <ProductPhilosophy />
    </main>
  );
}
