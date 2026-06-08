"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef } from "react";
import type {
  LottieComponentProps,
  LottieRefCurrentProps,
} from "lottie-react";

import { cn } from "@/lib/utils";

export type LottieAnimation = unknown;

const Lottie = dynamic<LottieComponentProps>(() => import("lottie-react"), {
  ssr: false,
});

interface LottiePreviewProps {
  animationData: LottieAnimation;
  className?: string;
  speed?: number;
}

export function LottiePreview({
  animationData,
  className,
  speed = 0.2,
}: LottiePreviewProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const applySpeed = useCallback(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    applySpeed();

    const frameId = requestAnimationFrame(applySpeed);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [animationData, applySpeed]);

  return (
    <div
      className={cn(
        "flex h-44 w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <Lottie
        animationData={animationData}
        autoplay
        className="h-full w-full"
        lottieRef={lottieRef}
        loop
        onDOMLoaded={applySpeed}
        onDataReady={applySpeed}
      />
    </div>
  );
}
