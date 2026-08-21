"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import SectionLabel from "@/components/shared/SectionLabel";
import { servraUrl } from "@/lib/constants";

export default function ServraHero() {
  return (
    <section className="bg-[#0F172A] pt-40 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel light>Servra</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            Chat. Order. Done.
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-4">
            Your restaurant&rsquo;s AI Order Agent, right inside WhatsApp.
          </p>
          <p className="text-white/40 text-base leading-relaxed max-w-2xl mb-10">
            Servra helps restaurants manage customer orders through their
            existing WhatsApp number — responding to customers, sharing
            menus, taking orders, calculating totals, and alerting the
            vendor when an order needs confirmation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href={servraUrl} variant="primary" target="_blank">
              Visit Servra
            </Button>
            <Button href="/contact" variant="outline-dark">
              Book a Demo
            </Button>
            <Button href="#how-it-works" variant="outline-dark">
              See How It Works
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}