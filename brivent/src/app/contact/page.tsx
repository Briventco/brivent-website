import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { ContactHero, EnquiryRoutes } from "@/components/contact/Sections";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Brivent for business enquiries, partnerships, product enquiries, careers, or general questions.",
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