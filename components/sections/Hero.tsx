import { heroMetrics, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { CrtHeroCanvas } from "@/components/sections/CrtHeroCanvas";

export function Hero() {
  return (
    <section className="border-b border-border-subtle/60 py-12 lg:py-20">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-tertiary/30 bg-tertiary/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-tertiary sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" aria-hidden />
            {site.tagline}
          </p>

          <h1 className="max-w-xl text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Crafting digital experiences at scale.
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted-variant">
            I build high-craft interfaces where design systems meet generative
            tooling—bridging enterprise token pipelines with GPU-driven 3D
            spatial experiences on the modern web.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#work">Explore Selected Work</Button>
            <Button href="#about" variant="secondary">
              About Philosophy
            </Button>
          </div>

          <div className="mt-2 flex flex-col gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-border-subtle">
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="sm:flex-1 sm:px-4 first:sm:pl-0 last:sm:pr-0"
              >
                <p className="font-mono text-sm font-medium text-foreground">
                  {metric.value}
                </p>
                <p className="text-xs text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <CrtHeroCanvas />
      </div>
    </section>
  );
}
