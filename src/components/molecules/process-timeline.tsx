import { ProcessStep } from "@/components/atoms/process-step";

interface ProcessStep {
  eyebrow: string;
  title: string;
  subtitle: string;
}

interface ProcessTimelineProps {
  activeIndex: number;
  steps: ProcessStep[];
}

export function ProcessTimeline({ activeIndex, steps }: ProcessTimelineProps) {
  return (
    <div className="flex w-full flex-col gap-2 md:w-1/2">
      {steps.map((step, index) => (
        <ProcessStep
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
