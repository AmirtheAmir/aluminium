"use client";

import type { HTMLInputTypeAttribute } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface FormInputProps {
  className?: string;
  error?: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  value: string;
}

export function FormInput({
  className,
  error,
  multiline = false,
  onChange,
  placeholder,
  type = "text",
  value,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const classNames = cn(
    "type-p-body w-full border border-x-0 border-t-0 bg-transparent relative p-4 outline-none transition-colors placeholder:text-text-secondary",
    active
      ? "border-border-secondary text-text-primary"
      : "border-border-primary text-text-secondary",
    multiline && "min-h-28 resize-none border-x border-t align-top",
    className,
  );
  const errorElement = error ? (
    <p className="type-xs-button absolute left-0 -bottom-5 text-text-tertiary">
      {error}
    </p>
  ) : null;

  if (multiline) {
    return (
      <div className="relative">
        <textarea
          aria-invalid={Boolean(error)}
          className={classNames}
          onBlur={() => setFocused(false)}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          value={value}
        />
        {errorElement}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        aria-invalid={Boolean(error)}
        className={classNames}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {errorElement}
    </div>
  );
}
