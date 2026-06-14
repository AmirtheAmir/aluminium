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
        "flex flex-col gap-2 border-l p-3 transition-colors",
        active ? "border-border-secondary" : "border-border-primary",
      )}
    >
      <p
        className={cn(
          "type-p-strong uppercase",
          active ? "text-text-tertiary" : "text-text-inactive-primary",
        )}
      >
        {eyebrow}
      </p>

      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            "type-h6",
            active ? "text-text-primary" : "text-text-inactive-primary",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "type-p-body",
            active ? "text-text-primary" : "text-text-inactive-secondary",
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
