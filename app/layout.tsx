import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://viajes-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Three Weeks · Inglaterra, Irlanda & Escocia (Mayo 2027)",
  description:
    "Itinerario de viaje de 3 semanas por las Islas Británicas. Londres, Irlanda salvaje y Highlands escocesas. Mayo 2027.",
  openGraph: {
    title: "Three Weeks · Inglaterra, Irlanda & Escocia",
    description:
      "Tres semanas por las Islas Británicas: Londres, Irlanda y Escocia. Mayo 2027.",
    url: siteUrl,
    siteName: "Three Weeks",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Three Weeks · Inglaterra, Irlanda & Escocia",
    description: "Itinerario de 3 semanas por las Islas Británicas, mayo 2027.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
