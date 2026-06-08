"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";

import { ProcessFour, ProcessOne, ProcessThree, ProcessTwo } from "@/assets/icons";
import { ProcessStepList } from "@/components/molecules/process-step-list";
import { ProcessVisual } from "@/components/molecules/process-visual";
import { SectionIntro } from "@/components/molecules/section-intro";
import { cn } from "@/lib/utils";

interface ProcessShowcaseProps {
  className?: string;
}

interface ProcessStep {
  eyebrow: string;
  title: string;
  subtitle: string;
  Illustration: ComponentType<SVGProps<SVGSVGElement>>;
}

const processSteps: ProcessStep[] = [
  {
    eyebrow: "Clarity",
    title: "Map The Operational Mess",
    subtitle:
      "Identify scattered workflows, repeated manual tasks, unclear responsibilities, and the places where work slows down.",
    Illustration: ProcessOne,
  },
  {
    eyebrow: "Focus",
    title: "Define What Matters Most",
    subtitle:
      "Separate important actions from daily noise so teams know what needs attention, who owns it, and what should happen next.",
    Illustration: ProcessTwo,
  },
  {
    eyebrow: "Structure",
    title: "Build One Clear Process",
    subtitle:
      "Turn disconnected tasks, approvals, and updates into a clean workflow that everyone can follow with less confusion.",
    Illustration: ProcessThree,
  },
  {
    eyebrow: "Control",
    title: "Make Work Easier To Manage",
    subtitle:
      "Give teams better visibility over progress, ownership, and outcomes so operations become more predictable and scalable.",
    Illustration: ProcessFour,
  },
];

export function ProcessShowcase({ className }: ProcessShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = processSteps[activeIndex];

  useEffect(() => {
    let frameId = 0;

    function updateActiveStep() {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(
        Math.max(-rect.top / scrollableDistance, 0),
        0.999,
      );
      const nextIndex = Math.min(
        processSteps.length - 1,
        Math.floor(progress * processSteps.length),
      );

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    }

    function requestUpdate() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveStep);
    }

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      className={cn(
        "relative h-[400vh] border-b border-border-primary",
        className,
      )}
      ref={sectionRef}
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col gap-12 bg-background-primary py-36">
        <SectionIntro
          eyebrow="The process"
          subtitle="Daily work becomes easier to structure, ownership becomes clearer, and processes become simpler to follow, manage, and scale."
          title="Built To Turn Messy Operations Into Clear Systems"
        />

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <ProcessVisual
            Illustration={activeStep.Illustration}
            label={`Step ${activeIndex + 1}`}
          />
          <ProcessStepList activeIndex={activeIndex} steps={processSteps} />
        </div>
      </div>
    </section>
  );
}
