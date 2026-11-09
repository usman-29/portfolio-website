import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  className?: string;
};

/** The one heading pattern every section uses: "01 / Label", then the h2, then an optional intro. */
export function SectionHeading({ index, label, title, intro, id, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {label}
      </p>
      <h2 id={id} className="h-section mt-5 max-w-[18ch]">
        {title}
      </h2>
      {intro ? <p className="lead mt-5">{intro}</p> : null}
    </header>
  );
}
