import Image from "next/image";
import Reveal from "./Reveal";
import { getClientLogos } from "@/lib/queries";

function LogoRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Track holds the list twice so the -50% translate loops seamlessly
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className={`flex w-max shrink-0 gap-5 py-2 group-hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...items, ...items].map((src, i) => (
          <div
            key={`${src}-${i}`}
            aria-hidden={i >= items.length}
            className="relative flex h-[100px] w-[180px] shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1 max-sm:h-[80px] max-sm:w-[140px]"
          >
            <Image src={src} alt={i < items.length ? "Marvel Fountains client" : ""} fill sizes="180px" className="object-contain p-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ClientsSection() {
  const logos = await getClientLogos();
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section className="relative overflow-hidden bg-sand py-24 max-md:py-16">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[340px] w-[340px] rounded-full bg-cyan/10 blur-[120px]" />
      <Reveal className="relative z-[1] mx-auto mb-12 grid max-w-[1240px] gap-6 px-7 max-md:px-4 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div>
          <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
            Clientele
          </div>
          <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">Clients</span>
          </h2>
        </div>
        <p className="text-[15.5px] font-light leading-relaxed text-muted">
          We wish to develop good &amp; long-lasting business relationships with our clients. Superior quality products
          are offered at the most competitive rates, and every order reaches our clients on time and in the desired
          condition.
        </p>
      </Reveal>
      <div className="relative z-[1] flex flex-col gap-5">
        <LogoRow items={rows[0]} />
        <LogoRow items={rows[1]} reverse />
      </div>
    </section>
  );
}
