"use client";

import { useEffect, useRef, useState } from "react";

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
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    function updateIconSize() {
      setIsCompact(mediaQuery.matches);
    }

    updateIconSize();
    mediaQuery.addEventListener("change", updateIconSize);

    return () => {
      mediaQuery.removeEventListener("change", updateIconSize);
    };
  }, []);

  function handleMouseEnter() {
    checkIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    checkIconRef.current?.stopAnimation();
  }

  return (
    <li
      className={cn(
        "type-plan-feature flex items-center gap-3 transition-colors",
        inverse ? "text-text-inverse" : "text-text-tertiary",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CheckIcon
        aria-hidden="true"
        className="shrink-0"
        ref={checkIconRef}
        size={isCompact ? 16 : 18}
      />
      <span>{children}</span>
    </li>
  );
}
