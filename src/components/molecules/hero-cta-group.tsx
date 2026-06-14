import { ButtonPrimary } from "@/components/atoms/button-primary";
import { cn } from "@/lib/utils";

interface HeroCtaGroupProps {
  className?: string;
  onQuestionnaireClick?: () => void;
}

export function HeroCtaGroup({
  className,
  onQuestionnaireClick,
}: HeroCtaGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 sm:flex-row",
        className,
      )}
    >
      <ButtonPrimary onClick={onQuestionnaireClick}>Get Aluminium</ButtonPrimary>
      <ButtonPrimary href="#pricing" tone="light">
        View Pricing
      </ButtonPrimary>
    </div>
  );
}
