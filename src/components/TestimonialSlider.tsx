"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import StarRating from "./StarRating";

export type Testimonial = { quote: string; name: string; role: string; initial: string };

// Mobile: one card at a time, moved with the arrows (or a swipe). sm and up: plain grid.
export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (i + testimonials.length) % testimonials.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-gold hover:text-gold";

  return (
    <div className="mx-auto max-w-[1240px] px-7 max-md:px-4">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible lg:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <div key={t.name} className="w-full shrink-0 snap-center sm:w-auto">
            <Reveal
              delay={i * 0.08}
              className="h-full rounded-2xl border border-line bg-paper p-8.5 transition-all sm:hover:-translate-y-1.5 hover:border-gold/40"
            >
              <StarRating size={13} className="mb-3.5" />
              <p className="text-muted text-[16px] mb-5.5 font-light italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3.5 border-t border-line pt-4.5">
                <div className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-cyan to-cyan-deep text-navy-deep flex items-center justify-center font-bold text-[13px]">
                  {t.initial}
                </div>
                <div>
                  <h5 className="text-[15px] text-ink font-semibold">{t.name}</h5>
                  <span className="text-[13px] text-muted">{t.role}</span>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between sm:hidden">
        <button type="button" aria-label="Previous review" onClick={() => goTo(active - 1)} className={arrowClass}>
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show review ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-2 bg-line"}`}
            />
          ))}
        </div>
        <button type="button" aria-label="Next review" onClick={() => goTo(active + 1)} className={arrowClass}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
