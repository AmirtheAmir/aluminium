"use client";

import type { ComponentType, SVGProps } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface ProcessPreviewProps {
  label: string;
  Illustration: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ProcessPreview({ label, Illustration }: ProcessPreviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="hidden w-1/2 flex-col gap-3 border border-border-primary px-3 pb-8 pt-3 min-[780px]:flex lg:gap-4 lg:px-4 lg:pb-12 lg:pt-4">
      <p className="type-process-label text-text-secondary">{label}</p>

      <div className="relative flex h-109 w-full items-center justify-center overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.98,
              y: shouldReduceMotion ? 0 : -16,
            }}
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.98,
              y: shouldReduceMotion ? 0 : 16,
            }}
            key={label}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <Illustration
              aria-hidden="true"
              className="h-auto max-h-full max-w-full text-text-primary"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
