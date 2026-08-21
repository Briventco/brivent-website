"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
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
          id="work-cta-chevron"
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
      <rect width="400" height="200" fill="url(#work-cta-chevron)" />
    </svg>
  );
}

export default function WorkCta() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <ChevronBand />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Have a project{" "}
            <span className="text-accent">in mind?</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Let&rsquo;s discuss what you are trying to build.
          </p>
          <Button href="/contact" variant="primary">
            Start a conversation
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}