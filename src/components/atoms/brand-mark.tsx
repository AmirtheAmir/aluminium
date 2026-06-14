import { Logo } from "@/assets/icons";
import { ThemeSwitch } from "@/components/atoms/theme-switch";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
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
          <Logo aria-hidden="true" />
        </a>
        <ThemeSwitch size={14} />
      </div>
    </div>
  );
}
