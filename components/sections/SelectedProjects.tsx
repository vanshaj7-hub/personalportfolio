import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";

export function SelectedProjects() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-b border-border-subtle/60 py-16 lg:py-24"
    >
      <div className="container-site">
        <div className="mb-10 max-w-2xl">
          <SectionLabel>Portfolio Highlights</SectionLabel>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Selected Projects
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-low transition-colors hover:border-tertiary/40"
              >
                <div className="border-b border-border-subtle px-4 py-3">
                  <span className="font-mono text-xs text-tertiary">
                    {project.category}
                  </span>
                </div>
                <div className="relative aspect-video w-full bg-surface-high">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {project.title}
                    <span
                      className="material-symbols-outlined text-base text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tertiary"
                      aria-hidden
                    >
                      arrow_outward
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-variant">
                    {project.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
