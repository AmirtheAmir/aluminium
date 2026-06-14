"use client";

import { useRef, useState } from "react";

import { TextReveal } from "@/components/atoms/text-reveal";
import {
  ArrowRightIcon,
  type ArrowRightIconHandle,
} from "@/components/ui/arrow-right";
import {
  ArrowUpIcon,
  type ArrowUpIconHandle,
} from "@/components/ui/arrow-up";
import { cn } from "@/lib/utils";

type SecondaryButtonTone = "default" | "inverse";
type SecondaryButtonIcon = "none" | "right" | "up";

interface ButtonSecondaryProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: SecondaryButtonIcon;
  onClick?: () => void;
  tone?: SecondaryButtonTone;
}

const toneClassNames: Record<SecondaryButtonTone, string> = {
  default: "border-border-primary bg-background-primary text-text-primary",
  inverse: "border-border-secondary bg-background-inverse text-text-inverse",
};

export function ButtonSecondary({
  children = "Get in touch",
  className,
  disabled,
  href,
  icon = "right",
  onClick,
  tone = "default",
}: ButtonSecondaryProps) {
  const arrowIconRef = useRef<ArrowRightIconHandle | ArrowUpIconHandle>(null);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
    arrowIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    setIsHovered(false);
    arrowIconRef.current?.stopAnimation();
  }

  const content = (
    <>
      <TextReveal active={isHovered} center>
        {children}
      </TextReveal>
      {icon === "up" ? (
        <ArrowUpIcon aria-hidden="true" ref={arrowIconRef} size={18} />
      ) : icon === "right" ? (
        <ArrowRightIcon aria-hidden="true" ref={arrowIconRef} size={18} />
      ) : null}
    </>
  );

  const buttonClassName = cn(
    "type-s-button inline-flex cursor-pointer items-center justify-between border p-4 uppercase",
    toneClassNames[tone],
    className,
  );

  if (href) {
    return (
      <a
        className={buttonClassName}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
    >
      {content}
    </button>
  );
}
