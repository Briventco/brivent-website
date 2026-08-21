import { JobOpening } from "@/types/career";
import Button from "./Button";

export default function JobCard({ job }: { job: JobOpening }) {
  return (
    <div className="bg-white border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-accent transition-colors">
      <div>
        <p className="text-[10px] text-muted-light tracking-widest uppercase mb-1">
          {job.department}
        </p>
        <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
        <p className="text-sm text-muted mt-1">
          {job.location} · {job.remote ? "Remote-friendly" : "On-site"} ·{" "}
          {job.engagementType}
        </p>
      </div>
      <Button href={job.applyHref} variant="primary" className="whitespace-nowrap">
        Apply now
      </Button>
    </div>
  );
}
