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
}

export function NavLinks({ className }: NavLinksProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn("flex w-full justify-center", className)}
    >
      {navigationItems.map((item) => (
        <NavButton href={item.href} key={item.label}>
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
}
