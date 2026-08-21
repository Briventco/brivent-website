"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function WhyWhatsApp() {
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
            label="Why WhatsApp?"
            title="Your customers already know how to use it."
            description="Servra is designed around the communication channel many businesses already use instead of asking customers to download another app or learn a new ordering system."
          />
        </motion.div>
      </Container>
    </section>
  );
}
