import type { Metadata, Viewport } from "next";
import "./globals.css";
import SWRegister from "./components/SWRegister";

const siteUrl = "https://viajes-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "My Travel · Inglaterra, Irlanda & Escocia (Mayo 2027)",
  description:
    "Itinerario de viaje de 24 días por las Islas Británicas. Londres, Irlanda salvaje y Highlands escocesas. Mayo 2027.",
  applicationName: "My Travel",
  appleWebApp: {
    capable: true,
    title: "My Travel",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "My Travel · Inglaterra, Irlanda & Escocia",
    description:
      "Tres semanas por las Islas Británicas: Londres, Irlanda y Escocia. Mayo 2027.",
    url: siteUrl,
    siteName: "My Travel",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Travel · Inglaterra, Irlanda & Escocia",
    description: "Itinerario de 24 días por las Islas Británicas, mayo 2027.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c84c2a" },
    { media: "(prefers-color-scheme: dark)", color: "#16201d" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="My Travel" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        {children}
        <SWRegister />
      </body>
    </html>
  );
}
