"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import GridFrame from "@/components/shared/GridFrame";
import GridCard from "@/components/shared/GridCard";

const values = [
  {
    title: "Build with purpose",
    description: "Every product we build starts with a real problem worth solving.",
  },
  {
    title: "Move with urgency",
    description: "We prefer shipping and improving over waiting for perfect.",
  },
  {
    title: "Stay curious",
    description: "We keep learning, testing, and questioning our assumptions.",
  },
  {
    title: "Take ownership",
    description: "Everyone at Brivent is responsible for the quality of their work.",
  },
  {
    title: "Build together",
    description: "The best products come from close collaboration across teams.",
  },
  {
    title: "Keep improving",
    description: "Nothing we ship is ever really finished.",
  },
];

export default function Values() {
  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-[24rem] h-[24rem] rounded-full bg-flamingo/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
        >
          What We Believe
        </motion.p>
        <SectionHeading
          title="These principles shape how we work."
          description="They shape how we build products and how we treat the people we work with."
          className="mb-12"
        />
        <GridFrame columns={3}>
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="h-full"
            >
              <GridCard
                index={i + 1}
                eyebrow="Principle"
                title={value.title}
                description={value.description}
              />
            </motion.div>
          ))}
        </GridFrame>
      </Container>
    </section>
  );
}