import { ButtonPrimary } from "@/components/atoms/button-primary";
import { cn } from "@/lib/utils";

interface HeroCtaGroupProps {
  className?: string;
  onContactClick?: () => void;
}

export function HeroCtaGroup({ className, onContactClick }: HeroCtaGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <ButtonPrimary onClick={onContactClick}>Get Aluminium</ButtonPrimary>
      <ButtonPrimary href="#pricing" tone="light">
        View Pricing
      </ButtonPrimary>
    </div>
  );
}
