import { cn } from "@/lib/utils";

interface ChallengeIntroProps {
  className?: string;
}

export function ChallengeIntro({ className }: ChallengeIntroProps) {
  return (
    <div className={cn("flex w-full flex-col md:w-1/2", className)}>
      <p className="type-s-button text-text-inactive-primary uppercase">
        The challenge
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="type-h5 text-balance text-text-primary">
          Most Businesses Don&apos;t Fail From Lack Of Effort They Fail From
          Messy Operations
        </h2>
        <p className="type-s-body text-text-primary">
          Aluminium helps teams turn scattered workflows, unclear ownership,
          and daily operational noise into clean, structured systems that are
          easier to run and scale.
        </p>
      </div>
    </div>
  );
}
