import { ChallengeCards } from "@/components/molecules/challenge-cards";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface WorkflowChallengeProps {
  className?: string;
}

export function WorkflowChallenge({ className }: WorkflowChallengeProps) {
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
      <ChallengeCards />
    </section>
  );
}
