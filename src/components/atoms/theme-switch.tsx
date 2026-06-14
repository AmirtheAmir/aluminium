"use client";

import { useEffect, useRef } from "react";

import {
  ContrastIcon,
  type ContrastIconHandle,
} from "@/components/ui/contrast";

type Theme = "light" | "dark" | "blue";

const THEME_STORAGE_KEY = "aluminium-theme";

const themeCycles: Record<Theme, Theme[]> = {
  light: ["light", "dark", "blue"],
  dark: ["dark", "light", "blue"],
  blue: ["blue", "light", "dark"],
};

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return theme === "dark" || theme === "blue" || theme === "light"
    ? theme
    : null;
}

function getCurrentTheme(): Theme {
  const root = document.documentElement;

  if (root.classList.contains("blue")) return "blue";
  if (root.classList.contains("dark")) return "dark";

  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("blue", theme === "blue");
  root.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

interface ThemeSwitchProps {
  size?: number;
}

export function ThemeSwitch({ size = 12 }: ThemeSwitchProps) {
  const iconRef = useRef<ContrastIconHandle>(null);
  const cycleRef = useRef<Theme[]>(themeCycles.light);
  const themeRef = useRef<Theme>("light");

  useEffect(() => {
    const initialTheme = getStoredTheme() ?? getCurrentTheme();

    themeRef.current = initialTheme;
    cycleRef.current = themeCycles[initialTheme];
    applyTheme(initialTheme);
  }, []);

  function handleClick() {
    const cycle = cycleRef.current;
    const currentIndex = cycle.indexOf(themeRef.current);
    const nextTheme = cycle[(currentIndex + 1) % cycle.length];

    themeRef.current = nextTheme;
    applyTheme(nextTheme);
    iconRef.current?.startAnimation();
  }

  return (
    <button
      aria-label="Switch color theme"
      className="inline-flex cursor-pointer items-center justify-center text-text-primary"
      onClick={handleClick}
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      type="button"
    >
      <ContrastIcon aria-hidden="true" ref={iconRef} size={size} />
    </button>
  );
}
