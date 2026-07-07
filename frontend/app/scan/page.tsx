"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ScanResult = {
    imageUrl: string;
    result: string;
    confidence: number;
};

type RateLimit = {
    success: boolean,
    message: string,
    retryAfter: number,
};

export default function ScanPage() {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    // 📁 HANDLE FILE
    const handleFile = useCallback((selectedFile: File) => {
        try {
            if (!selectedFile) {
                alert("No file selected");
                return;
            }

            const MAX_SIZE = 10 * 1024 * 1024;
            if (selectedFile.size > MAX_SIZE) {
                alert("File must be under 10MB");
                return;
            }

            const validMime = selectedFile.type.startsWith("image/");
            const validExtension = /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(
                selectedFile.name,
            );

            if (!validMime && !validExtension) {
                alert("Only image files are allowed");
                return;
            }

            const reader = new FileReader();

            reader.onerror = () => {
                console.error("FileReader failed");
                alert("Failed to read image");
            };

            reader.onabort = () => {
                console.error("FileReader aborted");
                alert("Image reading was aborted");
            };

            reader.onload = (e) => {
                try {
                    const result = e.target?.result;
                    if (!result || typeof result !== "string") {
                        alert("Invalid image");
                        return;
                    }
                    setImage(result);
                    setFile(selectedFile);
                    setResult(null);
                } catch (err) {
                    console.error(err);
                    alert("Failed to process image");
                }
            };

            reader.readAsDataURL(selectedFile);
        } catch (err) {
            console.error(err);
            alert("Unexpected error while loading image");
        }
    }, []);

    // 🚀 API CALL
    const handleScan = async () => {
        if (!file || loading) return;

        setLoading(true);
        setResult(null);
        setRateLimit(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 60000);

            const res = await fetch("/api/scan", {
                method: "POST",
                body: formData,
                signal: controller.signal,
            });

            clearTimeout(timeout);

            if (res.status === 429) {

                const data = await res.json();

                setRateLimit({
                    success: data.success,
                    message: data.message,
                    retryAfter: data.retryAfter,
                });

                setLoading(false);
                return;
            }

            if (!res.ok) {
                throw new Error(`Server error (${res.status})`);
            }

            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error("Invalid server response");
            }

            if (
                !data ||
                typeof data.imageUrl !== "string" ||
                typeof data.result !== "string" ||
                typeof data.confidence !== "number"
            ) {
                throw new Error("Malformed API response");
            }

            setResult({
                imageUrl: data.imageUrl,
                result: data.result,
                confidence: Math.round(data.confidence),
            });
        } catch (err: any) {
            console.error(err);
            if (err.name === "AbortError") {
                alert("Request timed out. Please try again.");
            } else {
                alert(err.message || "Scan failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // 🔄 RESET
    const reset = () => {
        setImage(null);
        setFile(null);
        setResult(null);
        setRateLimit(null);
        setLoading(false);
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="min-h-screen bg-[hsl(240,40%,3%)] text-white px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-24">
            {/* HEADER */}
            <div className="text-center mb-8 sm:mb-14">
                <h1 className="font-orbitron text-[clamp(2rem,8vw,4rem)] font-black mb-2 sm:mb-3 leading-tight">
                    SCAN IMAGE
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base px-2">
                    Upload a photo and let AI check if it's real or AI-generated
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* UPLOAD BOX */}
                {!result && !rateLimit && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-2 border-dashed border-[hsl(185,100%,50%,0.25)] rounded-[20px] sm:rounded-[24px] p-6 sm:p-10 text-center bg-[hsl(240,30%,5%,0.5)] backdrop-blur-xl cursor-pointer hover:border-[hsl(185,100%,50%)] active:border-[hsl(185,100%,50%)] transition-all"
                        onClick={() => {
                            if (!loading) fileRef.current?.click();
                        }}
                    >
                        {/* Hidden file input — allows both gallery & camera on mobile */}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/bmp,image/svg+xml"
                            className="hidden"
                            onChange={(e) => {
                                try {
                                    const selected = e.target.files?.[0];
                                    if (!selected) return;
                                    handleFile(selected);
                                } catch (err) {
                                    console.error(err);
                                    alert("Failed to select file");
                                }
                            }}
                        />

                        {!image ? (
                            <>
                                <div className="text-5xl sm:text-6xl mb-4 animate-float">
                                    📸
                                </div>

                                <p className="text-base sm:text-lg font-semibold mb-1">
                                    Tap to choose a photo
                                </p>

                                <p className="text-sm text-muted-foreground mb-1">
                                    You can pick from your gallery or take a new photo
                                </p>

                                <p className="text-xs text-muted-foreground mt-1">
                                    PNG · JPG · WEBP · max 10MB
                                </p>
                            </>
                        ) : (
                            <>
                                <img
                                    src={image}
                                    alt="Your selected photo"
                                    className="max-h-[240px] sm:max-h-[300px] w-full object-contain mx-auto rounded-xl mb-5 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                                />

                                {/* Buttons stack on mobile, side-by-side on sm+ */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        variant="hero"
                                        disabled={loading}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleScan();
                                        }}
                                        className="w-full sm:w-auto text-base py-3 px-6 hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-50"
                                    >
                                        {loading ? "Scanning…" : "⚡ Start Scan"}
                                    </Button>

                                    <Button
                                        variant="heroGhost"
                                        disabled={loading}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reset();
                                        }}
                                        className="w-full sm:w-auto text-base py-3 px-6 hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-50"
                                    >
                                        Remove Photo
                                    </Button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {/* LOADING */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 text-center"
                    >
                        <div className="flex justify-center gap-3 mb-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-3 h-3 rounded-full bg-[hsl(185,100%,50%)] animate-pulse shadow-[0_0_10px_hsl(185,100%,50%)]"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Analysing your photo…
                        </p>
                    </motion.div>
                )}

                {/* RESULT */}
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 sm:mt-10 p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] bg-[hsl(240,30%,5%,0.6)] border border-[hsl(185,100%,50%,0.2)] text-center backdrop-blur-xl"
                    >
                        <img
                            src={result.imageUrl}
                            alt="Scanned photo"
                            className="max-h-[200px] sm:max-h-[260px] w-full object-contain mx-auto rounded-xl mb-5 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        />

                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                            AI Confidence
                        </p>

                        <div className="text-2xl sm:text-3xl font-orbitron font-bold mb-3">
                            {result.confidence}%
                        </div>

                        <div
                            className={`inline-block px-5 py-2 rounded-xl font-bold text-sm sm:text-base transition-all ${result.result.toUpperCase() === "REAL"
                                ? "bg-[hsl(120,100%,54%,0.12)] text-[hsl(120,100%,54%)] border border-[hsl(120,100%,54%,0.4)] shadow-[0_0_20px_hsl(120,100%,54%,0.25)]"
                                : "bg-[hsl(290,70%,50%,0.12)] text-[hsl(290,70%,50%)] border border-[hsl(290,70%,50%,0.4)] shadow-[0_0_25px_hsl(290,70%,50%,0.35)]"
                                }`}
                        >
                            {result.result.toUpperCase() === "REAL"
                                ? "✅ Looks Real"
                                : "🤖 Likely AI-Generated"}
                        </div>

                        <p className="text-xs text-muted-foreground mt-3 px-4">
                            {result.result.toUpperCase() === "REAL"
                                ? "This image appears to be a genuine photo."
                                : "This image shows signs of being AI-generated."}
                        </p>

                        <div className="mt-6">
                            <Button
                                variant="hero"
                                onClick={reset}
                                className="w-full sm:w-auto text-base py-3 px-6 hover:scale-[1.03] active:scale-[0.98] transition-transform"
                            >
                                Scan Another Photo →
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* RATE LIMIT */}
                {rateLimit && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 sm:mt-10 p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] bg-[hsl(240,30%,5%,0.6)] border border-red-500/20 text-center backdrop-blur-xl"
                    >
                        <div className="text-6xl mb-5">
                            ⏳
                        </div>

                        <h2 className="text-3xl font-orbitron font-bold text-red-400 mb-3">
                            Rate Limit Reached
                        </h2>

                        <p className="text-muted-foreground mb-6">
                            {rateLimit.message}
                        </p>

                        <div className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-semibold">
                            Try again after{" "}
                            {Math.ceil(rateLimit.retryAfter / 60)} minute(s)
                        </div>

                        <div className="mt-8">
                            <Button
                                variant="hero"
                                onClick={reset}
                            >
                                Back
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}