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
      className="type-questionnaire-option flex cursor-pointer items-center gap-2 text-left text-text-primary min-[680px]:gap-3"
      onClick={onSelect}
      type="button"
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-4 border-2 border-text-primary transition-colors min-[680px]:size-5",
          selected && "bg-text-primary",
        )}
      />
      <span>{children}</span>
    </button>
  );
}
