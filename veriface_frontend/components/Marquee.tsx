const items = [
  "MIDJOURNEY DETECTION",
  "DALL·E 3 FINGERPRINTING",
  "STABLE DIFFUSION ANALYSIS",
  "DEEPFAKE IDENTIFICATION",
  "GAN ARTIFACT SCANNING",
  "SORA VIDEO FRAMES",
  "FIREFLY DETECTION",
  "FLUX.1 RECOGNITION",
];

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-[hsl(0,0%,100%,0.07)] py-3.5 bg-[hsl(240,40%,3%,0.4)]">
      <div className="flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 font-space text-[0.72rem] text-muted-foreground tracking-widest"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[hsl(185,100%,50%)] flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
