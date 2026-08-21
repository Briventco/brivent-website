import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the Brivent Global Innovations website and products.",
  path: "/terms",
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, please do not use this site.",
  },
  {
    title: "Use of the Site",
    body: "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by any third party.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website, including text, graphics, logos, and product names, is the property of Brivent Global Innovations Ltd. or its licensors and is protected by applicable intellectual property laws.",
  },
  {
    title: "Product and Service Availability",
    body: "Information about products such as Servra is provided for general informational purposes. Availability, features, and pricing are subject to change and should be confirmed directly with Brivent before entering into any agreement.",
  },
  {
    title: "Limitation of Liability",
    body: "Brivent makes reasonable efforts to keep information on this site accurate and up to date, but does not warrant that the site will be error-free or uninterrupted. To the extent permitted by law, Brivent shall not be liable for any indirect or consequential loss arising from use of this site.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these Terms of Use from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <section className="bg-[#0F172A] pt-40 pb-20">
        <Container>
          <SectionLabel light>Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl mb-4">
            Terms of Use
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: To be confirmed before publication
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="max-w-3xl space-y-10">
            <p className="text-sm text-muted-light bg-surface border border-border rounded-lg p-4">
              This is a draft Terms of Use template. It should be reviewed
              by Brivent&rsquo;s Operations team (and legal counsel, where
              applicable) before publication, particularly regarding
              governing law and jurisdiction.
            </p>
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold text-foreground mb-3">
                  {section.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
            <div>
              <h2 className="text-lg font-bold text-foreground mb-3">
                Contact Us
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                If you have questions about these Terms of Use, contact us
                at{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent hover:underline"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
