"use client";

import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import { useEffect, useRef, useState } from "react";

interface UseCaseIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UseCaseIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

interface SolutionCardProps {
  Icon: ForwardRefExoticComponent<
    UseCaseIconProps & RefAttributes<UseCaseIconHandle>
  >;
  title: string;
  subtitle: string;
}

export function SolutionCard({ Icon, title, subtitle }: SolutionCardProps) {
  const iconRef = useRef<UseCaseIconHandle>(null);
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

  return (
    <article
      className="flex min-w-0 flex-col gap-12 border border-border-primary bg-background-primary p-3 lg:p-4"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <Icon aria-hidden ref={iconRef} size={isCompact ? 18 : 20} />

      <div className="flex flex-col gap-2 lg:gap-3">
        <h3 className="type-use-case-title text-text-primary">{title}</h3>
        <p className="type-use-case-body text-text-primary">{subtitle}</p>
      </div>
    </article>
  );
}
