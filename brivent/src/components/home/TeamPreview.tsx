"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import TeamCard from "@/components/shared/TeamCard";
import { TeamMember } from "@/types/team";

export default function TeamPreview({
  teamMembers,
}: {
  teamMembers: TeamMember[];
}) {
  /**
   * Keep the homepage team preview in a deliberate order.
   * This prevents the order from changing depending on
   * database/API response order.
   */
  const preferredOrder = [
    "Oyindamola Abisoye",
    "John Samuel",
    "Badmus Qudus Ayomide",
    "Israel Yaya",
  ];

  const normalized = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, " ");

  const orderedMembers = preferredOrder
    .map((preferredName) =>
      teamMembers.find(
        (member) =>
          normalized(member.name) === normalized(preferredName)
      )
    )
    .filter((member): member is TeamMember => Boolean(member));

  // Keep any other team members available as fallback,
  // but don't let them disturb the preferred homepage order.
  const remainingMembers = teamMembers.filter(
    (member) =>
      !orderedMembers.some(
        (orderedMember) => orderedMember.slug === member.slug
      )
  );

  const preview = [...orderedMembers, ...remainingMembers].slice(0, 4);

  return (
    <section className="relative bg-surface py-24 border-b border-border overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4 text-center"
        >
          The People Behind Brivent
        </motion.p>

        <SectionHeading
          align="center"
          title="Meet the people building Brivent."
          description="Brivent is being built by a growing team of founders, engineers, operators, designers, and contributors who believe they can create meaningful technology from Africa and for the world."
          className="mb-12"
        />

        {preview.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {preview.map((member, i) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-accent/30 rounded-xl p-12 text-center max-w-2xl mx-auto bg-accent/[0.02]">
            <p className="text-sm text-muted-light">
              Team profiles will appear here once approved.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button href="/team" variant="secondary">
            Meet the full team
          </Button>
        </div>
      </Container>
    </section>
  );
}