import type { ComponentType, SVGProps } from "react";

import { Logo } from "@/assets/icons";
import { ThemeSwitch } from "@/components/atoms/theme-switch";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  logo?: ComponentType<SVGProps<SVGSVGElement>>;
  logoClassName?: string;
  switchSize?: number;
}

export function BrandMark({
  className,
  logo: LogoComponent = Logo,
  logoClassName,
  switchSize = 14,
}: BrandMarkProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-border-primary bg-background-primary text-text-primary",
        className,
      )}
    >
      <div className="flex items-end gap-2">
        <a
          aria-label="Go to top"
          className="inline-flex cursor-pointer items-center justify-center"
          href="#top"
        >
          <LogoComponent aria-hidden="true" className={logoClassName} />
        </a>
        <ThemeSwitch size={switchSize} />
      </div>
    </div>
  );
}
