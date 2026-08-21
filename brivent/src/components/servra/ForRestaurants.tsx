"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ForRestaurants() {
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
            label="For Restaurant Owners"
            title="Spend less time answering messages, more time running your restaurant."
            description="Servra is designed to help businesses respond faster, organize conversations, and turn WhatsApp chats into structured orders."
          />
        </motion.div>
      </Container>
    </section>
  );
}
