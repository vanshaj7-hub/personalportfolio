import Link from "next/link";
import { navLinks } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm text-muted-variant md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="#contact" variant="ghost" className="text-xs sm:text-sm">
          Get in Touch
        </Button>
      </div>
    </header>
  );
}
