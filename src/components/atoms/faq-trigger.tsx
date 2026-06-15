"use client";

import { useEffect, useRef, useState } from "react";

import {
  PlusIcon,
  type PlusIconHandle,
} from "@/components/ui/plus";
import { XIcon, type XIconHandle } from "@/components/ui/x";
import { cn } from "@/lib/utils";

interface FaqTriggerProps {
  answer: string;
  className?: string;
  question: string;
}

export function FaqTrigger({
  answer,
  className,
  question,
}: FaqTriggerProps) {
  const [open, setOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const plusIconRef = useRef<PlusIconHandle>(null);
  const xIconRef = useRef<XIconHandle>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    function updateIconSize() {
      setIsCompact(mediaQuery.matches);
    }

    updateIconSize();
    mediaQuery.addEventListener("change", updateIconSize);

    return () => {
      mediaQuery.removeEventListener("change", updateIconSize);
    };
  }, []);

  function startIconAnimation() {
    if (open) {
      xIconRef.current?.startAnimation();
      return;
    }

    plusIconRef.current?.startAnimation();
  }

  function stopIconAnimation() {
    if (open) {
      xIconRef.current?.stopAnimation();
      return;
    }

    plusIconRef.current?.stopAnimation();
  }

  return (
    <article
      className={cn(
        "border border-border-primary bg-background-primary p-3 text-text-primary lg:p-4",
        className,
      )}
      data-open={open ? "true" : "false"}
      onMouseEnter={startIconAnimation}
      onMouseLeave={stopIconAnimation}
    >
      <button
        aria-expanded={open}
        className="flex w-full cursor-pointer items-start justify-between gap-3 text-left"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        type="button"
      >
        <span className="type-faq-question">{question}</span>
        {open ? (
          <XIcon aria-hidden="true" ref={xIconRef} size={isCompact ? 26 : 28} />
        ) : (
          <PlusIcon
            aria-hidden="true"
            ref={plusIconRef}
            size={isCompact ? 26 : 28}
          />
        )}
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="type-m-body-500 mt-3 text-text-primary">{answer}</p>
        </div>
      </div>
    </article>
  );
}
