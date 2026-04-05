"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ScanResult = {
    imageUrl: string;
    result: string;
    confidence: number;
};

export default function ScanPage() {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    // 📁 HANDLE FILE
    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("File must be under 10MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target?.result as string);
            setFile(file);
            setResult(null); // reset old result
        };
        reader.readAsDataURL(file);
    }, []);

    // 🚀 API CALL
    const handleScan = async () => {
        if (!file) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/scan", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            setResult({
                imageUrl: data.imageUrl,
                result: data.result,
                confidence: data.confidence,
            });
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    const reset = () => {
        setImage(null);
        setFile(null);
        setResult(null);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[hsl(240,40%,3%)] text-white px-6 py-24">

            {/* HEADER */}
            <div className="text-center mb-14">
                <h1 className="font-orbitron text-[clamp(2.5rem,6vw,4rem)] font-black mb-3">
                    SCAN IMAGE
                </h1>
                <p className="text-muted-foreground">
                    Upload an image and let AI determine if it's real or generated
                </p>
            </div>

            <div className="max-w-3xl mx-auto">

                {/* UPLOAD BOX */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-dashed border-[hsl(185,100%,50%,0.25)] rounded-[24px] p-10 text-center bg-[hsl(240,30%,5%,0.5)] backdrop-blur-xl cursor-pointer hover:border-[hsl(185,100%,50%)] transition-all"
                    onClick={() => fileRef.current?.click()}
                >
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                            e.target.files?.[0] && handleFile(e.target.files[0])
                        }
                    />

                    {/* 🔥 FIX: Hide preview if result exists */}
                    {!image || result ? (
                        <>
                            <div className="text-5xl mb-4 animate-float">📤</div>
                            <p className="text-lg mb-1">Upload Image</p>
                            <p className="text-sm text-muted-foreground">
                                PNG · JPG · WEBP · max 10MB
                            </p>
                        </>
                    ) : (
                        <>
                            <img
                                src={image}
                                alt="preview"
                                className="max-h-[300px] mx-auto rounded-xl mb-6 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                            />

                            <div className="flex gap-3 justify-center">
                                <Button
                                    variant="hero"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleScan();
                                    }}
                                    className="hover:scale-[1.05] transition-transform"
                                >
                                    ⚡ Start Scan
                                </Button>

                                <Button
                                    variant="heroGhost"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        reset();
                                    }}
                                    className="hover:scale-[1.05] transition-transform"
                                >
                                    Remove
                                </Button>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* LOADING */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 text-center"
                    >
                        <div className="flex justify-center gap-2 mb-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-[hsl(185,100%,50%)] animate-pulse shadow-[0_0_10px_hsl(185,100%,50%)]"
                                />
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Running AI models...
                        </p>
                    </motion.div>
                )}

                {/* RESULT */}
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 p-8 rounded-[24px] bg-[hsl(240,30%,5%,0.6)] border border-[hsl(185,100%,50%,0.2)] text-center backdrop-blur-xl"
                    >
                        {/* ✅ ONLY ONE IMAGE */}
                        <img
                            src={result.imageUrl}
                            className="max-h-[260px] mx-auto rounded-xl mb-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                        />

                        <div className="text-xl font-orbitron mb-3">
                            {result.confidence}% Confidence
                        </div>

                        {/* 🔥 FIXED LABEL */}
                        <div
                            className={`inline-block px-5 py-2 rounded-xl font-bold transition-all ${result.result.toUpperCase().includes("REAL")
                                    ? "bg-[hsl(120,100%,54%,0.12)] text-[hsl(120,100%,54%)] border border-[hsl(120,100%,54%,0.4)] shadow-[0_0_20px_hsl(120,100%,54%,0.25)]"
                                    : "bg-[hsl(290,70%,50%,0.12)] text-[hsl(290,70%,50%)] border border-[hsl(290,70%,50%,0.4)] shadow-[0_0_25px_hsl(290,70%,50%,0.35)]"
                                }`}
                        >
                            {result.result}
                        </div>

                        <div className="mt-6">
                            <Button
                                variant="hero"
                                onClick={reset}
                                className="hover:scale-[1.05] transition-transform"
                            >
                                Scan Another →
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}