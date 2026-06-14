import { OperationChallengeGrid } from "@/components/molecules/operation-challenge-grid";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface ChallengesSectionProps {
  className?: string;
}

export function ChallengesSection({ className }: ChallengesSectionProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-12 border-b border-border-primary bg-background-primary py-36",
        className,
      )}
      id="challenges"
    >
      <SectionIntro
        eyebrow="The challenge"
        subtitle="Aluminium helps teams turn scattered workflows, unclear ownership, and daily operational noise into clean, structured systems that are easier to run and scale."
        title="Most Businesses Don't Fail From Lack Of Effort They Fail From Messy Operations"
      />
      <OperationChallengeGrid />
    </section>
  );
}
