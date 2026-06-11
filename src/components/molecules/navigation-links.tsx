import { NavigationButton } from "@/components/atoms/navigation-button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "#operations", label: "Operations" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faqs", label: "FAQS" },
];

interface NavigationLinksProps {
  className?: string;
}

export function NavigationLinks({ className }: NavigationLinksProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn("flex w-full justify-center", className)}
    >
      {navigationItems.map((item) => (
        <NavigationButton href={item.href} key={item.label}>
          {item.label}
        </NavigationButton>
      ))}
    </nav>
  );
}
