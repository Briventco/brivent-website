"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import { Project } from "@/types/project";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="Case Study Intro"
          title="Every project starts with a problem."
          description="Our job is to understand it, design a practical solution, and build something that works."
          className="mb-12"
        />

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.map((project, i) => (
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
          <div className="border border-dashed border-border rounded-xl p-12 text-center">
            <p className="text-sm text-muted-light">
              Selected projects and case studies will appear here once
              approved for publication.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
