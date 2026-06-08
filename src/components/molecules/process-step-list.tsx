import { ProcessStepItem } from "@/components/atoms/process-step-item";

interface ProcessStep {
  eyebrow: string;
  title: string;
  subtitle: string;
}

interface ProcessStepListProps {
  activeIndex: number;
  steps: ProcessStep[];
}

export function ProcessStepList({ activeIndex, steps }: ProcessStepListProps) {
  return (
    <div className="flex w-full gap-2 flex-col md:w-1/2">
      {steps.map((step, index) => (
        <ProcessStepItem
          active={index === activeIndex}
          eyebrow={step.eyebrow}
          key={step.eyebrow}
          subtitle={step.subtitle}
          title={step.title}
        />
      ))}
    </div>
  );
}
