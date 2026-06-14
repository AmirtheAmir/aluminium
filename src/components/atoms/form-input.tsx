"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface FormInputProps {
  className?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

export function FormInput({
  className,
  multiline = false,
  onChange,
  placeholder,
  value,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const classNames = cn(
    "type-p-body w-full border border-x-0 border-t-0 bg-transparent p-4 outline-none transition-colors placeholder:text-text-secondary",
    active ? "border-border-secondary text-text-primary" : "border-border-primary text-text-secondary",
    multiline && "min-h-28 resize-none border-x border-t align-top",
    className,
  );

  if (multiline) {
    return (
      <textarea
        className={classNames}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        value={value}
      />
    );
  }

  return (
    <input
      className={classNames}
      onBlur={() => setFocused(false)}
      onChange={(event) => onChange(event.target.value)}
      onFocus={() => setFocused(true)}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
}
