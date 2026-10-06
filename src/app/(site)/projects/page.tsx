import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import ProjectsSpotlight from "@/components/ProjectsSpotlight";
import PhotoGallery from "@/components/PhotoGallery";
import { getBlocks, getPhotosInCategory, getProjects, getSettings } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects | Marvel Fountains" };

export default async function ProjectsPage() {
  const [stats, projects, completed, settings] = await Promise.all([
    getBlocks("projects_stats"),
    getProjects(),
    getPhotosInCategory("Completed Projects"),
    getSettings(),
  ]);

  return (
    <>
      <Header title="Projects" />
      <PageHero
        title="Projects"
        image={settings.hero_image_projects ?? ""}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />

      <section className="px-7 max-md:px-4 py-24 max-md:py-16">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <h3 className="text-[clamp(24px,3.2vw,38px)] font-bold font-serif leading-[1.35] text-ink">
              From hotel entrances to private courtyards — fountains we have designed, built and installed across
              India.
            </h3>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-6 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.title}>
                <div className="text-[32px] font-semibold text-gold">{s.value}</div>
                <div className="text-[13px] font-light text-muted">{s.title}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pt-24 pb-6">
        <Reveal className="mx-auto mb-10 w-full max-w-[1240px] px-7 max-md:px-4">
          <h2 className="text-[24px] font-normal tracking-[-0.016em] text-ink">
            <strong className="font-semibold">Featured</strong>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">Installations</span>
          </h2>
        </Reveal>
        <ProjectsSpotlight projects={projects} />
        <div className="flex flex-wrap justify-center gap-x-10">
          <Link
            href="/gallery#photos"
            className="arrow-link inline-block px-4 py-10 text-[20px] font-medium text-ink transition-colors hover:text-gold"
          >
            Photo gallery
          </Link>
          <Link
            href="/gallery#videos"
            className="arrow-link inline-block px-4 py-10 text-[20px] font-medium text-ink transition-colors hover:text-gold"
          >
            Watch project videos
          </Link>
        </div>
      </section>

      {/* All completed projects (photos managed under Photo Gallery → "Completed Projects") */}
      {completed.length > 0 && (
        <section className="bg-paper px-7 py-24 max-md:px-4 max-md:py-16">
          <div className="mx-auto max-w-[1240px]">
            <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
              <div className="flex items-center justify-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
                Projects Completed
              </div>
              <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">Our work across India</h2>
            </Reveal>
            <PhotoGallery photos={completed} categories={[]} showTabs={false} />
          </div>
        </section>
      )}

      <CtaSection />
      <Footer />
    </>
  );
}
