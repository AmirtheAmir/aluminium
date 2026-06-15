"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import { AnimatePresence, motion } from "framer-motion";

import type { BillingPeriod } from "@/components/molecules/billing-toggle";
import type { PricingPlan } from "@/components/molecules/plan-card";
import { XIcon } from "@/components/ui/x";

interface CheckoutModalProps {
  onClose: () => void;
  open: boolean;
  period: BillingPeriod;
  plan: PricingPlan | null;
}

type CheckoutResponse = {
  clientSecret?: string;
  error?: string;
};

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : Promise.resolve(null);

export function CheckoutModal({
  onClose,
  open,
  period,
  plan,
}: CheckoutModalProps) {
  const checkoutContainerRef = useRef<HTMLDivElement>(null);
  const embeddedCheckoutRef = useRef<StripeEmbeddedCheckout | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    if (!plan) {
      throw new Error("Missing selected plan");
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        period,
        plan: plan.id,
      }),
    });
    const data = (await response.json()) as CheckoutResponse;

    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error ?? "Unable to start checkout");
    }

    return data.clientSecret;
  }, [period, plan]);

  const handleClose = useCallback(() => {
    setError("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, open]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const previousPageScrollLocked = document.body.dataset.pageScrollLocked;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.body.dataset.pageScrollLocked = "true";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      if (previousPageScrollLocked === undefined) {
        delete document.body.dataset.pageScrollLocked;
      } else {
        document.body.dataset.pageScrollLocked = previousPageScrollLocked;
      }

      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !plan) return;

    const checkoutContainer = checkoutContainerRef.current;

    if (!checkoutContainer) return;

    const checkoutContainerElement = checkoutContainer;

    let cancelled = false;

    async function mountCheckout() {
      setError("");
      setLoading(true);

      try {
        const stripe = await stripePromise;

        if (!stripe) {
          throw new Error("Missing Stripe publishable key");
        }

        const embeddedCheckout = await stripe.createEmbeddedCheckoutPage({
          fetchClientSecret,
        });

        if (cancelled) {
          embeddedCheckout.destroy();
          return;
        }

        embeddedCheckoutRef.current = embeddedCheckout;
        embeddedCheckout.mount(checkoutContainerElement);
      } catch (checkoutError) {
        if (!cancelled) {
          setError(
            checkoutError instanceof Error
              ? checkoutError.message
              : "Unable to start checkout",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    mountCheckout();

    return () => {
      cancelled = true;
      embeddedCheckoutRef.current?.destroy();
      embeddedCheckoutRef.current = null;
    };
  }, [fetchClientSecret, open, plan]);

  return (
    <AnimatePresence>
      {open && plan && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background-tinted p-6 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleClose}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <motion.section
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-modal="true"
            className="relative flex h-162 w-5/12 flex-col overflow-hidden rounded-none border border-border-primary bg-background-primary px-4 pb-4"
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              aria-label="Close checkout modal"
              className="absolute right-4 top-4 z-10 flex cursor-pointer items-center justify-center text-text-primary"
              onClick={handleClose}
              type="button"
            >
              <XIcon aria-hidden="true" size={18} />
            </button>

            <div
              className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain"
              data-native-scroll
            >
              {loading && (
                <p className="type-p text-text-primary">
                  Loading checkout...
                </p>
              )}

              {error && (
                <p className="type-p text-text-primary">{error}</p>
              )}

              <div
                className="rounded-none bg-background-primary"
                ref={checkoutContainerRef}
              />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
