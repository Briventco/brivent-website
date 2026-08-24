import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import {
  PartnershipsHero,
  PartnershipModels,
  FeaturedPartnership,
  HowWePartner,
  PartnershipsCta,
} from "@/components/partnerships/Sections";

export const metadata: Metadata = buildMetadata({
  title: "Partnerships",
  description:
    "Brivent works with businesses, organizations, founders, and technology teams to turn ideas and operational problems into practical digital solutions.",
  path: "/partnerships",
});

export default function PartnershipsPage() {
  return (
    <main>
      <PartnershipsHero />
      <PartnershipModels />
      <FeaturedPartnership />
      <HowWePartner />
      <PartnershipsCta />
    </main>
  );
}
