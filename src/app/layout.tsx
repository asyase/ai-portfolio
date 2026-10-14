import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} | Portfolio`,
  authors: [{ name: site.name }],
  keywords: [
    "full-stack developer",
    "AI developer",
    "automation developer",
    "AI integrations",
    "n8n",
    "workflow automation",
    "Claude API",
    "Gemini",
    "Spring AI",
    "TypeScript",
    "React",
  ],
  openGraph: {
    type: "website",
    siteName: `${site.name} | Portfolio`,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fbf5f8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
