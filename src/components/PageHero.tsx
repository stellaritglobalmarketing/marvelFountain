import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href?: string };

// Desktop: title over a full-bleed photo. Mobile (Fontana-style): the photo sits under the
// solid header on its own, and a big centred title follows on the page background.
export default function PageHero({
  title,
  image,
  crumbs,
  tall = false,
  intro,
  children,
}: {
  title: React.ReactNode;
  image: string;
  crumbs: Crumb[];
  tall?: boolean;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <>
      <section
        className={`relative overflow-hidden bg-paper md:flex md:items-end md:bg-navy-deep ${
          tall ? "md:min-h-[88vh]" : "md:min-h-[58vh]"
        }`}
      >
        <div className="relative overflow-hidden bg-navy-deep max-md:mt-20 max-md:h-[72svh] md:absolute md:inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover animate-kenburns" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(6,10,19,0.6),rgba(6,10,19,0.35)_45%,rgba(6,10,19,0.95))] md:block" />
          <div className="absolute -inset-[5%] hidden bg-[radial-gradient(circle_at_75%_30%,rgba(212,175,55,0.18),transparent_55%)] md:block" />
        </div>

        <div
          className={`relative z-[1] mx-auto w-full max-w-[1240px] px-7 md:pt-[150px] md:pb-16 max-md:px-4 max-md:pt-24 max-md:pb-6 ${
            tall ? "" : "max-md:text-center"
          }`}
        >
          <nav className="animate-hero-rise mb-6 text-xs uppercase tracking-wide text-[#cfd0d1] max-md:hidden">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {c.href ? (
                  <Link href={c.href} className="text-gold hover:text-cyan transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  c.label
                )}
                {i < crumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
          <h1
            className={`animate-hero-rise leading-[1.12] text-white max-md:text-[46px] max-md:font-bold max-md:leading-[1.02] max-md:tracking-[-0.035em] max-md:text-ink ${
              tall ? "max-w-[980px] text-[36px] font-normal md:text-[52px] lg:text-[68px]" : "text-[44px] font-semibold md:text-[68px]"
            }`}
            style={{ animationDelay: "0.12s" }}
          >
            {title}
          </h1>
          {children && (
            <div className="animate-hero-rise mt-6 max-md:mt-8 max-md:flex max-md:justify-center" style={{ animationDelay: "0.28s" }}>
              {children}
            </div>
          )}
        </div>
      </section>

      {/* Mobile: large grey lead-in under the title */}
      {intro && (
        <p className="bg-paper px-4 pt-14 pb-6 text-center text-[34px] font-normal leading-[1.2] tracking-[-0.025em] text-muted/70 md:hidden">
          {intro}
        </p>
      )}
    </>
  );
}
