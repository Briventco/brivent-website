"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import JobCard from "@/components/shared/JobCard";
import GridFrame from "@/components/shared/GridFrame";
import GridCard from "@/components/shared/GridCard";
import { jobOpenings } from "@/data/careers";

export function CareersHero() {
  return (
    <section className="bg-[#0F172A] pt-40 pb-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel light>Careers</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            Build real things with real responsibility.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Join a growing technology company where you can work on
            products, learn from other builders, and contribute to work
            that reaches real users.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export function WhyBrivent() {
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
            label="Why Brivent"
            title="Real projects. Real responsibility. Continuous learning."
            description="At Brivent, team members are encouraged to understand the work beyond their own role. Engineers learn product context. Operations works closely with engineering. People learn by contributing."
          />
        </motion.div>
      </Container>
    </section>
  );
}

export function EarlyCareer() {
  return (
    <section className="bg-surface py-24 border-b border-border">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <SectionHeading
            label="For Early-Career Builders"
            title="You do not need to know everything before you join us."
            description="We value curiosity, consistency, communication, ownership, and the willingness to learn. Early-career team members can gain practical experience by contributing to real products and internal systems."
          />
        </motion.div>
      </Container>
    </section>
  );
}

const lookFor = [
  {
    title: "Communicate clearly",
    description: "Share progress, blockers, and questions without being asked.",
  },
  {
    title: "Take responsibility",
    description: "Own your work from start to finish, including the mistakes.",
  },
  {
    title: "Ask questions",
    description: "Curiosity moves work forward faster than assumptions do.",
  },
  {
    title: "Solve problems",
    description: "Focus on outcomes, not just completing assigned tasks.",
  },
  {
    title: "Accept feedback",
    description: "Treat feedback as a way to improve, not something to defend against.",
  },
  {
    title: "Care about quality",
    description: "Sweat the details that make work genuinely good.",
  },
];

export function WhatWeLookFor() {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="What We Look For"
          title="People who care about the quality of what they build."
          className="mb-12"
        />
        <GridFrame columns={3}>
          {lookFor.map((item, i) => (
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
                eyebrow="We Look For"
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

export function OpenRoles() {
  return (
    <section className="bg-surface py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="Open Roles"
          title="Current openings."
          className="mb-12"
        />
        {jobOpenings.length > 0 ? (
          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-light">
              No open roles are listed right now. Send us your profile for
              future opportunities.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export function CareersCta() {
  return (
    <section className="bg-dark-bg py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
      <Container className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          See open positions or send us your profile.
        </h2>
        <Button href="/contact" variant="primary">
          Get in touch
        </Button>
      </Container>
    </section>
  );
}