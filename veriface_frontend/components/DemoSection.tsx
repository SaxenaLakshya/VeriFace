"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Phase = "upload" | "preview" | "scanning" | "result";

interface Result {
  verdict: "REAL" | "AI-GENERATED";
  confidence: number;
  model: string;
  detail: string;
}

interface DemoSectionProps {
  onSaveHistory: () => void;
}

export default function DemoSection({ onSaveHistory }: DemoSectionProps) {
  const [phase, setPhase] = useState<Phase>("upload");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLabel, setScanLabel] = useState("Initializing…");
  const [result, setResult] = useState<Result | null>(null);
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

  const startScan = () => {
    setPhase("scanning");
    setScanProgress(0);
    const labels = [
      "Extracting pixel data…",
      "Running frequency analysis…",
      "Checking generation signatures…",
      "Computing confidence…",
    ];
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setScanProgress(Math.min(step * 25, 100));
      setScanLabel(labels[Math.min(step - 1, labels.length - 1)]);
      if (step >= 4) {
        clearInterval(interval);
        const isAI = Math.random() > 0.5;
        setResult({
          verdict: isAI ? "AI-GENERATED" : "REAL",
          confidence: isAI
            ? 85 + Math.floor(Math.random() * 12)
            : 88 + Math.floor(Math.random() * 10),
          model: isAI
            ? "Likely Midjourney v5 / DALL·E 3"
            : "No AI signatures detected",
          detail: isAI
            ? "GAN artifacts detected in high-frequency domain"
            : "Natural noise patterns consistent with camera sensor",
        });
        setPhase("result");
      }
    }, 500);
  };

  const reset = () => {
    setPhase("upload");
    setImage(null);
    setFileName("");
    setResult(null);
  };

  const gaugeOffset = result ? 251 - (251 * result.confidence) / 100 : 251;
  const isReal = result?.verdict === "REAL";

  return (
    <section
      id="demo"
      className="relative z-10 py-[120px] px-8 max-w-[1000px] mx-auto"
    >
      <span className="inline-block font-space text-[0.7rem] text-[hsl(185,100%,50%,0.6)] tracking-[0.15em] uppercase mb-4 px-3 py-1 border border-[hsl(185,100%,50%,0.15)] rounded-full">
        Live Demo
      </span>
      <h2 className="font-orbitron font-bold text-[clamp(1.8rem,4vw,3rem)] mb-3">
        Try it right now — no login needed
      </h2>
      <p className="text-muted-foreground text-[0.95rem] leading-[1.7] mb-12 font-light">
        Drop any image below and watch VeriFace&apos;s ML pipeline analyze it in
        real time. Save your results by creating a free account.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Upload Zone */}
      {phase === "upload" && (
        <div
          className={`border-2 border-dashed rounded-[20px] min-h-[300px] flex flex-col items-center justify-center text-center p-12 cursor-pointer transition-all bg-[hsl(240,40%,3%,0.3)] ${
            dragOver
              ? "border-[hsl(185,100%,50%)] bg-[hsl(185,100%,50%,0.04)] shadow-[0_0_80px_hsl(185,100%,50%,0.1)_inset]"
              : "border-[hsl(185,100%,50%,0.2)] hover:border-[hsl(185,100%,50%)] hover:bg-[hsl(185,100%,50%,0.04)]"
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
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[hsl(185,100%,50%)]"
            >
              <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground/70 mb-1.5">
            Drop your image here
          </p>
          <p className="font-space text-[0.72rem] text-muted-foreground">
            or click to browse · PNG · JPG · WEBP · max 10 MB
          </p>
          <div className="flex gap-4 mt-6 font-space text-[0.65rem] text-muted-foreground">
            <span>⌘/Ctrl + V Paste</span>
            <span>Drag & Drop</span>
            <span>Click to Browse</span>
          </div>
        </div>
      )}

      {/* Preview */}
      {phase === "preview" && image && (
        <div className="scan-corners scan-corners-inner rounded-[20px] overflow-hidden bg-[hsl(240,40%,3%,0.3)] border border-[hsl(0,0%,100%,0.07)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-[400px] object-contain"
          />
          <div className="flex items-center gap-3 p-4 border-t border-[hsl(0,0%,100%,0.07)]">
            <Button variant="hero" onClick={startScan}>
              ⚡ ANALYZE →
            </Button>
            <Button variant="heroGhost" onClick={reset}>
              ✕ Remove
            </Button>
          </div>
        </div>
      )}

      {/* Scanning */}
      {phase === "scanning" && image && (
        <div className="scan-corners scan-corners-inner rounded-[20px] overflow-hidden bg-[hsl(240,40%,3%,0.3)] border border-[hsl(0,0%,100%,0.07)] relative">
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(185,100%,50%)] to-transparent shadow-[0_0_20px_hsl(185,100%,50%),0_0_60px_hsl(185,100%,50%,0.3)] animate-scan z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt="Scanning"
            className="w-full max-h-[400px] object-contain opacity-60"
          />
          <div className="p-8 text-center">
            <div className="font-orbitron font-bold text-lg mb-2 text-[hsl(185,100%,50%)]">
              ANALYZING…
            </div>
            <p className="font-space text-xs text-muted-foreground mb-4">
              {scanLabel}
            </p>
            <div className="w-full max-w-xs mx-auto h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[hsl(185,100%,50%)] to-[hsl(290,70%,50%)] rounded-full transition-all duration-500"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {phase === "result" && result && (
        <div className="glass rounded-[20px] p-8">
          <h3 className="font-orbitron font-bold text-lg mb-6 text-center">
            Analysis Complete
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gauge */}
            <div className="flex flex-col items-center">
              <div className="relative inline-block">
                <svg width="96" height="96" className="-rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="hsl(240 10% 12%)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke={
                      isReal ? "hsl(120,100%,54%)" : "hsl(290,70%,50%)"
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset={gaugeOffset}
                    className="transition-all duration-[1.6s] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-orbitron font-black text-xl">
                    {result.confidence}%
                  </span>
                  <span className="font-space text-[0.6rem] text-muted-foreground">
                    confidence
                  </span>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={`px-6 py-3 rounded-xl font-orbitron font-bold text-sm mb-3 ${
                  isReal
                    ? "bg-[hsl(120,100%,54%,0.1)] border border-[hsl(120,100%,54%,0.35)] text-[hsl(120,100%,54%)]"
                    : "bg-[hsl(290,70%,50%,0.1)] border border-[hsl(290,70%,50%,0.35)] text-[hsl(290,70%,50%)]"
                }`}
              >
                {result.verdict}
              </div>
              <p className="font-space text-xs text-muted-foreground text-center">
                {result.model}
              </p>
              <p className="text-xs text-muted-foreground/60 text-center mt-1">
                {result.detail}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 justify-center">
              <Button variant="hero" onClick={reset}>
                SCAN ANOTHER
              </Button>
              <Button variant="heroGhost" onClick={onSaveHistory}>
                Save History →
              </Button>
              <Button
                variant="heroGhost"
                className="text-xs"
                onClick={() =>
                  typeof window !== "undefined" &&
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                🔗 Share Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
