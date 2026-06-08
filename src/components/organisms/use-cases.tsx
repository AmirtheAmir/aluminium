import { UseCaseCards } from "@/components/molecules/use-case-cards";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface UseCasesProps {
  className?: string;
}

export function UseCases({ className }: UseCasesProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-12 border-b border-border-primary bg-background-primary py-36",
        className,
      )}
    >
      <SectionIntro
        eyebrow="Use cases"
        subtitle="Designed for businesses that need clearer workflows, stronger ownership, and more structured ways to manage daily work."
        title="For Teams Managing Layered Workflows, Moving Parts, And Operational Complexity"
      />
      <UseCaseCards />
    </section>
  );
}
