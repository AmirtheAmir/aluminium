"use client";

import { useState } from "react";

import { AnimatedText } from "@/components/atoms/animated-text";
import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  children: string;
  className?: string;
  href?: string;
}

export function NavigationButton({
  children,
  className,
  href,
}: NavigationButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const content = (
    <AnimatedText active={isHovered} center>
      {children}
    </AnimatedText>
  );
  const buttonClassName = cn(
    "type-s-button inline-flex cursor-pointer items-center justify-center bg-background-primary p-4 text-text-primary transition-colors active:bg-background-active",
    className,
  );

  if (href) {
    return (
      <a
        className={buttonClassName}
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      {content}
    </button>
  );
}
