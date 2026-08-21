import { cn } from "@/lib/utils";
import SectionLabel from "./SectionLabel";

interface SectionHeadingProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center mx-auto",
        className
      )}
    >
      {label && (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <SectionLabel light={light}>{label}</SectionLabel>
        </div>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl font-bold leading-tight tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm md:text-base mt-3 leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-lg",
            light ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
