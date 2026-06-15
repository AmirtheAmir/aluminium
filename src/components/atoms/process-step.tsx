import { cn } from "@/lib/utils";

interface ProcessStepProps {
  active?: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function ProcessStep({
  active = false,
  eyebrow,
  title,
  subtitle,
}: ProcessStepProps) {
  return (
    <div
      className={cn(
        "flex h-1/4 flex-col gap-2 border-l p-2 transition-colors lg:p-3",
        active ? "border-border-secondary" : "border-border-primary",
      )}
    >
      <p
        className={cn(
          "type-process-label uppercase",
          active ? "text-text-tertiary" : "text-text-inactive-primary",
        )}
      >
        {eyebrow}
      </p>

      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            "type-process-title",
            active ? "text-text-primary" : "text-text-inactive-primary",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "type-process-body",
            active ? "text-text-primary" : "text-text-inactive-secondary",
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
