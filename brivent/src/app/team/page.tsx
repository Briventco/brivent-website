import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import {
  TeamHero,
  Leadership,
  Engineering,
  Operations,
  EarlyBuilders,
} from "@/components/team/Sections";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description:
    "Meet the founders, engineers, operators, and early builders behind Brivent Global Innovations.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <Leadership />
      <Engineering />
      <Operations />
      <EarlyBuilders />
    </main>
  );
}
