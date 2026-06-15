import { NavButton } from "@/components/atoms/nav-button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "#process", label: "Process" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faqs", label: "FAQS" },
];

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  itemSize?: "compact" | "default";
  onNavigate?: () => void;
}

export function NavLinks({
  className,
  itemClassName,
  itemSize,
  onNavigate,
}: NavLinksProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn("flex w-full justify-center", className)}
    >
      {navigationItems.map((item) => (
        <NavButton
          className={itemClassName}
          href={item.href}
          key={item.label}
          onClick={onNavigate}
          size={itemSize}
        >
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
}
