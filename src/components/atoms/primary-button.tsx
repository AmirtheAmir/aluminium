"use client";

import { useState } from "react";

import { AnimatedText } from "@/components/atoms/animated-text";
import { cn } from "@/lib/utils";

type PrimaryButtonTone = "dark" | "light";

interface PrimaryButtonProps {
  children: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  tone?: PrimaryButtonTone;
}

const toneClassNames: Record<PrimaryButtonTone, string> = {
  dark: "border-border-secondary bg-background-inverse text-text-inverse",
  light: "border-border-primary bg-background-primary text-text-primary",
};

export function PrimaryButton({
  children,
  className,
  disabled,
  onClick,
  tone = "dark",
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "type-p-strong inline-flex w-48 cursor-pointer items-center justify-center border px-7 py-4 text-center uppercase",
        toneClassNames[tone],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
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
