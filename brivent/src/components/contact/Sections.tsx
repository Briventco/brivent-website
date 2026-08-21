"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import ParticleField from "@/components/shared/ParticleField";

export function ContactHero() {
  return (
    <section className="relative bg-dark-bg pt-40 pb-24 overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(21,43,249,0.1),_transparent_60%)] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel light>Contact</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            Let&rsquo;s build{" "}
            <span className="text-accent">something useful.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Whether you are looking to build a product, improve an existing
            system, explore a partnership, or simply start a conversation,
            tell us what you have in mind.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

const routes = [
  {
    title: "Business Enquiries",
    description:
      "Have a business or technology problem you want help solving? Tell us about the problem, what you are trying to achieve, and any relevant timeline.",
  },
  {
    title: "Partnerships",
    description:
      "Interested in working with Brivent? Tell us what the partnership could look like and what you believe we can build together.",
  },
  {
    title: "Careers",
    description:
      "Looking to join Brivent? Visit Careers for current opportunities or contact our Operations team through the approved recruitment channel.",
    link: { href: "/careers", label: "Visit Careers" },
  },
];

export function EnquiryRoutes() {
  return (
    <section className="bg-white py-20 border-b border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={route.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="bg-surface border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-base font-bold text-foreground mb-2">
                {route.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {route.description}
              </p>
              {route.link && (
                <Link
                  href={route.link.href}
                  className="inline-block mt-3 text-xs text-accent font-medium tracking-widest uppercase hover:underline"
                >
                  {route.link.label} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}