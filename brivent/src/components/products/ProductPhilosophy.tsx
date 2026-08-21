"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

function ChevronBand() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="product-philosophy-chevron"
          x="0"
          y="0"
          width="44"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 26 L22 6 L44 26 L44 40 L22 20 L0 40 Z" fill="var(--accent)" />
          <circle cx="22" cy="26" r="3.5" fill="var(--flamingo)" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#product-philosophy-chevron)" />
    </svg>
  );
}

export default function ProductPhilosophy() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <ChevronBand />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <p className="text-flamingo text-xs tracking-[0.2em] font-semibold uppercase mb-4">
              Product Philosophy
            </p>
            <SectionHeading
              light
              title="We start with the problem, not the technology."
              description="We do not build products simply because technology makes something possible. We start with the problem, understand the people affected by it, and then decide what technology can do to make the experience better."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <Button href="/contact" variant="primary" className="w-full">
              Have a product idea?
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}