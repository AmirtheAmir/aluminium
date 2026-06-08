import { cn } from "@/lib/utils";

interface ProcessStepItemProps {
  active?: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function ProcessStepItem({
  active = false,
  eyebrow,
  title,
  subtitle,
}: ProcessStepItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 border-l p-3 transition-colors",
        active
          ? "border-border-secondary text-text-primary"
          : "border-border-primary text-text-inactive-secondary"
      )}
    >
      <p
        className={cn(
          "type-p-strong uppercase",
          active ? "text-text-tertiary" : "text-text-inactive-primary"
        )}
      >
        {eyebrow}
      </p>

      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            "type-h6",
            active ? "text-text-primary" : "text-text-inactive-primary"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "type-p-body",
            active ? "text-text-primary" : "text-text-inactive-secondary"
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
