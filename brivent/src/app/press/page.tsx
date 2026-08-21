import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Press",
  description:
    "Approved information about Brivent Global Innovations for media, event organizers, and partners.",
  path: "/press",
});

const resources = [
  "Approved company description",
  "Founder biography",
  "Product descriptions",
  "Logos and brand assets",
  "Selected photographs",
];

export default function PressPage() {
  return (
    <main>
      <section className="bg-[#0F172A] pt-40 pb-24">
        <Container>
          <SectionLabel light>Press / Media</SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl mb-6">
            Brivent in the public conversation.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            For media, event organizers, partners, and organizations looking
            for approved information about Brivent.
          </p>
        </Container>
      </section>

      <section className="bg-white py-24 border-b border-border">
        <Container>
          <SectionHeading
            label="Company Description"
            title="Who we are, in one paragraph."
            description={siteConfig.description}
            className="max-w-3xl"
          />
        </Container>
      </section>

      <section className="bg-surface py-24 border-b border-border">
        <Container>
          <SectionHeading
            label="Media Resources"
            title="Available on request."
            className="mb-10"
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {resources.map((item) => (
              <li
                key={item}
                className="bg-white border border-border rounded-lg px-5 py-4 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <p className="text-[10px] text-muted-light tracking-widest uppercase mb-2">
            Media Contact
          </p>
          <p className="text-sm text-muted">
            For press and media enquiries, use the official Brivent contact
            at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
