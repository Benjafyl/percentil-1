import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";
import { getSiteUrl, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = getSiteUrl();

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl.toString(),
      name: siteConfig.name,
      inLanguage: siteConfig.language,
    },
    {
      "@type": "Course",
      "@id": `${siteUrl}#course`,
      name: "Mentoría Percentil1",
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      provider: {
        "@type": "Person",
        name: "Benjamín Page",
        url: siteConfig.instagram,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Benjamín Page", url: siteConfig.instagram }],
  creator: "Benjamín Page",
  publisher: siteConfig.name,
  keywords: [
    "Mentoría Percentil1",
    "Benjamín Page",
    "BPG Trading",
    "mentoría de trading",
    "trading Chile",
    "cuentas de fondeo",
    "gestión de riesgo",
    "psicología trading",
    "acción del precio",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon-48x48.png",
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mentoría Percentil1 de Benjamín Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: ["/twitter-image.png"],
  },
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${sora.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <script
          id="site-measurement-config"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ga4Id: process.env.NEXT_PUBLIC_SITE_GA4_ID || "G-7QK00F7YR6",
              clarityId: process.env.NEXT_PUBLIC_SITE_CLARITY_ID || "",
              hosts: ["percentil1.cl", "www.percentil1.cl"],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Script src="/site-measurement.js" strategy="afterInteractive" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
