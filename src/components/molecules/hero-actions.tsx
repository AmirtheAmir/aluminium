import { PrimaryButton } from "@/components/atoms/primary-button";
import { cn } from "@/lib/utils";

interface HeroActionsProps {
  className?: string;
}

export function HeroActions({ className }: HeroActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <PrimaryButton>Get Aluminium</PrimaryButton>
      <PrimaryButton tone="light">View Pricing</PrimaryButton>
    </div>
  );
}
