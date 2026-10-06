import Link from "next/link";
import EnquiryButtons from "./EnquiryButtons";

export default function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-sand via-sand to-gold-soft/30 text-center relative overflow-hidden px-7 max-md:px-4 py-30 border-y border-line">
      <div className="absolute -inset-[10%] bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.14),transparent_55%)] animate-kenburns" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(11,18,32,0.05),transparent_45%)]" />
      <div className="max-w-[1240px] mx-auto relative z-[2]">
        <h2 className="text-[32px] mb-4 font-semibold tracking-[-0.02em] text-ink md:text-[46px]">
          Ready to Add a Fountain to Your Space?
        </h2>
        <p className="text-muted mb-8.5 text-[18px] font-light">
          Get a free consultation and custom quote from our design team today.
        </p>
        <Link
          href="/contact"
          className="relative overflow-hidden inline-block rounded-full bg-gradient-to-r from-gold to-gold-deep text-navy-deep px-9 py-4 text-xs font-bold tracking-widest uppercase shadow-[0_10px_30px_rgba(240,194,75,0.35)] transition-all hover:shadow-[0_14px_36px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_10px_rgba(212,175,55,0.35)]"
        >
          Get Free Quote
        </Link>
        <EnquiryButtons className="mt-5 justify-center" />
      </div>
    </section>
  );
}
