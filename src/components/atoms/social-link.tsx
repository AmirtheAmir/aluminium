"use client";

import { useRef } from "react";
import type { MouseEventHandler } from "react";

import {
  ArrowUpRightIcon,
  type ArrowUpRightIconHandle,
} from "@/components/ui/arrow-up-right";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  children: string;
  className?: string;
  href: string;
  iconSize?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function SocialLink({
  children,
  className,
  href,
  iconSize = 14,
  onClick,
}: SocialLinkProps) {
  const arrowIconRef = useRef<ArrowUpRightIconHandle>(null);

  function handleMouseEnter() {
    arrowIconRef.current?.startAnimation();
  }

  function handleMouseLeave() {
    arrowIconRef.current?.stopAnimation();
  }

  return (
    <a
      className={cn(
        "type-s-button-600 inline-flex cursor-pointer items-center gap-1 uppercase text-text-primary",
        className,
      )}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <ArrowUpRightIcon aria-hidden="true" ref={arrowIconRef} size={iconSize} />
    </a>
  );
}
