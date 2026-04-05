import type { Metadata } from "next";
import { Orbitron, Space_Mono, Syne } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: "hsl(185, 100%, 45%)",
                    colorText: "#0f172a",
                    colorTextSecondary: "#475569",
                    colorBackground: "#f8fafc",
                    colorInputBackground: "#ffffff",
                    colorInputText: "#0f172a",
                },

                elements: {
                    card:
                        "bg-gradient-to-br from-[hsla(185,100%,50%,0.08)] to-[hsla(290,70%,50%,0.08)] border border-[hsla(185,100%,50%,0.15)] shadow-xl rounded-[28px]",
                    headerTitle: "text-slate-900 font-orbitron font-black",
                    headerSubtitle: "text-slate-600",
                    formFieldLabel: "text-slate-700",
                    formFieldInput:
                        "bg-white border border-slate-200 text-slate-900 focus:border-[hsl(185,100%,50%)] focus:ring-[hsl(185,100%,50%)]",
                    formButtonPrimary:
                        "bg-[hsl(185,100%,50%)] text-black hover:bg-[hsl(185,100%,45%)] font-semibold",
                    formButtonSecondary:
                        "border border-[hsla(185,100%,50%,0.3)] text-slate-700 hover:bg-[hsla(185,100%,50%,0.08)]",
                    footerActionLink:
                        "text-[hsl(185,100%,45%)] hover:text-[hsl(290,70%,50%)]",
                },
            }}
        >
            <html lang="en" className="dark">
                <body className={`${orbitron.variable} ${spaceMono.variable} ${syne.variable} antialiased`}>
                    <Navbar />
                    {children}
                    <Footer />
                </body>
            </html>
        </ClerkProvider>
    );
}
