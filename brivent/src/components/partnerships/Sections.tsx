"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import GridFrame from "@/components/shared/GridFrame";
import GridCard from "@/components/shared/GridCard";
import { featuredPartnership } from "@/lib/constants";

const partnerOn = [
  {
    title: "Product development",
    description: "From concept to a working, shippable product.",
  },
  {
    title: "Website and platform development",
    description: "Marketing sites, web apps, and internal platforms.",
  },
  {
    title: "AI and automation",
    description: "Practical AI systems built around real workflows.",
  },
  {
    title: "Digital transformation",
    description: "Modernizing how a business operates and serves customers.",
  },
  {
    title: "Technology implementation",
    description: "Bringing new systems and tools into an existing operation.",
  },
  {
    title: "Strategic product collaborations",
    description: "Co-building products alongside another team or founder.",
  },
];

const howWePartnerSteps = [
  "Understand the problem",
  "Define scope",
  "Align responsibilities",
  "Build",
  "Launch",
  "Support",
];

export function PartnershipsHero() {
  return (
    <section className="bg-[#0F172A] pt-40 pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel light>Partnerships</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            Better technology is built together.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            We work with businesses, organizations, founders, and technology
            teams to turn ideas and operational problems into practical
            digital solutions.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function PartnershipModels() {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="What We Can Partner On"
          title="Partnership models built around outcomes."
          className="mb-12"
        />
        <GridFrame columns={3}>
          {partnerOn.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="h-full"
            >
              <GridCard
                index={i + 1}
                eyebrow="Partner On"
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </GridFrame>
      </Container>
    </section>
  );
}

export function FeaturedPartnership() {
  return (
    <section className="bg-surface py-24 border-b border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl bg-white border border-border rounded-xl p-8"
        >
          <SectionLabel>Featured Partnership</SectionLabel>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Brivent × {featuredPartnership.name}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4">
            {featuredPartnership.description}
          </p>
          <p className="text-sm text-muted-light">
            Approved partnership announcements and case studies will be
            published here as they become public.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function HowWePartner() {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="How We Partner"
          title="We begin by understanding the objective."
          description="Then we define responsibilities, agree on the scope, build together, and keep communication clear throughout the engagement."
          className="mb-12"
        />
        <div className="flex flex-wrap gap-3">
          {howWePartnerSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground border border-border rounded-full px-4 py-2">
                {step}
              </span>
              {i < howWePartnerSteps.length - 1 && (
                <span className="text-muted-light">→</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PartnershipsCta() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      <Container className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          Have an opportunity for us to explore together?
        </h2>
        <p className="text-white/50 text-base leading-relaxed mb-8">
          Start a partnership conversation.
        </p>
        <Button href="/contact" variant="primary">
          Become a Brivent partner
        </Button>
      </Container>
    </section>
  );
}