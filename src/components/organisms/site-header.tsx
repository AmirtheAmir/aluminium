"use client";

import { useRef, useState } from "react";

import { Logo20 } from "@/assets/icons";
import { BrandMark } from "@/components/atoms/brand-mark";
import { ButtonSecondary } from "@/components/atoms/button-secondary";
import { NavLinks } from "@/components/molecules/nav-links";
import { MenuIcon, type MenuIconHandle } from "@/components/ui/menu";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  className?: string;
  onContactClick?: () => void;
}

export function SiteHeader({ className, onContactClick }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuIconRef = useRef<MenuIconHandle>(null);

  function handleMenuClick() {
    setIsMenuOpen((current) => {
      const next = !current;

      if (next) {
        menuIconRef.current?.startAnimation();
      } else {
        menuIconRef.current?.stopAnimation();
      }

      return next;
    });
  }

  function handleNavigate() {
    setIsMenuOpen(false);
    menuIconRef.current?.stopAnimation();
  }

  function handleContactClick() {
    handleNavigate();
    onContactClick?.();
  }

  return (
    <header
      className={cn(
        "sticky top-4 z-50 grid w-full border border-border-primary bg-background-primary lg:grid-cols-4",
        className,
      )}
    >
      <div className="grid grid-cols-[25%_75%] lg:contents">
        <BrandMark
          className=" border-0 border-r border-border-primary lg:col-span-1 lg:border-r"
          logo={Logo20}
          logoClassName=" w-auto lg:h-auto"
        />
        <div className="flex justify-end lg:hidden">
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            className={cn(
              "inline-flex cursor-pointer items-center justify-center p-3 text-text-primary transition-colors",
              isMenuOpen && "bg-background-inverse text-text-inverse",
            )}
            onClick={handleMenuClick}
            type="button"
          >
            <MenuIcon ref={menuIconRef} size={16} />
          </button>
        </div>
      </div>

      <NavLinks className="hidden lg:col-span-2 lg:flex" />
      <ButtonSecondary
        className="hidden border-0 lg:col-span-1 lg:inline-flex lg:border-l lg:border-border-primary"
        onClick={handleContactClick}
      />

      {isMenuOpen ? (
        <div className="grid grid-cols-1 border-t border-border-primary min-[460px]:grid-cols-[minmax(0,3fr)_minmax(max-content,2fr)] lg:hidden">
          <NavLinks
            className="min-w-0 justify-between gap-0 min-[460px]:justify-start"
            itemClassName="border-0 p-3"
            itemSize="compact"
            onNavigate={handleNavigate}
          />
          <ButtonSecondary
            className="w-full whitespace-nowrap border-0 border-t border-border-primary min-[460px]:w-auto min-[460px]:min-w-max min-[460px]:border-t-0 min-[460px]:border-l"
            iconSize={16}
            onClick={handleContactClick}
            size="compact"
          />
        </div>
      ) : null}
    </header>
  );
}
