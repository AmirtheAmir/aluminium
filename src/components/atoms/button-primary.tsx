"use client";

import { useState } from "react";

import { TextReveal } from "@/components/atoms/text-reveal";
import { cn } from "@/lib/utils";

type PrimaryButtonTone = "dark" | "light";

interface ButtonPrimaryProps {
  children: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  tone?: PrimaryButtonTone;
}

const toneClassNames: Record<PrimaryButtonTone, string> = {
  dark: "border-border-secondary bg-background-inverse text-text-inverse",
  light: "border-border-primary bg-background-primary text-text-primary",
};

export function ButtonPrimary({
  children,
  className,
  disabled,
  href,
  onClick,
  tone = "dark",
}: ButtonPrimaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const content = (
    <TextReveal active={isHovered} center>
      {children}
    </TextReveal>
  );
  const buttonClassName = cn(
    "type-m-600 inline-flex w-48 cursor-pointer items-center justify-center border px-7 py-4 text-center uppercase",
    toneClassNames[tone],
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
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type="button"
    >
      {content}
    </button>
  );
}
