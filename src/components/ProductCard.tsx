import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/queries";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal variant="zoom-in" delay={delay} className="flex [perspective:1200px]">
      <TiltCard max={8} className="w-full">
        <Link
          href={`/products/${product.slug}`}
          className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_2px_10px_rgba(13,21,38,0.05),0_20px_40px_-25px_rgba(13,21,38,0.25)] transition-shadow duration-400 ease-[cubic-bezier(.25,.8,.35,1)] hover:shadow-[0_35px_60px_-20px_rgba(13,21,38,0.35)] hover:border-gold/40"
        >
          <div className="relative h-[140px] overflow-hidden sm:h-[220px] bg-navy [transform-style:preserve-3d]">
            {product.badge && (
              <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-[2] rounded-full bg-gradient-to-r from-gold to-gold-deep text-navy-deep text-[8px] sm:text-[10px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 tracking-wider sm:tracking-widest uppercase shadow-[0_8px_16px_rgba(212,175,55,0.4)] [transform:translateZ(40px)]">
                {product.badge}
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-1 flex-col p-3.5 sm:p-7 [transform:translateZ(20px)]">
            <h3 className="text-[16px] leading-tight sm:text-[18px] text-ink mb-1.5 sm:mb-2.5 font-medium">{product.name}</h3>
            <p className="text-muted text-[13px] sm:text-[15px] flex-1 mb-3 sm:mb-5 font-light line-clamp-2 sm:line-clamp-none">{product.shortDesc}</p>
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-3 sm:pt-4.5 border-t border-line">
              <span className="font-semibold text-navy text-[16px]">{product.price}</span>
              <span className="text-gold-deep font-semibold text-[10.5px] sm:text-xs tracking-wide uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                View Product <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
