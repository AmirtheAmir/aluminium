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
  iconSize?: number;
  onClick?: () => void;
  size?: "compact" | "default";
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
  iconSize,
  onClick,
  size = "default",
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
        <ArrowUpIcon
          aria-hidden="true"
          ref={arrowIconRef}
          size={iconSize ?? 18}
        />
      ) : icon === "right" ? (
        <ArrowRightIcon
          aria-hidden="true"
          ref={arrowIconRef}
          size={iconSize ?? 18}
        />
      ) : null}
    </>
  );

  const buttonClassName = cn(
    "inline-flex cursor-pointer items-center justify-between border uppercase",
    size === "compact"
      ? "type-xs-button-500 gap-3 p-3"
      : "type-s-button-500 px-7 py-4",
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
