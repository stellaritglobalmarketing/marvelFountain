import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import PhotoGallery from "@/components/PhotoGallery";
import { getPhotosInCategory, getSettings } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Press & Media | Marvel Fountains" };

export default async function PressPage() {
  const [photos, settings] = await Promise.all([getPhotosInCategory("Press & Media"), getSettings()]);

  return (
    <>
      <Header title="Press & Media" />
      <PageHero
        title="Press & Media"
        image={settings.hero_image_press || photos[0]?.src || "/media/kankaria.jpg"}
        crumbs={[{ label: "Home", href: "/" }, { label: "Press & Media" }]}
      />

      <section className="bg-paper px-7 py-24 max-md:px-4 max-md:py-16">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
            <div className="flex items-center justify-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              In the News
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink mb-4 font-serif">Marvel Fountains in the media</h2>
            <p className="text-muted text-[15.5px] font-light">Newspaper and media coverage of our fountain projects — tap a photo to read it full screen.</p>
          </Reveal>
          {photos.length > 0 ? (
            <PhotoGallery photos={photos} categories={[]} showTabs={false} />
          ) : (
            <p className="text-center text-muted">Coming soon.</p>
          )}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </>
  );
}
