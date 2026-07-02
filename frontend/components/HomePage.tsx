"use client";

import { useCallback } from "react";
import { useUser } from "@clerk/nextjs";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import DemoSection from "@/components/DemoSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
    const { isSignedIn } = useUser();

    const scrollToDemo = useCallback(() => {
        document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <>
            {/* Background orbs */}
            <div className="orb orb-cyan" />
            <div className="orb orb-purple" />
            <div className="orb orb-blue" />

            <Hero />
            <Marquee />

            {/* Show DemoSection only when the user is NOT signed in */}
            {!isSignedIn && <DemoSection />}

            <Features />
            <HowItWorks />
            <Testimonials />
        </>
    );
}