import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
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

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <WhyBrivent />
      <EarlyCareer />
      <WhatWeLookFor />
      <OpenRoles />
      <CareersCta />
    </main>
  );
}
