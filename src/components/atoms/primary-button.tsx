"use client";

import { useState } from "react";

import { AnimatedText } from "@/components/atoms/animated-text";
import { cn } from "@/lib/utils";

type PrimaryButtonTone = "dark" | "light";

interface PrimaryButtonProps {
  children: string;
  className?: string;
  tone?: PrimaryButtonTone;
}

const toneClassNames: Record<PrimaryButtonTone, string> = {
  dark: "border-border-secondary bg-background-inverse text-text-inverse",
  light: "border-border-primary bg-background-primary text-text-primary",
};

export function PrimaryButton({
  children,
  className,
  tone = "dark",
}: PrimaryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "type-p-strong w-48 inline-flex cursor-pointer items-center justify-center border px-7 py-4 text-center uppercase ",
        toneClassNames[tone],
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
