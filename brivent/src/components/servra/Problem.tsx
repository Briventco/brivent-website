"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Problem() {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <SectionHeading
            label="The Problem"
            title="Restaurant orders do not wait."
            description="When customers send messages and nobody responds quickly, orders can be missed. When staff have to manually answer the same questions, check menus, calculate totals, and move between conversations, valuable time disappears. Servra is designed to take care of the repetitive part of that conversation."
          />
        </motion.div>
      </Container>
    </section>
  );
}
