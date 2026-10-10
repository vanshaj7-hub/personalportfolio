"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Project inquiry — STITCH.DEV");
    const body = encodeURIComponent(
      email
        ? `From: ${email}\n\nI'd like to connect about a project.`
        : "I'd like to connect about a project.",
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 glow-contact border-b border-border-subtle/60 py-20 lg:py-28"
    >
      <div className="container-site mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          Let&apos;s build something exceptional together.
        </h2>
        <p className="mt-4 text-sm text-muted-variant sm:text-base">
          Available for select design engineering engagements and advisory
          work. Share your timeline and we&apos;ll connect.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <label className="sr-only" htmlFor="contact-email">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-11 flex-1 rounded-full border border-border-subtle bg-surface-low px-5 text-sm text-foreground placeholder:text-muted outline-none focus:border-tertiary/50"
          />
          <Button type="submit" className="shrink-0">
            Connect
            <span className="material-symbols-outlined text-lg" aria-hidden>
              arrow_forward
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
