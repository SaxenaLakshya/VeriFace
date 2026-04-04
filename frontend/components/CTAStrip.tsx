import { Button } from "@/components/ui/button";

interface CTAStripProps {
  onCreateAccount: () => void;
  onTryDemo: () => void;
}

export default function CTAStrip({ onCreateAccount, onTryDemo }: CTAStripProps) {
  return (
    <section className="relative z-10 py-20 px-8 mx-8 mb-20 rounded-[28px] bg-gradient-to-br from-[hsl(185,100%,50%,0.07)] to-[hsl(290,70%,50%,0.07)] border border-[hsl(185,100%,50%,0.1)] text-center max-w-[1216px] sm:mx-auto">
      <h2 className="font-orbitron font-black text-[clamp(1.8rem,4vw,3.2rem)] mb-4">
        Start verifying in 30 seconds.
      </h2>
      <p className="text-muted-foreground text-[0.95rem] mb-10 font-light">
        Free account. No credit card. Unlimited scans during beta.
      </p>
      <div className="flex flex-wrap gap-3.5 justify-center">
        <Button
          variant="hero"
          size="lg"
          className="px-9 py-4"
          onClick={onCreateAccount}
        >
          CREATE FREE ACCOUNT →
        </Button>
        <Button
          variant="heroGhost"
          size="lg"
          className="px-9 py-4"
          onClick={onTryDemo}
        >
          Try Demo First
        </Button>
      </div>
    </section>
  );
}
