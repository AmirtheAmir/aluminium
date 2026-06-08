import type { ComponentType, SVGProps } from "react";

interface ProcessVisualProps {
  label: string;
  Illustration: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ProcessVisual({ label, Illustration }: ProcessVisualProps) {
  return (
    <div className="flex w-full flex-col gap-4 border border-border-primary px-4 pb-12 pt-4 md:w-1/2">
      <p className="type-p-strong text-text-secondary">{label}</p>

      <div className="flex h-109 w-full items-center justify-center overflow-hidden">
        <Illustration
          aria-hidden="true"
          className="h-auto max-h-full max-w-full text-text-primary"
        />
      </div>
    </div>
  );
}
