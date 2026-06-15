import {
  LottiePreview,
  type LottieAnimation,
} from "@/components/ui/lottie-preview";
import { cn } from "@/lib/utils";

interface OperationChallengeCardProps {
  animationData: LottieAnimation;
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
}

export function OperationChallengeCard({
  animationData,
  eyebrow,
  title,
  subtitle,
  className,
}: OperationChallengeCardProps) {
  return (
    <article
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-3 border border-border-primary bg-background-primary p-3 lg:gap-4 lg:p-4",
        className,
      )}
    >
      <p className="type-challenge-eyebrow text-text-inactive-primary uppercase">
        {eyebrow}
      </p>
      <LottiePreview animationData={animationData} />
      <div className="flex flex-col gap-3 lg:gap-4">
        <h3 className="type-challenge-title text-text-primary">{title}</h3>
        <p className="type-challenge-subtitle text-text-primary">{subtitle}</p>
      </div>
    </article>
  );
}
