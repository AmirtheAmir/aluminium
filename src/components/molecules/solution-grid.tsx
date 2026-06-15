import { SolutionCard } from "@/components/molecules/solution-card";
import { ArrowBigUpIcon } from "@/components/ui/arrow-big-up";
import { RouteIcon } from "@/components/ui/routeicon";
import { SquareStackIcon } from "@/components/ui/square-stack";
import { WorkflowIcon } from "@/components/ui/workflow";
import { cn } from "@/lib/utils";

interface SolutionGridProps {
  className?: string;
}

const useCases = [
  {
    Icon: WorkflowIcon,
    title: "Operation Teams",
    subtitle: "Keep tasks, approvals, and ownership clear across daily work.",
  },
  {
    Icon: ArrowBigUpIcon,
    title: "Growing Businesses",
    subtitle:
      "Keep processes consistent as teams and responsibilities expand.",
  },
  {
    Icon: SquareStackIcon,
    title: "Cross Functional Teams",
    subtitle:
      "Make handoffs, responsibilities, and next steps easier to follow.",
  },
  {
    Icon: RouteIcon,
    title: "Process Heavy Companies",
    subtitle:
      "Turn repeated workflows into consistent, manageable routines.",
  },
];

export function SolutionGrid({ className }: SolutionGridProps) {
  return (
    <div
      className={cn("grid w-full grid-cols-2 gap-3 lg:grid-cols-4", className)}
    >
      {useCases.map((useCase) => (
        <SolutionCard
          Icon={useCase.Icon}
          key={useCase.title}
          subtitle={useCase.subtitle}
          title={useCase.title}
        />
      ))}
    </div>
  );
}
