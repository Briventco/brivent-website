"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types/product";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-light">
              No products are available yet.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
