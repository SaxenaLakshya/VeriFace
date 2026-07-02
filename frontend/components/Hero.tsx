"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, SignInButton, useUser } from "@clerk/nextjs";

const stats = [
    { num: "99.2%", label: "Detection Accuracy" },
    { num: "10K+", label: "Verified Images" },
    { num: "<2s", label: "Scan Speed" },
    { num: "50+", label: "AI Models Detected" },
];

export default function Hero() {
    const { isSignedIn } = useUser();

    return (
        <section
            id="try-it"
            className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-[120px] pb-12 sm:pb-20 px-4 sm:px-8"
        >
            {/* Badge */}
            <div className="animate-fade-up delay-1 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 pl-2 bg-[hsl(185,100%,50%,0.06)] border border-[hsl(185,100%,50%,0.15)] rounded-full font-space text-[0.65rem] sm:text-xs text-[hsl(185,100%,50%,0.8)] mb-5 sm:mb-7 text-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[hsl(120,100%,54%)] rounded-full shadow-[0_0_8px_hsl(120,100%,54%)] animate-blink shrink-0" />
                <span className="whitespace-nowrap">VeriFace — v1.1.2 Live</span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-2 font-orbitron font-black text-[clamp(2.5rem,14vw,7.5rem)] leading-[0.95] text-center tracking-tight mb-5 sm:mb-7 px-2">
                IS IT
                <br />
                <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_60px_hsl(185,100%,50%,0.4)]">
                    REAL
                </span>
                <br />
                <span className="text-foreground/40">…OR </span>
                <span className="text-[hsl(290,70%,50%)] drop-shadow-[0_0_60px_hsl(290,70%,50%,0.4)]">
                    AI?
                </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-up delay-3 text-center max-w-[560px] text-muted-foreground text-[0.9rem] sm:text-[1.05rem] leading-[1.6] sm:leading-[1.75] mb-8 sm:mb-11 font-light px-2">
                Upload any image. In under two seconds, VeriFace&apos;s custom ML model
                scans pixel patterns, frequency artifacts, and generation signatures to
                deliver a definitive verdict.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3 sm:gap-3.5 justify-center w-full max-w-xs sm:max-w-none mb-12 sm:mb-[72px]">

                {/* Try Scan */}
                {!isSignedIn ? (
                    <SignInButton mode="modal">
                        <Button variant="hero" size="lg" className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base">
                            TRY FREE SCAN →
                        </Button>
                    </SignInButton>
                ) : (
                    <Button
                        variant="hero"
                        size="lg"
                        className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base"
                        onClick={() => (window.location.href = "/dashboard")}
                    >
                        TRY FREE SCAN →
                    </Button>
                )}

                {/* Create Account */}
                {!isSignedIn && (
                    <SignUpButton mode="modal">
                        <Button variant="heroGhost" size="lg" className="w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 text-sm sm:text-base">
                            Create Account
                        </Button>
                    </SignUpButton>
                )}
            </div>

            {/* Stats */}
            <div className="animate-fade-up delay-4 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-y-6 w-full max-w-sm sm:max-w-none sm:gap-y-0">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`px-3 sm:px-12 text-center
              ${i % 2 === 0 ? "border-r border-[hsl(0,0%,100%,0.07)]" : ""}
              ${i < stats.length - 1 ? "sm:border-r" : "sm:border-r-0"}
            `}
                    >
                        <div className="font-orbitron text-[1.6rem] sm:text-[2.2rem] font-black leading-none">
                            {stat.num}
                        </div>
                        <div className="font-space text-[0.6rem] sm:text-[0.65rem] text-muted-foreground mt-1.5 tracking-[0.1em] sm:tracking-[0.12em] uppercase">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}