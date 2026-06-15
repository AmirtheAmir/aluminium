"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/assets/icons";
import { SocialLink } from "@/components/atoms/social-link";
import { ButtonSecondary } from "@/components/atoms/button-secondary";
import { cn } from "@/lib/utils";

interface SiteFooterProps {
  className?: string;
  onContactClick?: () => void;
}

const footerNavigationItems = [
  { href: "#process", label: "PROCESS" },
  { href: "#use-cases", label: "USE CASES" },
  { href: "#workflow", label: "WORKFLOW" },
  { href: "#pricing", label: "PRICING" },
  { href: "#faqs", label: "FAQS" },
];

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "Twitter (X)" },
];

export function SiteFooter({ className }: SiteFooterProps) {
  const [socialNoticeOpen, setSocialNoticeOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    if (!socialNoticeOpen) return;

    const timeoutId = window.setTimeout(() => {
      setSocialNoticeOpen(false);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [socialNoticeOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    function updateCompactState() {
      setIsCompact(mediaQuery.matches);
    }

    updateCompactState();
    mediaQuery.addEventListener("change", updateCompactState);

    return () => {
      mediaQuery.removeEventListener("change", updateCompactState);
    };
  }, []);

  return (
    <footer className={cn("w-full bg-background-primary pb-6 pt-36", className)}>
      <div className="grid w-full grid-cols-1 border border-border-primary min-[460px]:grid-cols-2 lg:grid-cols-4">
        <div className="order-1 flex min-h-50 flex-col border-border-primary min-[460px]:border-r lg:border-r">
          <div className="flex flex-1 flex-col p-3 lg:p-4">
            <div className="flex items-center gap-2 text-text-primary">
              <Logo aria-hidden="true" />
              <p className="type-h4 uppercase">Aluminium</p>
            </div>
            <p className="type-s-body-500 mt-4 text-text-secondary">
              Helps teams turn daily operations into clear, structured
              workflows.
            </p>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="order-2 border-border-primary min-[460px]:border-r-0 lg:border-r"
        >
          {footerNavigationItems.map((item, index) => (
            <ButtonSecondary
              className={cn(
                "type-footer-button w-full border-0 p-3 lg:px-7 lg:py-4",
                index === 0 && "max-[459px]:border-t max-[459px]:border-border-primary",
                index !== footerNavigationItems.length - 1 &&
                  "border-b border-border-primary",
                index === footerNavigationItems.length - 1 &&
                  "max-[459px]:border-b max-[459px]:border-border-primary",
              )}
              href={item.href}
              icon="up"
              iconSize={isCompact ? 16 : 18}
              key={item.label}
            >
              {item.label}
            </ButtonSecondary>
          ))}
        </nav>

        <div className="order-4 flex flex-col gap-3 border-border-primary border-t p-3 min-[460px]:border-t lg:order-3 lg:gap-4 lg:border-t-0 lg:border-r lg:p-4">
          <p className="type-footer-follow text-text-inactive-primary uppercase">
            Follow on
          </p>
          <div className="flex flex-col items-start gap-1 lg:gap-2">
            {socialLinks.map((link) => (
              <SocialLink
                className="type-footer-social gap-1 lg:gap-2"
                href={link.href}
                iconSize={isCompact ? 14 : 16}
                key={link.label}
                onClick={(event) => {
                  event.preventDefault();
                  setSocialNoticeOpen(true);
                }}
              >
                {link.label}
              </SocialLink>
            ))}
          </div>
        </div>

        <div className="order-3 flex min-h-50 items-end justify-end border-border-primary p-3 min-[460px]:border-r min-[460px]:border-t lg:order-4 lg:border-r-0 lg:border-t-0 lg:p-4">
          <p className="type-s-button-600 text-text-primary">
            Created & Designed By Amir Nasseri
          </p>
        </div>
      </div>

      <div className="flex justify-center overflow-hidden border-x border-b border-border-primary py-4 lg:py-14">
        <p className="type-footer-word whitespace-nowrap text-text-primary uppercase">
          Aluminium
        </p>
      </div>

      {socialNoticeOpen && (
        <div className="fixed bottom-6 right-6 z-100 flex h-49 w-3/12 items-center justify-center bg-background-inverse p-4">
          <p className="type-m-body-500 max-w-64 text-text-inverse">
            The social links have yet to be connected
          </p>
        </div>
      )}
    </footer>
  );
}
