import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getProducts } from "@/lib/api";
import ProductsHero from "@/components/products/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import ProductPhilosophy from "@/components/products/ProductPhilosophy";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore Brivent's growing portfolio of technology products, including Servra - an AI Order Agent for restaurants on WhatsApp.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <ProductsHero />
      <ProductGrid products={products} />
      <ProductPhilosophy />
    </main>
  );
}
