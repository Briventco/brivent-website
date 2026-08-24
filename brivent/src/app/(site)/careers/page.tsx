import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getJobOpenings } from "@/lib/api";
import {
  CareersHero,
  WhyBrivent,
  EarlyCareer,
  WhatWeLookFor,
  OpenRoles,
  CareersCta,
} from "@/components/careers/Sections";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Brivent Global Innovations and work on real products with real responsibility.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getJobOpenings();

  return (
    <main>
      <CareersHero />
      <WhyBrivent />
      <EarlyCareer />
      <WhatWeLookFor />
      <OpenRoles jobs={jobs} />
      <CareersCta />
    </main>
  );
}
