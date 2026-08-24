import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ContactHero, EnquiryRoutes } from "@/components/contact/Sections";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Work with Brivent",
  description:
    "Work with Brivent to build a product, improve an existing system, explore a partnership, or start a conversation about a business or technology problem.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <EnquiryRoutes />
      <ContactForm />
    </main>
  );
}