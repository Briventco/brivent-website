"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Story() {
  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-accent/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4">
              Who We Are
            </p>
            <SectionHeading title="A technology company focused on building." />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6 text-muted text-base leading-relaxed"
          >
            <p>
              Brivent Global Innovations is a technology company focused on
              building digital products and practical technology solutions.
            </p>
            <p>
              We work at the intersection of product thinking, engineering,
              artificial intelligence, and business. Some of our work starts
              as an idea inside Brivent. Some begins with a business that has
              a problem it needs solved. In both cases, our goal is the
              same: understand the problem, build something useful, and
              keep improving it.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}