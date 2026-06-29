"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    SignInButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isSignedIn } = useUser();

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Scan", href: "/scan" },
        { label: "Features", href: "/features" },
        { label: "How It Works", href: "/how" },
        { label: "Reviews", href: "/reviews" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[200] border-b border-white/10 bg-[hsl(240,40%,3%,0.75)] backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 no-underline"
                    onClick={() => setMobileOpen(false)}
                >
                    <Image
                        src="/VeriFace Logo.svg"
                        alt="VeriFace Logo"
                        width={36}
                        height={36}
                        priority
                        className="h-8 w-8 sm:h-9 sm:w-9"
                    />

                    <span className="font-orbitron text-base font-black tracking-wide text-foreground sm:text-lg">
                        VERI
                        <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_12px_hsl(185,100%,50%,0.7)]">
                            FACE
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-[hsl(240,5%,65%)] transition-all duration-200 hover:bg-white/5 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-2">
                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="nav" size="sm">
                                    Sign In
                                </Button>
                            </SignInButton>

                            <SignUpButton mode="modal">
                                <Button variant="navCta" size="sm">
                                    GET STARTED →
                                </Button>
                            </SignUpButton>
                        </>
                    ) : (
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9",
                                },
                            }}
                        />
                    )}
                </div>

                {/* Mobile Right Side */}
                <div className="flex items-center gap-2 md:hidden">
                    {isSignedIn && (
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8",
                                },
                            }}
                        />
                    )}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                        className="rounded-lg p-2 text-white transition hover:bg-white/10"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? "max-h-screen border-t border-white/10" : "max-h-0"
                    }`}
            >
                <div className="bg-[hsl(240,40%,5%,0.98)] px-4 py-4 backdrop-blur-xl">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg px-4 py-3 text-base font-medium text-gray-300 transition-all hover:bg-white/5 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {!isSignedIn && (
                        <div className="mt-5 border-t border-white/10 pt-5">
                            <div className="flex flex-col gap-3">
                                <SignInButton mode="modal">
                                    <Button
                                        variant="nav"
                                        className="w-full"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Sign In
                                    </Button>
                                </SignInButton>

                                <SignUpButton mode="modal">
                                    <Button
                                        variant="navCta"
                                        className="w-full"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        GET STARTED →
                                    </Button>
                                </SignUpButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}