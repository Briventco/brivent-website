import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import WorkHero from "@/components/work/Hero";
import ProjectGrid from "@/components/work/ProjectGrid";
import WorkCta from "@/components/work/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Explore selected products, platforms, websites, and technology projects built by Brivent and our team.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <ProjectGrid />
      <WorkCta />
    </main>
  );
}
