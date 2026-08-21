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
          id="final-cta-chevron"
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
      <rect width="400" height="200" fill="url(#final-cta-chevron)" />
    </svg>
  );
}

export default function FinalCta() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <ChevronBand />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-flamingo/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-flamingo text-[10px] tracking-widest uppercase mb-4 font-semibold"
          >
            Let&rsquo;s talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight"
          >
            Have a problem<br />
            <span className="text-accent">worth solving?</span>
          </motion.h2>
          <p className="text-white/40 mt-4 max-w-md text-sm leading-relaxed">
            Tell us what you are trying to build, improve, or automate. We
            would love to hear about it.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Button href="/contact" variant="primary" className="whitespace-nowrap px-10 py-4 text-base">
            Start a conversation →
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}