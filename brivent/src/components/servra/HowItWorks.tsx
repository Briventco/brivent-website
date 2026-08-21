"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import GridFrame from "@/components/shared/GridFrame";
import GridCard from "@/components/shared/GridCard";
import { servraSteps } from "@/data/products";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="How Servra Works"
          title="Five steps, no new app to download."
          className="mb-12"
        />
        <GridFrame columns={5}>
          {servraSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <GridCard
                index={i + 1}
                eyebrow={`Step ${step.number}`}
                title={step.title}
                description={step.description}
                linkLabel="Learn more"
              />
            </motion.div>
          ))}
        </GridFrame>
      </Container>
    </section>
  );
}