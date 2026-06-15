import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("flex w-full flex-col lg:w-1/2", className)}>
      <p className="type-section-eyebrow text-text-inactive-primary uppercase">
        {eyebrow}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="type-section-title text-balance text-text-primary">
          {title}
        </h2>
        <p className="type-section-subtitle text-text-primary">{subtitle}</p>
      </div>
    </div>
  );
}
