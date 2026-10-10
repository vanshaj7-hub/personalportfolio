import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Experiments } from "@/components/sections/Experiments";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface-high focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main className="flex-1">
        <Hero />
        <SelectedProjects />
        <Experiments />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
