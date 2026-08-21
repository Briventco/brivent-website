import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import AboutHero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import WhyBrivent from "@/components/about/WhyBrivent";
import Approach from "@/components/about/Approach";
import WhatWeBuild from "@/components/about/WhatWeBuild";
import Values from "@/components/about/Values";
import Vision from "@/components/about/Vision";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Brivent Global Innovations is a technology company focused on building digital products and practical technology solutions for businesses and emerging ventures.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Story />
      <WhyBrivent />
      <Approach />
      <WhatWeBuild />
      <Values />
      <Vision />
    </main>
  );
}
