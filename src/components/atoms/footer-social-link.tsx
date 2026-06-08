"use client";

import { useRef } from "react";

import {
  ArrowUpRightIcon,
  type ArrowUpRightIconHandle,
} from "@/components/ui/arrow-up-right";
import { cn } from "@/lib/utils";

interface FooterSocialLinkProps {
  children: string;
  className?: string;
  href: string;
}

export function FooterSocialLink({
  children,
  className,
  href,
}: FooterSocialLinkProps) {
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <ArrowUpRightIcon aria-hidden="true" ref={arrowIconRef} size={14} />
    </a>
  );
}
