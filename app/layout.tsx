import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

// Display: characterful grotesque for headings. Body: IBM Plex Sans for long reading.
// Code labels: IBM Plex Mono. (Deliberately not Inter/Montserrat: see docs/03-design-direction.md.)
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const code = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Set NEXT_PUBLIC_SITE_URL to your domain; on Vercel the production URL is picked up automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${site.name}: ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.description,
  authors: [{ name: site.name, url: site.links.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

// Structured data for search engines. No phone number, by design.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  alumniOf: "Bahria University Islamabad",
  sameAs: [site.links.github, site.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${code.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-signal px-5 py-3 font-medium text-[var(--accent-ink)] transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
