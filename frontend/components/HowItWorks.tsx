const steps = [
  {
    num: "01",
    colorClass: "bg-[hsl(185,100%,50%,0.1)] border-[hsl(185,100%,50%,0.2)] text-[hsl(185,100%,50%)]",
    title: "Upload & Auth",
    desc: "Sign in to your account. Drag, drop, paste, or browse any image up to 10 MB. The file is uploaded directly to secure storage via the upload endpoint.",
  },
  {
    num: "02",
    colorClass: "bg-[hsl(290,70%,50%,0.1)] border-[hsl(290,70%,50%,0.2)] text-[hsl(290,70%,50%)]",
    title: "ML Pipeline Runs",
    desc: "The backend passes the image to the VeriFace ML model. Frequency analysis, pixel entropy checks, and generation artifact detection run in parallel — returning a confidence score in under 2 seconds.",
  },
  {
    num: "03",
    colorClass: "bg-[hsl(120,100%,54%,0.1)] border-[hsl(120,100%,54%,0.2)] text-[hsl(120,100%,54%)]",
    title: "Verdict & Share",
    desc: "Results are stored and displayed with a confidence gauge. Your scan history lives in your dashboard. Each result gets a unique shareable URL with generated OG images for social previews.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 py-[120px] px-8 max-w-[1000px] mx-auto"
    >
      <span className="inline-block font-space text-[0.7rem] text-[hsl(185,100%,50%,0.6)] tracking-[0.15em] uppercase mb-4 px-3 py-1 border border-[hsl(185,100%,50%,0.15)] rounded-full">
        Process
      </span>
      <h2 className="font-orbitron font-bold text-[clamp(1.8rem,4vw,3rem)] mb-3">
        How VeriFace works
      </h2>
      <p className="text-muted-foreground text-[0.95rem] leading-[1.7] mb-12 font-light">
        A clean three-step pipeline from upload to verdict.
      </p>

      <div className="grid gap-0">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="grid grid-cols-[80px_1fr] relative pb-12 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center font-orbitron font-black text-[1.1rem] border z-[1] ${step.colorClass}`}
              >
                {step.num}
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 w-px bg-gradient-to-b from-[hsl(185,100%,50%,0.3)] to-transparent mt-2" />
              )}
            </div>
            <div className="pl-6 pt-3">
              <h3 className="font-orbitron font-semibold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-[1.7] font-light">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
