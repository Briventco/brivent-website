"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by getting clear on the real problem — not the assumed one. Every idea gets genuine clarity before anything is built.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We design and build with intentionality, moving fast without cutting the corners that matter.",
  },
  {
    number: "03",
    title: "Improve",
    description:
      "Products are tested, refined, and brought closer to the people they're meant to serve — growth is directed, not accidental.",
  },
];

export default function HowWeWork() {
  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <Container className="relative">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
          >
            How We Work
          </motion.p>
          <SectionHeading
            title="Understand the problem. Build the solution. Improve it."
            description="We believe the best products are not created by trying to predict everything upfront. They are built, tested, improved, and brought closer to the people they are meant to serve."
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 2"
            >
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="var(--accent)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
            </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-accent flex items-center justify-center mb-6 shadow-sm shadow-accent/10">
                <span className="text-accent font-bold text-sm">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}