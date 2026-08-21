"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function WhatWeBuild() {
  return (
    <section className="relative bg-surface py-24 border-b border-border overflow-hidden">
      <div className="absolute -top-16 right-0 w-[26rem] h-[26rem] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4">
            What We Build
          </p>
          <SectionHeading
            title="A portfolio that will keep growing."
            description="Our work spans AI-powered products, software platforms, websites, digital systems, automation, and technology solutions for businesses and organizations. Our portfolio will continue to grow as we discover new problems worth solving."
          />
        </motion.div>
      </Container>
    </section>
  );
}