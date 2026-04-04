"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  open: boolean;
  mode: "signin" | "signup";
  onClose: () => void;
  onSwitch: () => void;
}

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LogoMark = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(185,100%,50%)] to-[hsl(210,100%,50%)] flex items-center justify-center">
    <svg
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      className="text-black"
    >
      <path d="M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>
  </div>
);

const inputClass =
  "w-full bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.07)] rounded-xl px-4 py-3 font-syne text-sm text-foreground outline-none transition-all focus:border-[hsl(185,100%,50%,0.4)] focus:bg-[hsl(185,100%,50%,0.03)] focus:shadow-[0_0_0_3px_hsl(185,100%,50%,0.06)] placeholder:text-[hsl(240,5%,40%,0.5)]";

const labelClass =
  "block font-space text-[0.7rem] text-muted-foreground uppercase tracking-[0.1em] mb-2";

export default function AuthModal({
  open,
  mode,
  onClose,
  onSwitch,
}: AuthModalProps) {
  const [password, setPassword] = useState("");

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const strengthLevel =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : /[A-Z]/.test(password) && /\d/.test(password)
      ? 4
      : 3;

  const strengthColors = [
    "",
    "bg-[hsl(350,100%,62%)]",
    "bg-[hsl(40,100%,50%)]",
    "bg-[hsl(185,100%,50%)]",
    "bg-[hsl(120,100%,54%)]",
  ];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[hsl(240,40%,3%,0.85)] backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[1] w-full max-w-[460px] bg-[hsl(240,30%,5%,0.95)] border border-[hsl(185,100%,50%,0.12)] rounded-3xl p-12 shadow-[0_40px_120px_rgba(0,0,0,0.8)] animate-modal-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[hsl(0,0%,100%,0.05)] border border-[hsl(0,0%,100%,0.07)] text-muted-foreground flex items-center justify-center transition-all hover:bg-[hsl(350,100%,62%,0.1)] hover:border-[hsl(350,100%,62%,0.3)] hover:text-[hsl(350,100%,62%)] cursor-pointer"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-7">
          <LogoMark />
        </div>

        {/* Heading */}
        <h3 className="font-orbitron font-bold text-xl text-center mb-1.5">
          {mode === "signin" ? "Welcome back" : "Create Account"}
        </h3>
        <p className="text-center text-sm text-muted-foreground mb-8 font-light">
          {mode === "signin"
            ? "Sign in to access your scan history & dashboard"
            : "Free forever during beta. No credit card required."}
        </p>

        {/* Social Auth */}
        <Button
          variant="social"
          className="w-full mb-2.5 justify-center gap-2.5"
        >
          <GoogleIcon />
          {mode === "signin" ? "Continue with Google" : "Sign up with Google"}
        </Button>

        {mode === "signin" && (
          <Button
            variant="social"
            className="w-full mb-2.5 justify-center gap-2.5"
          >
            <GitHubIcon />
            Continue with GitHub
          </Button>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 text-muted-foreground font-space text-[0.7rem]">
          <div className="flex-1 h-px bg-[hsl(0,0%,100%,0.07)]" />
          {mode === "signin" ? "or sign in with email" : "or register with email"}
          <div className="flex-1 h-px bg-[hsl(0,0%,100%,0.07)]" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                className={inputClass}
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
            {/* Password strength */}
            {mode === "signup" && password.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-[3px] flex-1 rounded-sm transition-all ${
                      level <= strengthLevel
                        ? strengthColors[strengthLevel]
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {mode === "signin" && (
            <div className="text-right">
              <button className="text-xs text-[hsl(185,100%,50%)] hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer font-syne">
                Forgot password?
              </button>
            </div>
          )}

          <Button variant="submit" className="mt-2 py-3.5">
            {mode === "signin" ? "SIGN IN →" : "CREATE FREE ACCOUNT →"}
          </Button>
        </div>

        {mode === "signup" && (
          <p className="text-center text-xs text-muted-foreground mt-4 font-light leading-relaxed">
            By signing up you agree to our Terms of Service.
            <br />
            Your data is synced securely.
          </p>
        )}

        {/* Switch mode */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={onSwitch}
            className="bg-transparent border-none text-[hsl(185,100%,50%)] cursor-pointer font-syne text-sm underline decoration-dotted hover:opacity-70 transition-opacity"
          >
            {mode === "signin" ? "Create one free →" : "Sign in →"}
          </button>
        </div>
      </div>
    </div>
  );
}
