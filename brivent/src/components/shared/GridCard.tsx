import { cn } from "@/lib/utils";

interface GridCardProps {
  eyebrow: string;
  title: string;
  description: string;
  index: number;
  linkLabel?: string;
  highlighted?: boolean;
  className?: string;
}

export default function GridCard({
  eyebrow,
  title,
  description,
  index,
  linkLabel = "Explore",
  highlighted,
  className,
}: GridCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full p-8 bg-white hover:bg-surface transition-colors",
        highlighted && "bg-surface",
        className
      )}
    >
      <span className="absolute top-6 right-8 text-2xl font-bold text-border select-none">
        {String(index).padStart(2, "0")}
      </span>
      <p className="text-[10px] text-accent tracking-widest uppercase font-semibold mb-3">
        {eyebrow}
      </p>
      <h3 className="text-lg font-bold text-foreground mb-3 leading-snug pr-10">
        {title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
        {description}
      </p>
      <span className="inline-block text-[10px] text-accent font-semibold tracking-widest uppercase hover:underline cursor-pointer">
        {linkLabel} →
      </span>
    </div>
  );
}