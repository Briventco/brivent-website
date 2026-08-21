"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="relative bg-white py-24 border-b border-border overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-[26rem] h-[26rem] rounded-full bg-flamingo/[0.05] blur-3xl pointer-events-none" />

      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-border">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-accent text-xs tracking-[0.2em] font-semibold uppercase mb-4"
            >
              Selected Work
            </motion.p>
            <SectionHeading
              title="From websites to AI-powered products."
              description="We build technology around real needs. View selected projects and see how Brivent approaches product development."
            />
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors text-sm whitespace-nowrap"
          >
            View all work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-accent/30 rounded-xl p-12 text-center bg-accent/[0.02]">
            <p className="text-sm text-muted-light">
              Selected projects will appear here once approved.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}