"use client";

import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";
import { useRef } from "react";

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

  return (
    <article
      className="flex min-w-0 flex-col gap-12 border border-border-primary bg-background-primary p-4"
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <Icon aria-hidden ref={iconRef} size={20} />

      <div className="flex flex-col gap-3">
        <h3 className="type-h6 text-text-primary">{title}</h3>
        <p className="type-m-body-500 text-text-primary">{subtitle}</p>
      </div>
    </article>
  );
}
