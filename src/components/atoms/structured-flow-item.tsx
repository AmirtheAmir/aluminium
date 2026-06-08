import { cn } from "@/lib/utils";

interface StructuredFlowItemProps {
  active?: boolean;
  title: string;
  subtitle: string;
}

export function StructuredFlowItem({
  active = false,
  title,
  subtitle,
}: StructuredFlowItemProps) {
  return (
    <div className="flex h-[344px] gap-3">
      <div className="relative flex h-[344px] w-3 shrink-0 justify-center">
        <span
          className={cn(
            "h-full w-0.5 transition-colors",
            active ? "bg-text-primary" : "bg-text-inactive-primary",
          )}
        />
        <span
          className={cn(
            "absolute top-0 left-0 h-3 w-3 transition-colors",
            active ? "bg-text-primary" : "bg-text-inactive-primary",
          )}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <h3
          className={cn(
            "type-h3 uppercase transition-colors",
            active ? "text-text-primary" : "text-text-inactive-primary",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "type-p-body transition-colors",
            active ? "text-text-primary" : "text-text-inactive-secondary",
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
