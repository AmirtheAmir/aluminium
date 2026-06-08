import { ChallengeCards } from "@/components/molecules/challenge-cards";
import { ChallengeIntro } from "@/components/molecules/challenge-intro";
import { cn } from "@/lib/utils";

interface WorkflowChallengeProps {
  className?: string;
}

export function WorkflowChallenge({ className }: WorkflowChallengeProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-12 border-b border-border-primary bg-background-primary py-24",
        className
      )}
    >
      <ChallengeIntro />
      <ChallengeCards />
    </section>
  );
}
