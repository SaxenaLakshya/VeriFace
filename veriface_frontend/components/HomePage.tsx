"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import DemoSection from "@/components/DemoSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openSignIn = useCallback(() => {
    setAuthMode("signin");
    setAuthOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setAuthMode("signup");
    setAuthOpen(true);
  }, []);

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Background orbs */}
      <div className="orb orb-cyan" />
      <div className="orb orb-purple" />
      <div className="orb orb-blue" />

      <Navbar onSignIn={openSignIn} onSignUp={openSignUp} />
      <Hero onTryScan={scrollToDemo} onCreateAccount={openSignUp} />
      <Marquee />
      <DemoSection onSaveHistory={openSignUp} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTAStrip onCreateAccount={openSignUp} onTryDemo={scrollToDemo} />
      <Footer />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitch={() =>
          setAuthMode(authMode === "signin" ? "signup" : "signin")
        }
      />
    </>
  );
}
