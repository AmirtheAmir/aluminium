import { cn } from "@/lib/utils";

interface HeroContentProps {
  className?: string;
}

export function HeroContent({ className }: HeroContentProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col items-center text-center",
        className,
      )}
    >
      <p className="type-s-button-500 text-text-inactive-primary uppercase">
        Built for modern operations
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <h2 className="type-h2 max-w-176 text-balance text-text-primary">
          Turn Messy Workflows Into Clear System
        </h2>
        <p className="type-heading-5-500 max-w-172 text-balance text-text-primary">
          We help businesses organize daily operations into clean structured
          processes that are easier to manage, scale, and improve.
        </p>
      </div>
    </div>
  );
}
