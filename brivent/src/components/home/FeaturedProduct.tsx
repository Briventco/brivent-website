"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import SectionLabel from "@/components/shared/SectionLabel";
import { Product } from "@/types/product";

function StripeGlow() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stripe-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--flamingo)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M ${i * 16 - 10} 0 Q ${i * 16} 50 ${i * 16 - 10} 100`}
          stroke="url(#stripe-fade)"
          strokeWidth="6"
          fill="none"
        />
      ))}
    </svg>
  );
}

export default function FeaturedProduct({ product }: { product?: Product }) {
  const href = product?.href ?? "/products/servra";
  const title = product?.name ?? "Servra";
  const description =
    product?.description ??
    "Servra is an AI Order Agent for restaurants that works directly through a vendor's existing WhatsApp number. Customers message naturally, receive the menu, and place orders without downloading a new app.";

  return (
    <section className="bg-dark-bg py-24 relative overflow-hidden">
      <StripeGlow />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-transparent to-dark-bg pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <SectionLabel light>Featured Product</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Chat. Order.{" "}
              <span className="text-flamingo">Done.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              {description}
            </p>
            <Button href={href} variant="primary">
              Explore {title}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl shadow-accent/10">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-flamingo" />
                <p className="text-[10px] text-white/40 tracking-widest uppercase">
                  How it works — via WhatsApp
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { text: "Hey, what's on the menu today?", me: true },
                  { text: "Here's today's menu 🍽️ — jollof rice, grilled chicken, chin chin.", me: false },
                  { text: "I'll take jollof rice + chicken", me: true },
                  { text: "Order confirmed! Vendor is preparing it now.", me: false },
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.me ? 12 : -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                    className={`flex ${msg.me ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.me
                          ? "bg-accent text-white rounded-br-sm"
                          : "bg-white/10 text-white/80 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
