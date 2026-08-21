"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";

export default function ProductGrid() {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
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
          <div className="bg-surface border border-dashed border-border rounded-xl p-6 flex flex-col justify-center items-center text-center">
            <p className="text-sm text-muted-light leading-relaxed">
              More Brivent products will appear here once their positioning
              and descriptions are approved.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
