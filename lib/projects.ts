export type Project = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "neo-tokyo-os",
    category: "01 / SYSTEM",
    title: "Neo-Tokyo OS",
    summary:
      "Enterprise design system with spatial navigation patterns and GPU-accelerated component previews.",
    tags: ["React", "Design Tokens", "TypeScript"],
    href: "#",
    image: "/projects/01-system.svg",
  },
  {
    slug: "aura-synth",
    category: "02 / 3D WEB",
    title: "Aura Synth",
    summary:
      "Immersive WebGL product configurator with real-time lighting and procedural material synthesis.",
    tags: ["Three.js", "WebGL", "GLSL Shaders"],
    href: "#",
    image: "/projects/02-3d-web.svg",
  },
  {
    slug: "quantum-workspace",
    category: "03 / WORKSPACE",
    title: "Quantum Workspace",
    summary:
      "Developer environment UI merging IDE ergonomics with tactile hardware-inspired controls.",
    tags: ["React", "TypeScript", "Radix"],
    href: "#",
    image: "/projects/03-workspace.svg",
  },
  {
    slug: "pipeline-forge",
    category: "04 / TOOLING",
    title: "Pipeline Forge",
    summary:
      "Internal tooling for automated UI regression, token diffing, and generative layout QA.",
    tags: ["Node.js", "Playwright", "AI"],
    href: "#",
    image: "/projects/04-tooling.svg",
  },
];
