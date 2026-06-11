import { PrimaryButton } from "@/components/atoms/primary-button";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  className?: string;
  onContactClick?: () => void;
}

export function HeroActions({ className, onContactClick }: HeroActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <PrimaryButton onClick={onContactClick}>Get Aluminium</PrimaryButton>
      <PrimaryButton href="#pricing" tone="light">
        View Pricing
      </PrimaryButton>
    </div>
  );
}
