"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import GridFrame from "@/components/shared/GridFrame";
import GridCard from "@/components/shared/GridCard";

const capabilities = [
  {
    category: "Product",
    title: "Product Development",
    description: "Turning ideas into working, usable digital products.",
  },
  {
    category: "AI",
    title: "AI & Automation",
    description: "Practical AI systems that solve real operational problems.",
  },
  {
    category: "Engineering",
    title: "Web & Software Engineering",
    description: "Reliable, well-built software across web and backend systems.",
  },
  {
    category: "Transformation",
    title: "Digital Transformation",
    description: "Helping businesses modernize how they operate digitally.",
  },
  {
    category: "Partnerships",
    title: "Technology Partnerships",
    description: "Collaborating with teams to build and ship together.",
  },
];

function ChevronPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="brivent-chevron"
          x="0"
          y="0"
          width="50"
          height="46"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 30 L25 8 L50 30 L50 46 L25 24 L0 46 Z" fill="var(--accent)" />
          <circle cx="25" cy="30" r="4" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#brivent-chevron)" />
    </svg>
  );
}

export default function WhatWeDo() {
  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <ChevronPattern />

      <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-flamingo/10 blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="mb-12 pb-8 border-b border-border">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
          >
            What We Do
          </motion.p>
          <SectionHeading
            title="Technology should solve a problem, not create another one."
            description="We work across product development, software engineering, AI and automation, digital experiences, and technology partnerships. From an early product idea to a working system in production, we bring product thinking and engineering together to build useful technology."
          />
        </div>

        <GridFrame columns={5}>
          {capabilities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="h-full"
            >
              <GridCard
                index={i + 1}
                eyebrow={item.category}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </GridFrame>
      </Container>
    </section>
  );
}