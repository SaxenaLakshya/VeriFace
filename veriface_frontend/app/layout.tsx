import type { Metadata } from "next";
import { Orbitron, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600"] as const,
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeriFace — AI Image Detection",
  description:
    "Upload any image. VeriFace's ML model detects pixel patterns, frequency artifacts, and generation signatures to deliver a definitive AI vs. Real verdict in under 2 seconds.",
  openGraph: {
    title: "VeriFace — AI Image Detection",
    description: "Is it real or AI-generated? Find out in under 2 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${spaceMono.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
