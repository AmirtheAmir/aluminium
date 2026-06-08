import { Logo } from "@/assets/icons";
import { FooterSocialLink } from "@/components/atoms/footer-social-link";
import { SecondaryButton } from "@/components/atoms/secondary-button";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const footerNavigationItems = ["Process", "Use Cases", "Pricing", "FAQS"];

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "Official Site" },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full bg-background-primary pb-36 pt-16", className)}>
      <div className="grid w-full grid-cols-1 border border-border-primary md:grid-cols-4">
        <div className="flex min-h-50 flex-col border-border-primary md:border-r">
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center gap-2 text-text-primary">
              <Logo aria-hidden="true" />
              <p className="type-h4 uppercase">Aluminium</p>
            </div>
            <p className="type-s-body mt-4 text-text-secondary">
              Helps teams turn daily operations into clear, structured
              workflows.
            </p>
          </div>

          <SecondaryButton className="w-full border-0 border-t border-border-primary" />
        </div>

        <nav
          aria-label="Footer navigation"
          className="border-border-primary md:border-r"
        >
          {footerNavigationItems.map((item, index) => (
            <SecondaryButton
              className={cn(
                "w-full border-0",
                index !== footerNavigationItems.length - 1 &&
                  "border-b border-border-primary",
              )}
              key={item}
            >
              {item}
            </SecondaryButton>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-border-primary p-4 md:border-r">
          <p className="type-s-button text-text-inactive-primary uppercase">
            Follow on
          </p>
          <div className="flex flex-col items-start gap-2">
            {socialLinks.map((link) => (
              <FooterSocialLink href={link.href} key={link.label}>
                {link.label}
              </FooterSocialLink>
            ))}
          </div>
        </div>

        <div className="flex min-h-50 items-end justify-end p-4">
          <p className="type-s-button-strong text-text-primary">
            Created By Amir Nasseri
          </p>
        </div>
      </div>

      <div className="overflow-hidden border-x border-b border-border-primary py-14">
        <p className="type-h1 whitespace-nowrap text-text-primary uppercase">
          Aluminium
        </p>
      </div>
    </footer>
  );
}
