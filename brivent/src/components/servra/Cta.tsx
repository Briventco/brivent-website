"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import { servraUrl } from "@/lib/constants";

export default function ServraCta() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      <Container className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Ready to make ordering simpler?
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Talk to Brivent about bringing Servra to your restaurant.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button href={servraUrl} variant="primary" target="_blank">
              Visit Servra
            </Button>
            <Button href="/contact" variant="outline-dark">
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}