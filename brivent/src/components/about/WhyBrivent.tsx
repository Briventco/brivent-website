"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function WhyBrivent() {
  return (
    <section className="relative bg-surface py-24 border-b border-border overflow-hidden">
      <div className="absolute -bottom-16 left-0 w-[26rem] h-[26rem] rounded-full bg-flamingo/[0.06] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4">
            Why Brivent Exists
          </p>
          <SectionHeading
            title="Building technology is not simply about writing code."
            description="We believe there are many important problems around us that can be solved better with technology. But building technology is about understanding people, businesses, constraints, and opportunities — then turning that understanding into something that works. That is the kind of company we are building at Brivent."
          />
        </motion.div>
      </Container>
    </section>
  );
}