"use client";

import { useEffect } from "react";
import {
  animate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

const SPRING_CONFIG = {
  damping: 45,
  mass: 0.8,
  restDelta: 0.5,
  stiffness: 180,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMaxScrollY() {
  return Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );
}

function getWheelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 16;
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }

  return event.deltaY;
}

function canScrollElement(element: Element, deltaY: number) {
  const style = window.getComputedStyle(element);
  const hasScrollableOverflow =
    style.overflowY === "auto" ||
    style.overflowY === "scroll" ||
    style.overflowY === "overlay";

  if (!hasScrollableOverflow || element.scrollHeight <= element.clientHeight) {
    return false;
  }

  if (deltaY > 0) {
    return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  }

  return element.scrollTop > 1;
}

function shouldUseNativeScroll(event: WheelEvent) {
  if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    return true;
  }

  let element =
    event.target instanceof Element ? event.target : null;
  const nativeScrollElement = element?.closest("[data-native-scroll]");

  if (nativeScrollElement) {
    return canScrollElement(nativeScrollElement, event.deltaY);
  }

  while (
    element &&
    element !== document.body &&
    element !== document.documentElement
  ) {
    if (canScrollElement(element, event.deltaY)) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

function getNativeScrollElement(event: WheelEvent) {
  const element = event.target instanceof Element ? event.target : null;

  return element?.closest("[data-native-scroll]") ?? null;
}

export function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let targetScrollY = window.scrollY;
    let isAnimating = false;
    let scrollAnimation: AnimationPlaybackControls | null = null;

    function stopScrollAnimation() {
      scrollAnimation?.stop();
      scrollAnimation = null;
      isAnimating = false;
    }

    function handleWheel(event: WheelEvent) {
      const deltaY = getWheelDelta(event);
      const nativeScrollElement = getNativeScrollElement(event);

      if (document.body.dataset.pageScrollLocked === "true") {
        if (nativeScrollElement && canScrollElement(nativeScrollElement, deltaY)) {
          return;
        }

        event.preventDefault();
        stopScrollAnimation();
        targetScrollY = window.scrollY;
        return;
      }

      if (shouldUseNativeScroll(event) || deltaY === 0) {
        return;
      }

      event.preventDefault();

      targetScrollY = clamp(targetScrollY + deltaY, 0, getMaxScrollY());

      scrollAnimation?.stop();
      isAnimating = true;
      scrollAnimation = animate(window.scrollY, targetScrollY, {
        ...SPRING_CONFIG,
        type: "spring",
        onUpdate: (value) => {
          window.scrollTo(0, value);
        },
        onComplete: () => {
          isAnimating = false;
          targetScrollY = window.scrollY;
        },
      });
    }

    function handleScroll() {
      if (!isAnimating) {
        targetScrollY = window.scrollY;
      }
    }

    function handleResize() {
      targetScrollY = clamp(targetScrollY, 0, getMaxScrollY());
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      stopScrollAnimation();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldReduceMotion]);

  return null;
}
