import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/constants";

// NOTE: next/font/google (Inter) is used in production but can't fetch
// fonts.googleapis.com from this sandboxed build environment. Swap the
// import below back to `Inter` from "next/font/google" when building
// locally or deploying, where Google Fonts is reachable.
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Technology company building useful products`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-foreground selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
