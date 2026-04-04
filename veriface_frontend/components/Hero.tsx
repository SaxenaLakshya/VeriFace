import { Button } from "@/components/ui/button";

interface HeroProps {
  onTryScan: () => void;
  onCreateAccount: () => void;
}

const stats = [
  { num: "99.2%", label: "Detection Accuracy" },
  { num: "10K+", label: "Verified Images" },
  { num: "<2s", label: "Scan Speed" },
  { num: "50+", label: "AI Models Detected" },
];

export default function Hero({ onTryScan, onCreateAccount }: HeroProps) {
  return (
    <section
      id="try-it"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-[120px] pb-20 px-8"
    >
      {/* Badge */}
      <div className="animate-fade-up delay-1 inline-flex items-center gap-2 px-4 py-1.5 pl-2 bg-[hsl(185,100%,50%,0.06)] border border-[hsl(185,100%,50%,0.15)] rounded-full font-space text-xs text-[hsl(185,100%,50%,0.8)] mb-7">
        <span className="w-2 h-2 bg-[hsl(120,100%,54%)] rounded-full shadow-[0_0_8px_hsl(120,100%,54%)] animate-blink" />
        VeriFace ML — v2.4.1 Live
      </div>

      {/* Headline */}
      <h1 className="animate-fade-up delay-2 font-orbitron font-black text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-center tracking-tight mb-7">
        IS IT
        <br />
        <span className="text-[hsl(185,100%,50%)] drop-shadow-[0_0_60px_hsl(185,100%,50%,0.4)]">
          REAL
        </span>
        <br />
        <span className="text-foreground/40">…OR </span>
        <span className="text-[hsl(290,70%,50%)] drop-shadow-[0_0_60px_hsl(290,70%,50%,0.4)]">
          AI?
        </span>
      </h1>

      {/* Subheading */}
      <p className="animate-fade-up delay-3 text-center max-w-[560px] text-muted-foreground text-[1.05rem] leading-[1.75] mb-11 font-light">
        Upload any image. In under two seconds, VeriFace&apos;s custom ML model
        scans pixel patterns, frequency artifacts, and generation signatures to
        deliver a definitive verdict.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up delay-3 flex flex-wrap gap-3.5 justify-center mb-[72px]">
        <Button
          variant="hero"
          size="lg"
          className="px-9 py-4"
          onClick={onTryScan}
        >
          TRY FREE SCAN →
        </Button>
        <Button
          variant="heroGhost"
          size="lg"
          className="px-9 py-4"
          onClick={onCreateAccount}
        >
          Create Account
        </Button>
      </div>

      {/* Stats */}
      <div className="animate-fade-up delay-4 flex flex-wrap justify-center">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-6 sm:px-12 text-center ${
              i < stats.length - 1
                ? "border-r border-[hsl(0,0%,100%,0.07)]"
                : ""
            }`}
          >
            <div className="font-orbitron text-[2.2rem] font-black leading-none">
              {stat.num}
            </div>
            <div className="font-space text-[0.65rem] text-muted-foreground mt-1.5 tracking-[0.12em] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
