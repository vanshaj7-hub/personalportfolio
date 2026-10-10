import { experiments } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";

export function Experiments() {
  return (
    <section
      id="experiments"
      className="scroll-mt-20 border-b border-border-subtle/60 py-16 lg:py-20"
    >
      <div className="container-site">
        <div className="mb-8 max-w-2xl">
          <SectionLabel>Lab Notes</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Experiments
          </h2>
          <p className="mt-3 text-sm text-muted-variant">
            Prototypes and spatial UI explorations—case studies and sandboxes
            arriving in Phase 2.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {experiments.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border-subtle bg-surface-low p-5"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-variant">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
