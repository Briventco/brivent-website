import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({
  children,
  className,
  light,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[10px] tracking-widest uppercase font-semibold mb-2",
        light ? "text-white/60" : "text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}
