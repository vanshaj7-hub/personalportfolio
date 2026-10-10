import Link from "next/link";
import { site, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8">
      <div className="container-site flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{site.copyright}</p>
        <nav className="flex flex-wrap gap-6" aria-label="Social">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
