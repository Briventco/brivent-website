import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Button from "@/components/shared/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return buildMetadata({
      title: "Project",
      description: "A Brivent project.",
      path: `/work/${slug}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.challenge,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections: { label: string; content: string }[] = [
    { label: "Challenge", content: project.challenge },
    { label: "Approach", content: project.approach },
    { label: "Solution", content: project.solution },
    { label: "Outcome", content: project.outcome },
  ];

  if (project.lessons) {
    sections.push({ label: "What we learned", content: project.lessons });
  }

  return (
    <main>
      <section className="bg-[#0F172A] pt-40 pb-20">
        <Container>
          <Link
            href="/work"
            className="text-white/40 hover:text-accent text-sm transition-colors"
          >
            ← All work
          </Link>
          <SectionLabel light className="mt-6">
            {project.category}
          </SectionLabel>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl">
            {project.title}
          </h1>
          {project.technology.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.technology.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white py-24 border-b border-border">
        <Container>
          {project.confidential && (
            <div className="mb-10 border border-amber-200 bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
              Some details of this project are confidential and are not
              published without approval.
            </div>
          )}
          <div className="max-w-3xl space-y-12">
            {sections.map((section) => (
              <div key={section.label}>
                <p className="text-[10px] text-accent tracking-widest uppercase font-semibold mb-3">
                  {section.label}
                </p>
                <p className="text-base text-muted leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-dark-bg py-24">
        <Container className="text-center">
          <Button href="/contact" variant="primary">
            Have a project in mind? Let&rsquo;s talk
          </Button>
        </Container>
      </section>
    </main>
  );
}
