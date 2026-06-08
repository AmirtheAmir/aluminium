import { cn } from "@/lib/utils";

interface HeroCopyProps {
  className?: string;
}

export function HeroCopy({ className }: HeroCopyProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col items-center text-center",
        className,
      )}
    >
      <p className="type-s-button text-text-inactive-primary uppercase">
        Built for modern operations
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <h2 className="type-h2 max-w-176 text-balance text-text-primary">
          Turn Messy Workflows Into Clear System
        </h2>
        <p className="type-title-h5 max-w-172 text-balance text-text-primary">
          We help businesses organize daily operations into clean structured
          processes that are easier to manage, scale, and improve.
        </p>
      </div>
    </div>
  );
}
