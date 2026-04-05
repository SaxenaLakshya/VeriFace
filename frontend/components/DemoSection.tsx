"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/nextjs";

type Phase = "upload" | "preview";

export default function DemoSection() {
  const { isSignedIn } = useUser();

  const [phase, setPhase] = useState<Phase>("upload");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setFileName(file.name);
      setPhase("preview");
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const reset = () => {
    setPhase("upload");
    setImage(null);
    setFileName("");
  };

  return (
    <section
      id="demo"
      className="relative z-10 py-[120px] px-8 max-w-[1000px] mx-auto"
    >
      {/* Header */}
      <span className="animate-fade-up delay-1 inline-block font-space text-[hsl(185,100%,50%,0.6)] text-[0.7rem] tracking-[0.15em] uppercase mb-4 px-3 py-1 border border-[hsl(185,100%,50%,0.15)] rounded-full">
        Live Demo
      </span>

      <h2 className="animate-fade-up delay-2 font-orbitron font-bold text-[clamp(1.8rem,4vw,3rem)] mb-3">
        Try the Free Model
      </h2>

      <p className="animate-fade-up delay-3 text-muted-foreground text-[0.95rem] leading-[1.7] mb-6 font-light">
        Upload an image and get a quick AI vs real prediction using our free model.
      </p>

      {/* ⚠️ Disclaimer + CTA */}
      <div className="animate-fade-up delay-4 mb-10 max-w-[640px] mx-auto text-center text-xs font-space text-[hsl(40,100%,60%)] bg-[hsl(40,100%,50%,0.06)] border border-[hsl(40,100%,50%,0.2)] rounded-xl px-4 py-3">
        ⚠️ This uses a <span className="font-semibold">basic free model</span> and may not be highly accurate.
        <br />
        For <span className="font-semibold">advanced detection models</span> and higher accuracy,
        <span className="text-[hsl(185,100%,50%)]"> sign in to VeriFace.</span>

        <div className="mt-3">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button size="sm" className="px-5 py-2">
                Upgrade →
              </Button>
            </SignInButton>
          ) : (
            <Button
              size="sm"
              className="px-5 py-2"
              onClick={() => (window.location.href = "/scan")}
            >
              Go to Full Scan →
            </Button>
          )}
        </div>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          e.target.files?.[0] && handleFile(e.target.files[0])
        }
      />

      {/* Upload */}
      {phase === "upload" && (
        <div
          className={`animate-fade-up delay-5 border-2 border-dashed rounded-[20px] min-h-[300px] flex flex-col items-center justify-center text-center p-12 cursor-pointer transition-all duration-300 bg-[hsl(240,40%,3%,0.3)] ${
            dragOver
              ? "border-[hsl(185,100%,50%)] bg-[hsl(185,100%,50%,0.04)] shadow-[0_0_80px_hsl(185,100%,50%,0.1)_inset]"
              : "border-[hsl(185,100%,50%,0.2)] hover:border-[hsl(185,100%,50%)] hover:bg-[hsl(185,100%,50%,0.04)] hover:shadow-[0_0_60px_hsl(185,100%,50%,0.08)]"
          }`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <div className="w-16 h-16 rounded-[18px] bg-[hsl(185,100%,50%,0.08)] border border-[hsl(185,100%,50%,0.15)] flex items-center justify-center mb-5 animate-float">
            📤
          </div>

          <p className="text-sm font-medium text-foreground/70 mb-1.5">
            Drop your image here
          </p>

          <p className="font-space text-[0.72rem] text-muted-foreground">
            or click to browse · PNG · JPG · WEBP · max 10 MB
          </p>
        </div>
      )}

      {/* Preview */}
      {phase === "preview" && image && (
        <div className="animate-fade-up scan-corners scan-corners-inner rounded-[20px] overflow-hidden bg-[hsl(240,40%,3%,0.3)] border border-[hsl(0,0%,100%,0.07)]">
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-[400px] object-contain"
          />

          <div className="flex items-center gap-3 p-4 border-t border-[hsl(0,0%,100%,0.07)]">
            <Button
              variant="hero"
              onClick={() => (window.location.href = "/scan")}
              className="hover:scale-[1.03] transition-transform"
            >
              ⚡ ANALYZE →
            </Button>

            <Button
              variant="heroGhost"
              onClick={reset}
              className="hover:scale-[1.03] transition-transform"
            >
              ✕ Remove
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}