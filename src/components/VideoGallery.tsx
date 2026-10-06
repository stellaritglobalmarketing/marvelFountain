"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { GalleryVideo } from "@/lib/queries";

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Theatre layout: one large player + a playlist. The YouTube iframe only loads
// once a video is played, so the page doesn't pull in six players up front.
export default function VideoGallery({ videos }: { videos: GalleryVideo[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[current];

  const select = (i: number) => {
    setCurrent(i);
    setPlaying(true);
  };

  if (!video) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-navy-deep shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
          {playing ? (
            <iframe
              key={video.id}
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="group absolute inset-0 cursor-pointer" aria-label={`Play ${video.title}`}>
              <Image src={thumb(video.id)} alt={video.title} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/10" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy-deep shadow-[0_0_0_12px_rgba(240,194,75,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_18px_rgba(240,194,75,0.15)] max-sm:h-14 max-sm:w-14">
                <Play size={28} fill="currentColor" className="ml-1" />
              </span>
              <div className="absolute bottom-0 left-0 p-6 text-left max-sm:p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[2px] text-gold">{video.category}</div>
                <div className="mt-1 text-[22px] font-medium text-white sm:text-[28px]">{video.title}</div>
              </div>
            </button>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted">
          <span>
            Now showing: <span className="text-ink">{video.title}</span>
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link whitespace-nowrap text-ink transition-colors hover:text-gold"
          >
            Watch on YouTube
          </a>
        </div>
      </div>

      <ul className="flex flex-col gap-3 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1" data-lenis-prevent>
        {videos.map((v, i) => (
          <li key={v.id}>
            <button
              onClick={() => select(i)}
              className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl border p-2.5 text-left transition-all duration-300 ${
                i === current
                  ? "border-gold/60 bg-gold/10"
                  : "border-line bg-navy-deep/40 hover:border-cyan/50 hover:bg-navy-deep/70"
              }`}
            >
              <span className="relative aspect-video w-[120px] shrink-0 overflow-hidden rounded-lg">
                <Image src={thumb(v.id)} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 flex items-center justify-center bg-navy-deep/40">
                  {i === current && playing ? (
                    <span className="flex items-end gap-0.5" aria-label="Playing">
                      <span className="h-3 w-1 animate-pulse bg-gold" />
                      <span className="h-4 w-1 animate-pulse bg-gold [animation-delay:0.2s]" />
                      <span className="h-2.5 w-1 animate-pulse bg-gold [animation-delay:0.4s]" />
                    </span>
                  ) : (
                    <Play size={18} fill="currentColor" className="text-white" />
                  )}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[2px] text-gold">
                  {String(i + 1).padStart(2, "0")} · {v.category}
                </span>
                <span className={`mt-0.5 block text-[15px] leading-snug ${i === current ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                  {v.title}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
