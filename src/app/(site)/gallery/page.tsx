import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import PhotoGallery from "@/components/PhotoGallery";
import VideoGallery from "@/components/VideoGallery";
import { getGalleryCategories, getGalleryPhotos, getSettings, getVideos } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gallery | Marvel Fountains" };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
      {children}
    </div>
  );
}

export default async function GalleryPage() {
  const [galleryPhotos, photoCategories, galleryVideos, settings] = await Promise.all([
    getGalleryPhotos(),
    getGalleryCategories(),
    getVideos(),
    getSettings(),
  ]);

  return (
    <>
      <Header title="Gallery" />
      <PageHero
        title="Gallery"
        image={settings.hero_image_gallery ?? ""}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      >
        <div className="flex gap-6 text-sm">
          <a href="#photos" className="arrow-link text-white transition-colors hover:text-gold">
            Photos
          </a>
          <a href="#videos" className="arrow-link text-white transition-colors hover:text-gold">
            Videos
          </a>
        </div>
      </PageHero>

      {/* Photo gallery */}
      <section id="photos" className="relative scroll-mt-20 overflow-hidden bg-paper px-7 py-24 max-md:px-4 max-md:py-16">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan/20 blur-[110px]" />
        <div className="pointer-events-none absolute top-40 -right-32 h-[380px] w-[380px] rounded-full bg-gold/15 blur-[110px]" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
            <Eyebrow>Photo Gallery</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink mb-4 font-serif">A Glimpse of Our Work</h2>
            <p className="text-muted text-[15.5px] font-light">
              Finished installations across homes, hotels and public spaces — tap any photo to view it full screen.
            </p>
          </Reveal>
          <PhotoGallery photos={galleryPhotos} categories={photoCategories} />
        </div>
      </section>

      {/* Video gallery */}
      <section id="videos" className="relative scroll-mt-20 overflow-hidden bg-sand px-7 py-24 max-md:px-4 max-md:py-16">
        <div className="pointer-events-none absolute top-0 right-0 h-[360px] w-[360px] rounded-full bg-gold/12 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-cyan/12 blur-[120px]" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
            <Eyebrow>Video Gallery</Eyebrow>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink mb-4 font-serif">
              See Our Fountains{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">in Motion</span>
            </h2>
            <p className="text-muted text-[15.5px] font-light">
              Musical, dancing and programmable fountain shows we have designed and installed.
            </p>
          </Reveal>
          <Reveal>
            <VideoGallery videos={galleryVideos} />
          </Reveal>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </>
  );
}
