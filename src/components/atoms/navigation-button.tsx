"use client";

import { useState } from "react";

import { AnimatedText } from "@/components/atoms/animated-text";
import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  children: string;
  className?: string;
}

export function NavigationButton({
  children,
  className,
}: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "type-s-button inline-flex cursor-pointer items-center justify-center bg-background-primary p-4 text-text-primary transition-colors hover:bg-background-inverse hover:text-text-inverse",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      <AnimatedText active={isHovered} center>
        {children}
      </AnimatedText>
    </button>
  );
}
