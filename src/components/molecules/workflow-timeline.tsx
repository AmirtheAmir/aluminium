"use client";

import { useEffect, useRef, useState } from "react";

import { WorkflowStep } from "@/components/atoms/workflow-step";
import { cn } from "@/lib/utils";

interface StructuredFlowStep {
  title: string;
  subtitle: string;
}

interface WorkflowTimelineProps {
  className?: string;
  steps: StructuredFlowStep[];
}

export function WorkflowTimeline({
  className,
  steps,
}: WorkflowTimelineProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frameId = 0;

    function updateActiveIndex() {
      const threshold = window.innerHeight * 0.45;
      const nextIndex = itemRefs.current.reduce((currentIndex, item, index) => {
        if (!item) return currentIndex;

        return item.getBoundingClientRect().top <= threshold
          ? index
          : currentIndex;
      }, 0);

      setActiveIndex((currentIndex) =>
        currentIndex === nextIndex ? currentIndex : nextIndex,
      );
    }

    function requestUpdate() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveIndex);
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
    <div className={cn("flex w-full flex-col", className)}>
      {steps.map((step, index) => (
        <div
          key={step.title}
          ref={(item) => {
            itemRefs.current[index] = item;
          }}
        >
          <WorkflowStep
            active={index <= activeIndex}
            subtitle={step.subtitle}
            title={step.title}
          />
        </div>
      ))}
    </div>
  );
}
