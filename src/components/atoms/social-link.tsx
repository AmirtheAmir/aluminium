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
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function SocialLink({
  children,
  className,
  href,
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
        "type-s-button-strong inline-flex cursor-pointer items-center gap-1 uppercase text-text-primary",
        className,
      )}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <ArrowUpRightIcon aria-hidden="true" ref={arrowIconRef} size={14} />
    </a>
  );
}
