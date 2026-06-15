"use client";

import { useRef } from "react";

import {
  CheckIcon,
  type CheckIconHandle,
} from "@/components/ui/check";
import { cn } from "@/lib/utils";

interface PlanFeatureProps {
  children: string;
  inverse?: boolean;
}

export function PlanFeature({
  children,
  inverse = false,
}: PlanFeatureProps) {
  const checkIconRef = useRef<CheckIconHandle>(null);

  function handleMouseEnter() {
    checkIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    checkIconRef.current?.stopAnimation();
  }

  return (
    <li
      className={cn(
        "type-s-body-500 flex items-center gap-3 transition-colors",
        inverse ? "text-text-inverse" : "text-text-tertiary",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CheckIcon
        aria-hidden="true"
        className="shrink-0"
        ref={checkIconRef}
        size={18}
      />
      <span>{children}</span>
    </li>
  );
}
