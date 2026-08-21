import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block bg-white border border-border rounded-xl overflow-hidden hover:border-accent hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-surface overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-accent/20 text-center px-4">
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <p className="text-[10px] text-accent tracking-widest uppercase mb-1 font-semibold">
          {project.category}
        </p>
        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {project.challenge}
        </p>
      </div>
    </Link>
  );
}