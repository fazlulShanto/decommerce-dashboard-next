import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Decommerce Bot Dashboard",
  description:
    "Your Complete Discord eCommerce Solution. Everything you need to sell in Discord.",
  keywords:
    "discord bot, ecommerce, discord shop, discord store, selling on discord",
  authors: [{ name: "Fazlul Hoque" }],
  creator: "Fazlul Hoque",
  publisher: "Fazlul Hoque",
  metadataBase: new URL("https://decommerce-dashboard.vercel.app"), // Replace with your actual domain
  icons: {
    icon: "/icon-256.png",
    shortcut: "/icon-256.png",
    apple: "/icon-256.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/icon-256.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "256x256",
        url: "/icon-256.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Decommerce Bot Dashboard",
    description:
      "Your Complete Discord eCommerce Solution. Everything you need to sell in Discord.",
    url: "https://decommerce-dashboard.vercel.app", // Replace with your actual domain
    siteName: "Decommerce",
    images: [
      {
        url: "/icon-256.png", // Create and add this image to your public folder
        width: 256,
        height: 256,
        alt: "Decommerce Bot Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decommerce Bot Dashboard",
    description:
      "Your Complete Discord eCommerce Solution. Everything you need to sell in Discord.",
    images: ["/icon-256.png"], // Create and add this image to your public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
