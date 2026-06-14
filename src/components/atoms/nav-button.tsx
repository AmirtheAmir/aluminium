"use client";

import { useState } from "react";

import { TextReveal } from "@/components/atoms/text-reveal";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  children: string;
  className?: string;
  href?: string;
}

export function NavButton({
  children,
  className,
  href,
}: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const content = (
    <TextReveal active={isHovered} center>
      {children}
    </TextReveal>
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
