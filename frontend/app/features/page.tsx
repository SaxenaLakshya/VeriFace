"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "AI Image Detection Engine",
    desc: "Advanced multi-model detection pipeline analyzing pixel-level patterns, GAN fingerprints, and diffusion noise artifacts.",
  },
  {
    title: "Lightning Fast Scans",
    desc: "Optimized backend pipeline ensures results in under 2 seconds with minimal latency.",
  },
  {
    title: "High Accuracy Models",
    desc: "Achieves up to 99% detection accuracy using ensemble learning across multiple AI models.",
  },
  {
    title: "Secure Cloud Storage",
    desc: "Images are securely stored and accessed via Supabase with signed URLs and privacy controls.",
  },
  {
    title: "Authentication & User System",
    desc: "Clerk-powered authentication enables secure login, personalized dashboards, and protected routes.",
  },
  {
    title: "Scan History Tracking",
    desc: "Users can access their past scans, results, and analytics anytime.",
  },
];

const futureFeatures = [
  {
    title: "Video Deepfake Detection",
    desc: "Analyze full videos frame-by-frame to detect deepfake manipulations.",
  },
  {
    title: "Browser Extension",
    desc: "Instantly verify images directly from social media platforms.",
  },
  {
    title: "API for Developers",
    desc: "Expose VeriFace capabilities as a public API for third-party integrations.",
  },
  {
    title: "Real-time Camera Scan",
    desc: "Scan live camera feed for instant authenticity verification.",
  },
  {
    title: "AI Explainability Layer",
    desc: "Visual heatmaps showing exactly why an image is flagged as AI-generated.",
  },
  {
    title: "Mobile Application",
    desc: "Cross-platform mobile app for on-the-go verification.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[hsl(240,40%,3%)] text-white px-6 py-24 overflow-hidden">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-orbitron text-[clamp(2.5rem,6vw,4.5rem)] font-black mb-6"
        >
          POWERFUL FEATURES
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          VeriFace combines cutting-edge AI with blazing-fast infrastructure to
          deliver real-time image authenticity detection.
        </motion.p>
      </div>

      {/* CORE FEATURES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative p-6 rounded-2xl border border-[hsl(0,0%,100%,0.06)] bg-[hsl(240,30%,5%,0.6)] backdrop-blur-xl hover:border-[hsl(185,100%,50%,0.4)] transition-all group overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,hsl(185,100%,50%,0.12),transparent_70%)]" />

            <h3 className="font-orbitron text-lg mb-2 text-[hsl(185,100%,50%)] relative z-10">
              {feature.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FUTURE ROADMAP */}
      <div className="max-w-6xl mx-auto mb-28">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-orbitron text-3xl mb-10 text-center"
        >
          🚀 FUTURE ROADMAP
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-[hsl(290,70%,50%,0.2)] bg-[hsl(290,70%,50%,0.05)] hover:shadow-[0_0_50px_hsl(290,70%,50%,0.2)] transition-all"
            >
              <h3 className="font-orbitron text-lg mb-2 text-[hsl(290,70%,50%)]">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HIGHLIGHT SECTION */}
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 rounded-3xl border border-[hsl(185,100%,50%,0.2)] bg-[linear-gradient(135deg,hsl(185,100%,50%,0.08),hsl(290,70%,50%,0.08))] backdrop-blur-xl text-center"
        >
          <h2 className="font-orbitron text-2xl mb-4">
            Built for the Future of AI Trust
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-[1.8]">
            As AI-generated content becomes indistinguishable from reality,
            VeriFace aims to become the go-to trust layer for the internet —
            ensuring transparency, authenticity, and digital integrity.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <Link
          href="/"
          className="inline-block px-10 py-4 rounded-xl bg-[hsl(185,100%,50%)] text-black font-semibold hover:scale-105 transition-transform shadow-[0_0_40px_hsl(185,100%,50%,0.4)]"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  );
}