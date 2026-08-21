"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { servraFaq } from "@/data/products";

export default function Faq() {
  if (servraFaq.length === 0) return null;

  return (
    <section className="bg-surface py-24 border-b border-border">
      <Container>
        <SectionHeading label="FAQ" title="Common questions." className="mb-12" />
        <div className="max-w-3xl divide-y divide-border border-t border-b border-border">
          {servraFaq.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="py-6"
            >
              <p className="font-semibold text-foreground mb-2">
                {item.question}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
