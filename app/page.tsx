import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Stack } from "@/components/sections/stack";
import { Background } from "@/components/sections/background";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Background />
        <Writing />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
