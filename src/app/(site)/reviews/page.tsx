import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import Breadcrumb from "@/components/Breadcrumb";
import StarRating from "@/components/StarRating";
import { notFound } from "next/navigation";
import { getTestimonials } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reviews | Marvel Fountains" };

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) notFound(); // page appears once real reviews are added in the admin

  return (
    <>
      <Header solid title="Reviews" />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />

      <section className="bg-sand px-7 max-md:px-4 pb-30">
        <div className="max-w-[1240px] mx-auto">
          <Reveal className="max-w-[640px] mx-auto mb-15 text-center">
            <div className="flex items-center justify-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              Testimonials
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em] font-bold text-ink font-serif">What Our Clients Say</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={(i % 6) * 0.08}
                className="rounded-2xl border border-line bg-paper p-8.5 shadow-[0_2px_10px_rgba(13,21,38,0.04)] transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(13,21,38,0.1)] hover:border-gold/40"
              >
                <StarRating size={13} className="mb-3.5" />
                <p className="text-muted text-sm mb-5.5 font-light italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3.5 border-t border-line pt-4.5">
                  <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-gold to-gold-deep text-navy-deep flex items-center justify-center font-bold text-[13px] shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
                    {t.initial}
                  </div>
                  <div>
                    <h5 className="text-[13.5px] text-ink font-semibold">{t.name}</h5>
                    <span className="text-[11.5px] text-muted">{t.role}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </>
  );
}
