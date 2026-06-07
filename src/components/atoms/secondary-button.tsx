"use client";

import { useRef, useState } from "react";

import { AnimatedText } from "@/components/atoms/animated-text";
import {
  ArrowRightIcon,
  type ArrowRightIconHandle,
} from "@/components/ui/arrow-right";

import { cn } from "@/lib/utils";

type SecondaryButtonTone = "default" | "inverse";

interface SecondaryButtonProps {
  className?: string;
  tone?: SecondaryButtonTone;
}

const toneClassNames: Record<SecondaryButtonTone, string> = {
  default: "border-border-primary bg-background-primary text-text-primary",
  inverse: "border-border-secondary bg-background-inverse text-text-inverse",
};

export function SecondaryButton({
  className,
  tone = "default",
}: SecondaryButtonProps) {
  const arrowIconRef = useRef<ArrowRightIconHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
    arrowIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    setIsHovered(false);
    arrowIconRef.current?.stopAnimation();
  }

  return (
    <button
      className={cn(
        "type-s-button inline-flex cursor-pointer items-center justify-between border p-4 uppercase",
        toneClassNames[tone],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      <AnimatedText active={isHovered} center>
        Get in touch
      </AnimatedText>
      <ArrowRightIcon aria-hidden="true" ref={arrowIconRef} size={18} />
    </button>
  );
}
