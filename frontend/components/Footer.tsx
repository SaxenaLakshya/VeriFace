import Link from "next/link";

const footerLinks = [
  {
    name: "GitHub",
    href: "https://github.com/saxenalakshya/veriface",
  },
  {
    name: "API",
    href: "https://huggingface.co/spaces/saxenalakshya/VeriFace-API",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[hsl(0,0%,100%,0.07)] py-12 px-8">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="font-space text-[0.8rem] text-muted-foreground">
          <span className="font-orbitron font-bold text-foreground">
            VERIFACE
          </span>{" "}
          · Open Source
        </div>

        {/* Right Side Links */}
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
              className="font-space text-xs text-muted-foreground no-underline transition-colors hover:text-[hsl(185,100%,50%)]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}