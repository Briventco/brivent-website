"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Approach() {
  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <div className="absolute -top-16 -right-16 w-[24rem] h-[24rem] rounded-full bg-accent/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4">
            Our Approach
          </p>
          <SectionHeading
            title="We prefer real products over endless prototypes."
            description="We learn by building. We test ideas against reality. We listen to users. We work closely across product, engineering, and operations. And when something does not work, we improve it instead of pretending it does. This approach allows us to move quickly while remaining focused on the problem we are actually trying to solve."
          />
        </motion.div>
      </Container>
    </section>
  );
}