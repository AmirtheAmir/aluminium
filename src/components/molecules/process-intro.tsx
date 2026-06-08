import { cn } from "@/lib/utils";

interface ProcessIntroProps {
  className?: string;
}

export function ProcessIntro({ className }: ProcessIntroProps) {
  return (
    <div className={cn("flex w-full flex-col md:w-1/2", className)}>
      <p className="type-s-button text-text-inactive-primary uppercase">
        The process
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="type-h5 text-balance text-text-primary">
          Built To Turn Messy Operations Into Clear Systems
        </h2>
        <p className="type-s-body text-text-primary">
          Daily work becomes easier to structure, ownership becomes clearer, and
          processes become simpler to follow, manage, and scale.
        </p>
      </div>
    </div>
  );
}
