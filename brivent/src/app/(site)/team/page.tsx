import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getTeamMembers } from "@/lib/api";
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

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main>
      <TeamHero />
      <Leadership teamMembers={teamMembers} />
      <Engineering teamMembers={teamMembers} />
      <Operations teamMembers={teamMembers} />
      <EarlyBuilders teamMembers={teamMembers} />
    </main>
  );
}
