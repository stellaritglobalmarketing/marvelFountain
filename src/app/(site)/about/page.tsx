import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import CountUp from "@/components/CountUp";
import { getBlocks, getSettings, type Block } from "@/lib/queries";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us | Marvel Fountains" };

function CheckList({ title, items }: { title: string; items: Block[] }) {
  return (
    <Reveal className="rounded-2xl border border-line bg-paper p-8 max-md:rounded-none max-md:border-0 max-md:bg-transparent max-md:p-0 max-md:py-6">
      <h3 className="mb-6 text-[22px] font-bold font-serif text-ink max-md:mb-8 max-md:text-[34px] max-md:leading-[1.05] max-md:tracking-[-0.03em]">{title}</h3>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 max-md:gap-y-4">
        {items.map((d) => (
          <li key={d.title} className="flex gap-3 text-[15px] font-light text-muted max-md:text-[16px] max-md:font-normal max-md:leading-snug max-md:text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold max-md:hidden" />
            <ChevronRight size={24} strokeWidth={3.5} className="-ml-1 shrink-0 text-cyan md:hidden" />
            {d.title}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function StrengthList({ items }: { items: Block[] }) {
  return (
    <div className="space-y-10">
      {items.map((s, i) => (
        <Reveal key={s.title} variant="fade-up" delay={i * 0.12} className="group border-l-2 border-line pl-6 transition-colors hover:border-gold">
          <h3 className="mb-2.5 text-[22px] font-bold font-serif text-ink transition-colors group-hover:text-gold">{s.title}</h3>
          <p className="text-[15px] font-light text-muted">{s.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default async function AboutPage() {
  const [story, stats, strengthsA, strengthsB, process, designs, services, missionVision, settings] = await Promise.all([
    getBlocks("about_story"),
    getBlocks("about_stats"),
    getBlocks("about_strengths_a"),
    getBlocks("about_strengths_b"),
    getBlocks("about_process"),
    getBlocks("about_designs"),
    getBlocks("about_services"),
    getBlocks("home_mission"),
    getSettings(),
  ]);

  return (
    <>
      <Header title="About Us" />
      <PageHero
        tall
        image={settings.hero_image_about ?? ""}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title={
          <>
            We create timeless experiences with{" "}
            <span className="italic text-gold">water</span>. Since 1998.
          </>
        }
      />

      {/* Statement */}
      <section className="px-7 max-md:px-4 py-28 max-md:py-20">
        <Reveal className="mx-auto max-w-[980px] text-center max-md:text-left">
          <h2 className="text-[clamp(22px,2.8vw,32px)] font-light font-serif leading-[1.5] text-muted max-md:text-[25px] max-md:font-normal max-md:leading-[1.25] max-md:tracking-[-0.02em]">
            <strong className="font-bold text-ink max-md:font-normal">It&apos;s not just what we do; it&apos;s who we are.</strong> Marvel
            Fountains has been transforming homes, hotels, offices and gardens with beautifully engineered water
            features — designed, manufactured, delivered and installed end-to-end by one dedicated team.
          </h2>
        </Reveal>
      </section>

      {/* Company story */}
      {story.length > 0 && (
        <section className="px-7 max-md:px-4 pb-28 max-md:pb-20">
          <div className="mx-auto grid max-w-[1240px] gap-6 md:grid-cols-2">
            {story.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 2) * 0.1}
                className={`rounded-2xl border border-line bg-paper p-8 max-md:p-6 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-gold">{p.title}</div>
                <p className={`font-light leading-relaxed text-muted ${i === 0 ? "text-[18px] md:text-[20px]" : "text-[15.5px]"}`}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-sand px-7 max-md:px-4 py-20">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="text-center sm:border-l sm:border-line sm:first:border-l-0">
              <CountUp
                to={parseInt(s.value, 10) || 0}
                suffix={s.value.replace(/^\d+/, "")}
                className="block font-serif text-[clamp(52px,6vw,80px)] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan"
              />
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[3px] text-muted">{s.title}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What makes us good */}
      <section className="px-7 max-md:px-4 py-28 max-md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mx-auto mb-20 max-w-[720px] text-center max-md:mb-12 max-md:text-left">
            <div className="flex items-center justify-center max-md:justify-start gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              Why Marvel
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">
              What makes us so good at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">what we do?</span>
            </h2>
          </Reveal>

          <div className="mb-24 grid grid-cols-1 items-center gap-14 lg:grid-cols-2 max-md:mb-16">
            <Reveal variant="fade-left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl before:absolute before:inset-0 before:z-[1] before:rounded-2xl before:border before:border-gold/30">
                <video
                  className="h-full w-full object-cover"
                  src={settings.about_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <p className="mt-4 text-[13px] text-muted">
                <strong className="text-ink">Our work in action</strong> — see more in our{" "}
                <Link href="/gallery" className="text-gold hover:text-cyan transition-colors">
                  gallery
                </Link>
                .
              </p>
            </Reveal>
            <StrengthList items={strengthsA} />
          </div>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <Reveal variant="fade-right" className="lg:order-2">
              <div className="relative mx-auto aspect-[4/5] max-w-[440px] overflow-hidden rounded-2xl">
                <Image
                  src={settings.about_image ?? ""}
                  alt="Elegant tiered garden fountain"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1600ms] hover:scale-[1.05]"
                />
              </div>
            </Reveal>
            <StrengthList items={strengthsB} />
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-navy-deep px-7 max-md:px-4 py-28 max-md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-16 max-w-[640px]">
            <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              How We Work
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">
              From idea to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">flowing water</span>
            </h2>
          </Reveal>

          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
            <Reveal className="absolute left-0 right-0 top-[27px] hidden h-px md:block" variant="fade-left">
              <div className="h-px w-full bg-gradient-to-r from-gold via-cyan to-transparent" />
            </Reveal>
            {process.map((p, i) => (
              <Reveal key={p.value} delay={0.2 + i * 0.15} className="group relative max-md:flex max-md:gap-5">
                <div className="relative z-[1] mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-navy-deep font-serif text-lg font-bold text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-navy-deep group-hover:scale-110">
                  {p.value}
                </div>
                <div>
                  <h3 className="mb-2 text-[20px] font-bold font-serif text-ink">{p.title}</h3>
                  <p className="text-[14px] font-light text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fountain designs & services */}
      {(designs.length > 0 || services.length > 0) && (
        <section className="px-7 max-md:px-4 py-28 max-md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="mb-12 max-w-[640px]">
              <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
                What We Build
              </div>
              <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">
                Fountain designs &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">services</span>
              </h2>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {designs.length > 0 && <CheckList title="Fountain designs" items={designs} />}
              {services.length > 0 && <CheckList title="Musical dancing fountains & services" items={services} />}
            </div>
          </div>
        </section>
      )}

      {/* Vision & mission */}
      {missionVision.length > 0 && (
        <section className="bg-sand px-7 max-md:px-4 py-24 max-md:py-16">
          <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-2">
            {missionVision.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-gold">{m.title}</div>
                <p className="text-[20px] font-light leading-relaxed text-ink md:text-[24px]">{m.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaSection />
      <Footer />
    </>
  );
}
