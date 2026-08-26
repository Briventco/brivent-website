"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";
import TeamCard from "@/components/shared/TeamCard";
import ParticleField from "@/components/shared/ParticleField";
import { TeamDepartment, TeamMember } from "@/types/team";

export function TeamHero() {
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
          <SectionLabel light>Team</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            The people <span className="text-accent">building Brivent.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Brivent is powered by people who are learning, building, solving
            problems, and taking ownership.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function DepartmentGroup({
  department,
  description,
  teamMembers,
}: {
  department: TeamDepartment;
  description: string;
  teamMembers: TeamMember[];
}) {
  const members = teamMembers.filter((m) => m.department === department);

  return (
    <section className="relative bg-white py-16 border-b border-border overflow-hidden">
      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
        >
          {department}
        </motion.p>
        <SectionHeading title={description} className="mb-10" />
        {members.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {members.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-accent/30 rounded-xl p-10 text-center bg-accent/[0.02]">
            <p className="text-sm text-muted-light">
              {department} profiles will appear here once approved.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export function Leadership({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <DepartmentGroup
      department="Leadership"
      description="Our leadership team is responsible for company direction, product vision, operations, partnerships, and the systems that allow Brivent to grow."
      teamMembers={teamMembers}
    />
  );
}

export function Engineering({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <DepartmentGroup
      department="Engineering"
      description="Our engineering team turns product ideas into working technology - from interfaces and APIs to infrastructure, AI systems, integrations, and production software."
      teamMembers={teamMembers}
    />
  );
}

export function Operations({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <DepartmentGroup
      department="Operations"
      description="Operations keeps the company moving. The team coordinates communication, meetings, people processes, documentation, client follow-ups, and the day-to-day systems behind our work."
      teamMembers={teamMembers}
    />
  );
}

export function EarlyBuilders({ teamMembers }: { teamMembers: TeamMember[] }) {
  const earlyBuilders = teamMembers.filter((m) => m.isEarlyBuilder);

  return (
    <section className="relative bg-surface py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-flamingo/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-flamingo text-xs tracking-[0.2em] font-semibold uppercase mb-4"
        >
          Early Builders
        </motion.p>
        <SectionHeading
          title="Some people join Brivent before the company is fully formed."
          description="We value these early builders because their work helps shape the products, systems, culture, and standards that come later."
          className="mb-12"
        />
        {earlyBuilders.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {earlyBuilders.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-flamingo/30 rounded-xl p-10 text-center mb-12 bg-flamingo/[0.02]">
            <p className="text-sm text-muted-light">
              Early builder recognition will appear here once approved.
            </p>
          </div>
        )}
        <div className="flex justify-center">
          <Button href="/careers" variant="primary">
            See current opportunities
          </Button>
        </div>
      </Container>
    </section>
  );
}
