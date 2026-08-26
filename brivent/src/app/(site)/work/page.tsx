import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/api";
import WorkHero from "@/components/work/Hero";
import ProjectGrid from "@/components/work/ProjectGrid";
import WorkCta from "@/components/work/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Explore selected products, platforms, websites, and technology projects built by Brivent and our team.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main>
      <WorkHero />
      <ProjectGrid projects={projects} />
      <WorkCta />
    </main>
  );
}
