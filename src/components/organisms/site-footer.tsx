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

  useEffect(() => {
    if (!socialNoticeOpen) return;

    const timeoutId = window.setTimeout(() => {
      setSocialNoticeOpen(false);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [socialNoticeOpen]);

  return (
    <footer className={cn("w-full bg-background-primary pb-6 pt-36", className)}>
      <div className="grid w-full grid-cols-1 border border-border-primary md:grid-cols-4">
        <div className="flex min-h-50 flex-col border-border-primary md:border-r">
          <div className="flex flex-1 flex-col p-4">
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
          className="border-border-primary md:border-r"
        >
          {footerNavigationItems.map((item, index) => (
            <ButtonSecondary
              className={cn(
                "w-full border-0",
                index !== footerNavigationItems.length - 1 &&
                  "border-b border-border-primary",
              )}
              href={item.href}
              icon="up"
              key={item.label}
            >
              {item.label}
            </ButtonSecondary>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-border-primary p-4 md:border-r">
          <p className="type-s-button-500 text-text-inactive-primary uppercase">
            Follow on
          </p>
          <div className="flex flex-col items-start gap-2">
            {socialLinks.map((link) => (
              <SocialLink
                href={link.href}
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

        <div className="flex min-h-50 items-end justify-end p-4">
          <p className="type-s-button-600 text-text-primary">
            Created & Designed By Amir Nasseri
          </p>
        </div>
      </div>

      <div className="flex justify-center overflow-hidden border-x border-b border-border-primary py-14">
        <p className="type-h1 whitespace-nowrap text-text-primary uppercase">
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
