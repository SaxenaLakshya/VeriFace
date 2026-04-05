"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Client Upload",
    desc: "Users upload images via drag & drop or file selection. The frontend validates format before sending.",
  },
  {
    title: "Backend Orchestration",
    desc: "Server receives the image, validates payload, and prepares it for processing.",
  },
  {
    title: "Secure Storage",
    desc: "Image is uploaded to Supabase Storage and a secure URL is generated.",
  },
  {
    title: "AI Processing",
    desc: "VeriFace API runs multiple detection models analyzing patterns, artifacts, and signatures.",
  },
  {
    title: "Inference Output",
    desc: "AI returns confidence score, prediction, and technical insights.",
  },
  {
    title: "Client Visualization",
    desc: "Frontend renders results with visual indicators and insights.",
  },
  {
    title: "Authentication",
    desc: "Clerk manages sessions, access control, and premium features.",
  },
  {
    title: "Database Sync",
    desc: "Supabase stores user data, scan history, and analytics.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(240,40%,3%)] text-white px-6 py-28">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[hsl(185,100%,50%,0.15)] blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-[hsl(290,70%,50%,0.12)] blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-orbitron text-[clamp(3rem,7vw,5rem)] font-black mb-6 tracking-tight"
        >
          HOW IT{" "}
          <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_40px_hsl(185,100%,50%)]">
            WORKS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
        >
          A deep dive into the system architecture powering VeriFace — from upload
          to AI inference and secure storage.
        </motion.p>
      </div>

      {/* 🧠 DIAGRAM (GLASS CARD + HOVER ZOOM) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto mb-24 group"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[hsl(185,100%,50%,0.15)] to-[hsl(290,70%,50%,0.15)] blur-xl opacity-60 group-hover:opacity-100 transition" />

        <div className="relative rounded-3xl overflow-hidden border border-[hsl(0,0%,100%,0.08)] bg-[hsl(240,30%,5%,0.6)] backdrop-blur-xl p-5 transition-all duration-500 group-hover:scale-[1.02]">
          <Image
            src="/Data Flow Diagram.png"
            alt="Architecture Diagram"
            width={1200}
            height={700}
            className="rounded-xl"
          />
        </div>
      </motion.div>

      {/* ⚡ STEPS GRID */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            className="group relative p-6 rounded-2xl border border-[hsl(0,0%,100%,0.06)] bg-[hsl(240,30%,5%,0.6)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[hsl(185,100%,50%,0.4)] hover:shadow-[0_0_60px_hsl(185,100%,50%,0.12)]"
          >
            {/* glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(185,100%,50%,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition" />

            <h3 className="font-orbitron text-lg mb-2 text-[hsl(185,100%,50%)] relative z-10">
              {i + 1}. {step.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 🧠 DEEP EXPLANATION */}
      <div className="relative z-10 max-w-5xl mx-auto mt-28">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative p-10 rounded-3xl border border-[hsl(185,100%,50%,0.15)] bg-[hsl(240,30%,5%,0.7)] backdrop-blur-xl overflow-hidden"
        >
          {/* glow */}
          <div className="absolute inset-0 bg-[hsl(185,100%,50%,0.05)] blur-2xl opacity-60" />

          <h2 className="font-orbitron text-2xl mb-6 relative z-10">
            System Architecture Explained
          </h2>

          <p className="text-muted-foreground text-[0.95rem] leading-[1.9] relative z-10">
            VeriFace is built on a scalable, modular architecture designed for
            high-performance AI inference. The client application acts as the
            entry point, where users upload images.
            <br /><br />
            These images are processed by a backend server which handles
            validation, storage, and orchestration. Images are stored in Supabase
            Storage and accessed through secure URLs.
            <br /><br />
            The VeriFace AI service performs deep analysis using multiple models,
            detecting pixel inconsistencies, frequency anomalies, and generative
            artifacts from diffusion and GAN-based systems.
            <br /><br />
            The system returns structured results including predictions,
            confidence levels, and technical insights, which are rendered on the
            frontend.
            <br /><br />
            Clerk manages authentication, while Supabase ensures persistence of
            user data and scan history.
          </p>
        </motion.div>
      </div>

      {/* 🚀 CTA */}
      <div className="relative z-10 text-center mt-24">
        <a
          href="/"
          className="inline-block px-10 py-4 rounded-2xl bg-[hsl(185,100%,50%)] text-black font-semibold text-lg shadow-[0_0_40px_hsl(185,100%,50%,0.4)] hover:scale-105 transition-transform"
        >
          Back to Home →
        </a>
      </div>
    </div>
  );
}