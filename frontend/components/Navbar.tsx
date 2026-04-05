"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const LogoIcon = () => (
  <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[hsl(185,100%,50%)] to-[hsl(210,100%,50%)] flex items-center justify-center flex-shrink-0">
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      className="text-black"
    >
      <path d="M9 12l2 2 4-4" />
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();

  const navLinks = [
    { label: "Scan", href: "/scan" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how" },
    { label: "Reviews", href: "/reviews" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] bg-[hsl(240,40%,3%,0.75)] backdrop-blur-xl border-b border-[hsl(0,0%,100%,0.07)]">
      <div className="max-w-[1280px] mx-auto px-8 h-[68px] flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <LogoIcon />
          <span className="font-orbitron font-black text-[1.1rem] tracking-wide text-foreground">
            VERI
            <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_18px_hsl(185,100%,50%,0.7)]">
              FACE
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-transparent border-none text-[hsl(240,5%,40%)] font-syne text-sm px-4 py-2 rounded-lg cursor-pointer transition-all hover:text-foreground hover:bg-[hsl(0,0%,100%,0.05)] no-underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="nav" size="sm" className="px-5">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton mode="modal">
                <Button variant="navCta" size="sm" className="px-5">
                  GET STARTED →
                </Button>
              </SignUpButton>
            </>
          ) : (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                },
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}