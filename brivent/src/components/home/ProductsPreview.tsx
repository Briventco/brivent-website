"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/data/products";

function ComingSoonCard() {
  return (
    <div className="relative flex flex-col justify-center items-start h-full min-h-[280px] p-6 rounded-xl border border-dashed border-accent/30 bg-gradient-to-br from-accent/[0.03] to-flamingo/[0.03]">
      <p className="text-[10px] text-accent tracking-widest uppercase font-semibold mb-3">
        In the pipeline
      </p>
      <p className="text-foreground font-bold text-lg leading-snug mb-2">
        More products are being built.
      </p>
      <p className="text-sm text-muted leading-relaxed">
        Every idea that comes through Brivent gets the same clarity and
        direction. This space fills up fast.
      </p>
    </div>
  );
}

export default function ProductsPreview() {
  return (
    <section className="relative bg-surface py-24 border-b border-border overflow-hidden">
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-border">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
            >
              Our Products
            </motion.p>
            <SectionHeading title="Products built around real problems." />
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors text-sm whitespace-nowrap"
          >
            View all products
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: products.length * 0.08, ease: "easeOut" }}
          >
            <ComingSoonCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}