import { capabilities } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border-subtle/60 py-16 lg:py-24"
    >
      <div className="container-site">
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-low lg:grid lg:grid-cols-2">
          <div className="p-8 lg:p-12">
            <SectionLabel>About the Creator</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
              Engineering tools where software feels like hardware.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-variant sm:text-base">
              <p>
                I operate at the intersection of design engineering and systems
                architecture—translating brand intent into scalable token
                pipelines while prototyping the spatial interfaces that make
                products memorable.
              </p>
              <p>
                From WebGL-driven product stories to generative UI synthesis,
                my work prioritizes production readiness: accessible contrast,
                performance budgets, and craft that holds up under enterprise
                scale.
              </p>
            </div>
          </div>

          <div className="border-t border-border-subtle bg-surface-high p-8 lg:border-t-0 lg:border-l lg:p-12">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Core Capabilities
            </h3>
            <ul className="mt-6 space-y-4">
              {capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm sm:text-base">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-tertiary"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
