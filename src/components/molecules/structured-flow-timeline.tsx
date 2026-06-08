"use client";

import { useEffect, useRef, useState } from "react";

import { StructuredFlowItem } from "@/components/atoms/structured-flow-item";
import { cn } from "@/lib/utils";

interface StructuredFlowStep {
  title: string;
  subtitle: string;
}

interface StructuredFlowTimelineProps {
  className?: string;
  steps: StructuredFlowStep[];
}

export function StructuredFlowTimeline({
  className,
  steps,
}: StructuredFlowTimelineProps) {
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
          <StructuredFlowItem
            active={index <= activeIndex}
            subtitle={step.subtitle}
            title={step.title}
          />
        </div>
      ))}
    </div>
  );
}
