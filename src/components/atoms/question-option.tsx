"use client";

import { cn } from "@/lib/utils";

interface QuestionOptionProps {
  children: string;
  onSelect: () => void;
  selected: boolean;
}

export function QuestionOption({
  children,
  onSelect,
  selected,
}: QuestionOptionProps) {
  return (
    <button
      className="type-m-500 flex cursor-pointer items-center gap-3 text-left text-text-primary"
      onClick={onSelect}
      type="button"
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-5 border-2 border-text-primary transition-colors",
          selected && "bg-text-primary",
        )}
      />
      <span>{children}</span>
    </button>
  );
}
