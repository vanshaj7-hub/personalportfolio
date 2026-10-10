export const site = {
  name: "PortfolioVanshaj",
  tagline: "Design Engineer & Systems Builder",
  email: "hello@portfolio.dev",
  copyright: "Portfolio — © 2024 Design & Code. All rights reserved.",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experiments", href: "#experiments" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroMetrics = [
  { value: "8+", label: "Years Crafting UIs" },
  { value: "100%", label: "Production Ready" },
  { value: "Three.js / React", label: "Specialist" },
] as const;

export const capabilities = [
  "Design Systems & Token Architecture",
  "Three.js & WebGL Real-time Graphics",
  "Generative AI UI Synthesis",
  "Fullstack TypeScript & React Architecture",
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
] as const;

export const experiments = [
  {
    title: "Shader Playground",
    summary: "Live GLSL node graph for CRT phosphor and scanline experiments.",
    tags: ["WebGL", "GLSL"],
  },
  {
    title: "Token Forge",
    summary: "Generative design-token pipeline with Figma ↔ code sync prototypes.",
    tags: ["Design Tokens", "TypeScript"],
  },
] as const;
