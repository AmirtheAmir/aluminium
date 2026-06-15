"use client";

import { useState } from "react";

import { TextReveal } from "@/components/atoms/text-reveal";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  children: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "compact" | "default";
}

export function NavButton({
  children,
  className,
  href,
  onClick,
  size = "default",
}: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const content = (
    <TextReveal active={isHovered} center>
      {children}
    </TextReveal>
  );
  const buttonClassName = cn(
    "inline-flex cursor-pointer items-center justify-center bg-background-primary text-text-primary transition-colors active:bg-background-active",
    size === "compact" ? "type-xs-button-500 p-3" : "type-s-button-500 p-4",
    className,
  );

  if (href) {
    return (
      <a
        className={buttonClassName}
        href={href}
        onClick={onClick}
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
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      {content}
    </button>
  );
}
