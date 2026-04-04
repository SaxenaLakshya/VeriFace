const testimonials = [
  {
    text: "Caught a fake portfolio headshot in under 3 seconds. The confidence gauge is exactly what I needed — not just a yes/no, but an actual percentage. Using this for every hire now.",
    name: "Arjun Mehta",
    role: "Startup Founder · Delhi",
    avatarClass: "bg-[hsl(185,100%,50%,0.2)] text-[hsl(185,100%,50%)]",
  },
  {
    text: "I run a stock photo agency. We scan every contributor submission through VeriFace before it goes live. It's cut our AI-generated rejections from hours of manual review to seconds.",
    name: "Sarah Kim",
    role: "Photo Agency Lead · Seoul",
    avatarClass: "bg-[hsl(290,70%,50%,0.2)] text-[hsl(290,70%,50%)]",
  },
  {
    text: "The shareable result link is brilliant. I paste it into Discord and the preview shows the verdict automatically. My whole moderation team uses this daily to flag AI art submissions.",
    name: "Marcus Torres",
    role: "Community Moderator · LA",
    avatarClass: "bg-[hsl(120,100%,54%,0.2)] text-[hsl(120,100%,54%)]",
  },
  {
    text: "Used it for a misinformation research paper. The frequency analysis catches things I couldn't visually detect. 99.2% accuracy claim holds up in our test dataset of 800 images.",
    name: "Dr. Priya Nair",
    role: "Research Scientist · IIT Bombay",
    avatarClass: "bg-[hsl(290,70%,50%,0.2)] text-[hsl(290,70%,50%)]",
  },
  {
    text: "The dashboard history feature is a game-changer. I scan hundreds of images per week and being able to scroll back through past results with thumbnails saves me so much time.",
    name: "Lena Fischer",
    role: "Freelance Journalist · Berlin",
    avatarClass: "bg-[hsl(185,100%,50%,0.2)] text-[hsl(185,100%,50%)]",
  },
  {
    text: "Clean UI, fast results, no ads. Genuinely outperforms paid tools I've tried. The Ctrl+V paste feature alone saves me 30 seconds per scan.",
    name: "Rahul Dev",
    role: "Full-Stack Developer · Bangalore",
    avatarClass: "bg-[hsl(120,100%,54%,0.2)] text-[hsl(120,100%,54%)]",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative z-10 py-[120px] px-8 max-w-[1280px] mx-auto"
    >
      <span className="inline-block font-space text-[0.7rem] text-[hsl(185,100%,50%,0.6)] tracking-[0.15em] uppercase mb-4 px-3 py-1 border border-[hsl(185,100%,50%,0.15)] rounded-full">
        Reviews
      </span>
      <h2 className="font-orbitron font-bold text-[clamp(1.8rem,4vw,3rem)] mb-12">
        Trusted by creators & researchers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="glass rounded-[18px] p-7 border border-[hsl(0,0%,100%,0.07)]"
          >
            <p className="text-sm leading-[1.75] text-muted-foreground mb-5 font-light">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-bold text-sm ${t.avatarClass}`}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="font-space text-[0.7rem] text-muted-foreground">
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
