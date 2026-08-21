import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import ServraHero from "@/components/servra/Hero";
import Problem from "@/components/servra/Problem";
import HowItWorks from "@/components/servra/HowItWorks";
import WhyWhatsApp from "@/components/servra/WhyWhatsApp";
import Benefits from "@/components/servra/Benefits";
import ForRestaurants from "@/components/servra/ForRestaurants";
import Faq from "@/components/servra/Faq";
import ServraCta from "@/components/servra/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Servra — AI Order Agent for Restaurants",
  description:
    "Servra is an AI Order Agent for restaurants that works directly through a vendor's existing WhatsApp number. Chat. Order. Done.",
  path: "/products/servra",
});

export default function ServraPage() {
  return (
    <main>
      <ServraHero />
      <Problem />
      <HowItWorks />
      <WhyWhatsApp />
      <Benefits />
      <ForRestaurants />
      <Faq />
      <ServraCta />
    </main>
  );
}
