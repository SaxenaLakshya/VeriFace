const features = [
  {
    icon: "🔬",
    colorClass: "bg-[hsl(185,100%,50%,0.1)] border-[hsl(185,100%,50%,0.15)]",
    title: "Pixel-Level Analysis",
    desc: "Our model inspects high-frequency noise patterns, JPEG compression artifacts, and spatial inconsistencies invisible to the human eye.",
  },
  {
    icon: "🧠",
    colorClass:
      "bg-[hsl(290,70%,50%,0.1)] border-[hsl(290,70%,50%,0.15)]",
    title: "Multi-Model Detection",
    desc: "Recognizes generation signatures from 50+ AI systems including Midjourney, DALL·E 3, Stable Diffusion, Firefly, and Flux.",
  },
  {
    icon: "📊",
    colorClass:
      "bg-[hsl(120,100%,54%,0.1)] border-[hsl(120,100%,54%,0.15)]",
    title: "Confidence Scoring",
    desc: "Get a precise 0–100% confidence gauge, not just a binary verdict. Understand exactly how certain the model is about each decision.",
  },
  {
    icon: "🔗",
    colorClass: "bg-[hsl(185,100%,50%,0.1)] border-[hsl(185,100%,50%,0.15)]",
    title: "Shareable Reports",
    desc: "Every scan generates a public result URL optimized for social sharing — with rich OG tags so Twitter and Discord show the verdict automatically.",
  },
  {
    icon: "🔒",
    colorClass:
      "bg-[hsl(120,100%,54%,0.1)] border-[hsl(120,100%,54%,0.15)]",
    title: "Secure by Design",
    desc: "Images stored encrypted in secure storage. Zero third-party ad tracking. Your data stays private.",
  },
  {
    icon: "⚡",
    colorClass:
      "bg-[hsl(290,70%,50%,0.1)] border-[hsl(290,70%,50%,0.15)]",
    title: "Lightning Fast",
    desc: "The backend processes and returns results in under 2 seconds via the optimized upload endpoint.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative z-10 py-[120px] px-8 max-w-[1280px] mx-auto"
    >
      <span className="inline-block font-space text-[0.7rem] text-[hsl(185,100%,50%,0.6)] tracking-[0.15em] uppercase mb-4 px-3 py-1 border border-[hsl(185,100%,50%,0.15)] rounded-full">
        Capabilities
      </span>
      <h2 className="font-orbitron font-bold text-[clamp(1.8rem,4vw,3rem)] mb-3">
        Everything you need to verify images
      </h2>
      <p className="text-muted-foreground text-[0.95rem] leading-[1.7] mb-12 font-light">
        From pixel-level analysis to shareable result cards, VeriFace gives you
        the full toolkit for authenticity verification.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="glass rounded-[20px] p-8 border border-[hsl(0,0%,100%,0.07)] transition-all hover:border-[hsl(185,100%,50%,0.2)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div
              className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-xl mb-5 border ${f.colorClass}`}
            >
              {f.icon}
            </div>
            <h3 className="font-orbitron font-semibold text-[0.95rem] mb-2.5 tracking-wide">
              {f.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-[1.7] font-light">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
