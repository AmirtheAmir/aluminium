import { Logo } from "@/assets/icons";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-border-primary bg-background-primary text-text-primary",
        className,
      )}
    >
      <div className="flex items-end gap-2">
        <Logo aria-hidden="true" />
        <ThemeToggle size={14} />
      </div>
    </div>
  );
}
