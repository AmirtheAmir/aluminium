import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  children: ReactNode;
  className?: string;
}

export function NavigationButton({
  children,
  className,
}: NavigationButtonProps) {
  return (
    <button
      className={cn(
        "type-s-button inline-flex min-h-13 items-center justify-center bg-background-primary p-4 text-text-primary transition-colors hover:bg-background-inverse hover:text-text-inverse",
        className
      )}
      type="button"
    >
      {children}
    </button>
  );
}
