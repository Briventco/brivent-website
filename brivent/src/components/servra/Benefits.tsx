"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { servraBenefits } from "@/data/products";

export default function Benefits() {
  return (
    <section className="bg-surface py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="Key Benefits"
          title="Everything ordering needs, nothing it doesn't."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servraBenefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="flex items-center gap-3 bg-white border border-border rounded-xl p-5"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Check size={16} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
