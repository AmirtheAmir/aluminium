import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { cn } from "@/lib/utils";

type SecondaryButtonTone = "default" | "inverse";

interface SecondaryButtonProps {
  className?: string;
  tone?: SecondaryButtonTone;
}

const toneClassNames: Record<SecondaryButtonTone, string> = {
  default: "border-border-primary bg-background-primary text-text-primary",
  inverse: "border-border-secondary bg-background-inverse text-text-inverse",
};

export function SecondaryButton({
  className,
  tone = "default",
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        "type-s-button inline-flex min-h-13 items-center justify-between gap-12 border p-4 uppercase",
        toneClassNames[tone],
        className
      )}
      type="button"
    >
      <span>Get in touch</span>
      <ArrowRightIcon aria-hidden="true" size={18} />
    </button>
  );
}
