import { SolutionGrid } from "@/components/molecules/solution-grid";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface SolutionsSectionProps {
  className?: string;
}

export function SolutionsSection({ className }: SolutionsSectionProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-12 border-b border-border-primary bg-background-primary py-36",
        className,
      )}
      id="use-cases"
    >
      <SectionIntro
        eyebrow="Use cases"
        subtitle="Designed for businesses that need clearer workflows, stronger ownership, and more structured ways to manage daily work."
        title="For Teams Managing Layered Workflows, Moving Parts, And Operational Complexity"
      />
      <SolutionGrid />
    </section>
  );
}
