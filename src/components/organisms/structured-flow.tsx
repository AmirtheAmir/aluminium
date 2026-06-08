import { SectionIntro } from "@/components/molecules/section-intro";
import { StructuredFlowTimeline } from "@/components/molecules/structured-flow-timeline";
import { cn } from "@/lib/utils";

interface StructuredFlowProps {
  className?: string;
}

const structuredFlowSteps = [
  {
    title: "Intake",
    subtitle:
      "Requests, tasks, and internal needs enter through a clear starting point, instead of getting lost across messages, meetings, or side conversations.",
  },
  {
    title: "Ownership",
    subtitle:
      "Teams know who is responsible for each step, what needs attention, and where work stands without constant checking or repeated follow-ups.",
  },
  {
    title: "Visibility",
    subtitle:
      "Updates, decisions, and blockers remain visible as work moves forward, helping teams respond earlier and keep operations under control.",
  },
  {
    title: "Consistency",
    subtitle:
      "Repeated tasks become easier to review, refine, and repeat, so operations stay reliable as the business grows.",
  },
];

export function StructuredFlow({ className }: StructuredFlowProps) {
  return (
    <section
      className={cn(
        "grid w-full grid-cols-1 gap-3 border-b border-border-primary bg-background-primary py-36 md:grid-cols-2",
        className,
      )}
    >
      <SectionIntro
        className="md:sticky md:top-36 md:w-full md:self-start"
        eyebrow="Structured flow"
        subtitle="Aluminium gives teams a shared way to move daily work forward, so requests, responsibilities, updates, and outcomes stay connected across the business."
        title="From Scattered Work To Steady Execution"
      />
      <StructuredFlowTimeline steps={structuredFlowSteps} />
    </section>
  );
}
