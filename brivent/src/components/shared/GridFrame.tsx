import { cn } from "@/lib/utils";

interface GridFrameProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

const colClasses: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
};

export default function GridFrame({
  children,
  columns = 3,
  className,
}: GridFrameProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 border border-border rounded-2xl overflow-hidden bg-border gap-px auto-rows-fr",
        colClasses[columns],
        className
      )}
    >
      {children}
    </div>
  );
}