"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  LottieComponentProps,
  LottieRefCurrentProps,
} from "lottie-react";

import { replaceLottieShapeColors } from "@/lib/lottie-colors";
import { cn } from "@/lib/utils";

export type LottieAnimation = unknown;

const Lottie = dynamic<LottieComponentProps>(() => import("lottie-react"), {
  ssr: false,
});

const CSS_VARIABLE_PATTERN = /^var\((--[^,\s)]+)(?:,\s*([^)]+))?\)$/;

const FALLBACK_COLORS: Record<string, string> = {
  "--background-primary": "#e0e0e0",
  "--orange-850": "#f55f14",
  "--sand-dark-200": "#1f1f1f",
  "--sand-light-200": "#e0e0e0",
};

const DEFAULT_LOTTIE_THEME_COLORS = {
  fill: FALLBACK_COLORS["--background-primary"],
  stroke: FALLBACK_COLORS["--sand-dark-200"],
  theme: "light",
};

interface LottiePreviewProps {
  animationData: LottieAnimation;
  className?: string;
  speed?: number;
}

function getCurrentTheme() {
  const root = document.documentElement;

  if (root.dataset.theme === "orange" || root.classList.contains("orange")) {
    return "orange";
  }

  if (root.dataset.theme === "dark" || root.classList.contains("dark")) {
    return "dark";
  }

  return "light";
}

function resolveCssVariable(variableName: string, fallbackColor: string) {
  let color = `var(${variableName})`;
  const root = document.documentElement;
  const rootStyle = getComputedStyle(root);

  for (let depth = 0; depth < 5; depth++) {
    const match = CSS_VARIABLE_PATTERN.exec(color.trim());

    if (!match) {
      return color.trim() || fallbackColor;
    }

    color =
      rootStyle.getPropertyValue(match[1]).trim() ||
      FALLBACK_COLORS[match[1]] ||
      match[2]?.trim() ||
      fallbackColor;
  }

  return color.trim() || fallbackColor;
}

function getLottieThemeColors() {
  const theme = getCurrentTheme();
  const strokeVariable =
    theme === "dark" ? "--sand-light-200" : "--sand-dark-200";

  return {
    fill: resolveCssVariable(
      "--background-primary",
      DEFAULT_LOTTIE_THEME_COLORS.fill,
    ),
    stroke: resolveCssVariable(
      strokeVariable,
      FALLBACK_COLORS[strokeVariable],
    ),
    theme,
  };
}

function areThemeColorsEqual(
  current: typeof DEFAULT_LOTTIE_THEME_COLORS,
  next: typeof DEFAULT_LOTTIE_THEME_COLORS,
) {
  return (
    current.fill === next.fill &&
    current.stroke === next.stroke &&
    current.theme === next.theme
  );
}

export function LottiePreview({
  animationData,
  className,
  speed = 0.3,
}: LottiePreviewProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [themeColors, setThemeColors] = useState(DEFAULT_LOTTIE_THEME_COLORS);
  const themedAnimationData = useMemo(
    () => replaceLottieShapeColors(animationData, themeColors),
    [animationData, themeColors],
  );

  const applySpeed = useCallback(() => {
    lottieRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    function syncThemeColors() {
      const nextThemeColors = getLottieThemeColors();

      setThemeColors((currentThemeColors) =>
        areThemeColorsEqual(currentThemeColors, nextThemeColors)
          ? currentThemeColors
          : nextThemeColors,
      );
    }

    syncThemeColors();

    const observer = new MutationObserver(syncThemeColors);

    observer.observe(document.documentElement, {
      attributeFilter: ["class", "data-theme"],
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    applySpeed();

    const frameId = requestAnimationFrame(applySpeed);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [themedAnimationData, applySpeed]);

  return (
    <div
      className={cn(
        "flex h-44 w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <Lottie
        animationData={themedAnimationData}
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
