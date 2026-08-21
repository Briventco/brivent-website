import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Brivent Global Innovations collects, uses, and protects information.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information We Collect",
    body: "We may collect information you provide directly to us, such as your name, email address, organization, and the contents of any message you send through our contact form. We may also collect basic technical information such as browser type and general usage data to help us maintain and improve the site.",
  },
  {
    title: "How We Use Information",
    body: "We use the information you provide to respond to enquiries, evaluate partnership or business opportunities, process job applications, and improve our products and services. We do not sell personal information to third parties.",
  },
  {
    title: "How We Protect Information",
    body: "We take reasonable technical and organizational measures to protect information submitted to us. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Third-Party Services",
    body: "Our products, including Servra, may rely on third-party services such as messaging platforms and payment processors to function. Use of those services is also subject to their own privacy policies.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of personal information you have submitted to us by contacting us using the details below.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Material changes will be reflected by updating the date on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-[#0F172A] pt-40 pb-20">
        <Container>
          <SectionLabel light>Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl mb-4">
            Privacy Policy
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
              This is a draft privacy policy template. It should be reviewed
              by Brivent&rsquo;s Operations team (and legal counsel, where
              applicable) before publication, particularly regarding data
              retention, applicable jurisdiction, and any regulatory
              requirements relevant to Brivent&rsquo;s markets.
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
                If you have questions about this Privacy Policy, contact us
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
