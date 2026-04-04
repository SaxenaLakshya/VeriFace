import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative z-10">
      <div className="orb orb-cyan" />
      <div className="orb orb-purple" />

      <div className="font-orbitron font-black text-[8rem] leading-none text-[hsl(185,100%,50%,0.15)] select-none mb-4">
        404
      </div>
      <h1 className="font-orbitron font-bold text-2xl mb-3">Page not found</h1>
      <p className="text-muted-foreground text-sm mb-8 max-w-sm font-light">
        This page doesn&apos;t exist. Head back to VeriFace to keep verifying images.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[hsl(185,100%,50%)] text-black font-orbitron font-bold text-xs tracking-widest uppercase shadow-[0_0_40px_hsl(185,100%,50%,0.35)] hover:shadow-[0_0_60px_hsl(185,100%,50%,0.5)] transition-all hover:-translate-y-[1px] no-underline"
      >
        ← GO HOME
      </Link>
    </div>
  );
}
