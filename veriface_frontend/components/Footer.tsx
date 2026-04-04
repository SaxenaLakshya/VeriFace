import Link from "next/link";

const footerLinks = ["GitHub", "Docs", "API", "Privacy"];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[hsl(0,0%,100%,0.07)] py-12 px-8">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6">
        <div className="font-space text-[0.8rem] text-muted-foreground">
          <span className="font-orbitron font-bold text-foreground">
            VERIFACE
          </span>{" "}
          · Open Source
        </div>
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="font-space text-xs text-muted-foreground no-underline transition-colors hover:text-[hsl(185,100%,50%)]"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
