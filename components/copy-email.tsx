"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-mono text-[0.75rem] tracking-[0.1em] text-ink-2 uppercase transition-colors duration-300 hover:border-signal hover:text-ink active:translate-y-px"
    >
      {copied ? (
        <Check className="size-4 text-signal" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
