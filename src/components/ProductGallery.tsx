"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ name, thumbs }: { name: string; thumbs: string[] }) {
  const [active, setActive] = useState(thumbs[0] ?? "/logo.png");

  return (
    <div>
      <div className="w-full h-[460px] relative bg-sand max-md:h-[72svh]">
        <Image src={active} alt={name} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" priority />
      </div>
      <div className={`grid gap-2.5 mt-2.5 max-md:px-4 max-md:gap-2 ${thumbs.length > 8 ? "grid-cols-5 sm:grid-cols-6" : "grid-cols-4"}`}>
        {thumbs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`relative ${thumbs.length > 8 ? "h-16" : "h-20"} w-full cursor-pointer transition-all ${
              active === t ? "opacity-100 -translate-y-0.5" : "opacity-65 hover:opacity-100 hover:-translate-y-0.5"
            }`}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <Image src={t} alt={`Thumbnail ${i + 1}`} fill sizes="150px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
