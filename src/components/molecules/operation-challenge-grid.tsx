import frictionAnimation from "@/assets/lottie/friction.json";
import gapAnimation from "@/assets/lottie/gap.json";
import noiseAnimation from "@/assets/lottie/noise.json";
import { OperationChallengeCard } from "@/components/molecules/operation-challenge-card";
import type { LottieAnimation } from "@/components/ui/lottie-preview";
import { cn } from "@/lib/utils";

interface OperationChallengeGridProps {
  className?: string;
}

interface ChallengeCardItem {
  animationData: LottieAnimation;
  eyebrow: string;
  title: string;
  subtitle: string;
}

const challengeCards: ChallengeCardItem[] = [
  {
    eyebrow: "The gap",
    title: "Work Looks Organized, Until It Isn't",
    subtitle:
      "Tasks move forward, but scattered tools and unclear ownership hide problems until they become harder to fix.",
    animationData: gapAnimation as LottieAnimation,
  },
  {
    eyebrow: "The noise",
    title: "Too Much Happens At Once",
    subtitle:
      "Messages, approvals, and decisions spread across channels, making it harder to focus on what matters now.",
    animationData: noiseAnimation as LottieAnimation,
  },
  {
    eyebrow: "The friction",
    title: "Simple Work Takes Too Much Effort",
    subtitle:
      "Teams lose time chasing updates, checking status, and fixing confusion that better systems could prevent.",
    animationData: frictionAnimation as LottieAnimation,
  },
];

export function OperationChallengeGrid({ className }: OperationChallengeGridProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 gap-3 lg:grid-cols-3", className)}
    >
      {challengeCards.map((card) => (
        <OperationChallengeCard
          animationData={card.animationData}
          eyebrow={card.eyebrow}
          key={card.eyebrow}
          subtitle={card.subtitle}
          title={card.title}
        />
      ))}
    </div>
  );
}
