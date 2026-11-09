import { ShinyButton } from "@/components/ui/shiny-button";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[100svh] flex-col items-start justify-center gap-6">
      <p className="eyebrow">
        <span className="eyebrow-index">404</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        Page not found
      </p>
      <h1 className="h-section max-w-[16ch]">This page doesn&apos;t exist.</h1>
      <ShinyButton href="/" arrow>
        Go to the homepage
      </ShinyButton>
    </main>
  );
}
