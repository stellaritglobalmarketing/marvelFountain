import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import CategoryTile from "@/components/CategoryTile";
import ProductFilterGrid from "@/components/ProductFilterGrid";
import { getCategories, getProducts, getSettings } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Products | Marvel Fountains" };

const underlined =
  "relative inline-block italic text-gold max-md:inline max-md:not-italic max-md:text-cyan max-md:after:hidden transition-colors hover:text-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-[3px] after:w-full after:bg-cyan/70 after:transition-[width] after:duration-500 hover:after:w-0";

export default async function ProductsPage() {
  const [categories, products, settings] = await Promise.all([getCategories(), getProducts(), getSettings()]);
  const categoryBySlug = Object.fromEntries(products.map((p) => [p.slug, p.category]));
  const tabs = categories.map((c) => c.label).filter((label) => products.some((p) => p.category === label));

  return (
    <>
      <Header title="Products" />
      <PageHero
        title="Products"
        intro="Marvel offers a complete range of fountains for gardens, homes, hotels, lakes and public spaces."
        image={settings.hero_image_products ?? ""}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      {/* Statement */}
      <section className="px-7 py-24 max-md:px-4 max-md:py-20">
        <Reveal className="mx-auto max-w-[1240px]">
          <h3 className="max-w-[980px] text-[clamp(24px,3.2vw,38px)] font-bold font-serif leading-[1.35] text-ink max-md:text-[34px] max-md:font-normal max-md:leading-[1.2] max-md:tracking-[-0.025em]">
            We manufacture{" "}
            <a href="#outdoor" className={underlined}>
              outdoor fountains
            </a>
            , elegant{" "}
            <a href="#indoor" className={underlined}>
              indoor water features
            </a>{" "}
            and complete{" "}
            <a href="#custom" className={underlined}>
              custom installations
            </a>
            .
          </h3>
          <p className="mt-6 max-w-[640px] text-[15.5px] font-light text-muted max-md:mt-10 max-md:text-[17px]">
            Every product follows the same premium build quality — high-grade materials, weatherproof finishes and
            precision pumps for silent, reliable performance.
          </p>
        </Reveal>
        {/* Mobile: Fontana-style rounded link cards */}
        <div className="mt-14 flex flex-col gap-3 md:hidden">
          {categories.filter((g) => g.collections.length > 0).map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.06}>
              <a
                href={`#${g.slug}`}
                className="flex min-h-[70px] items-center justify-between rounded-[26px] bg-white/[0.04] px-6 text-[19px] font-medium tracking-[-0.01em] text-ink transition-colors active:bg-white/[0.08]"
              >
                {g.name}
                <span className="text-[13px] font-normal text-muted">{g.collections.length}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Category groups */}
      {categories.filter((g) => g.collections.length > 0).map((g) => (
        <section key={g.slug} id={g.slug} className="scroll-mt-24 px-7 pb-20 max-md:scroll-mt-16 max-md:px-4">
          <Reveal className="mx-auto mb-8 flex max-w-[1240px] items-end justify-between gap-6 max-md:flex-col-reverse max-md:items-start max-md:gap-3">
            <h2 className="text-[clamp(24px,3vw,32px)] font-bold font-serif text-ink max-md:text-[40px] max-md:leading-[1.05] max-md:tracking-[-0.035em]">{g.name}</h2>
            <span className="text-xs font-semibold uppercase tracking-[3px] text-gold">
              {String(g.collections.length).padStart(2, "0")} Collections
            </span>
          </Reveal>
          <div
            className={`mx-auto grid max-w-[1240px] grid-cols-2 gap-4 max-md:gap-3 ${
              g.collections.length > 2 ? "lg:grid-cols-4" : "lg:grid-cols-2"
            }`}
          >
            {g.collections.map((t, i) => (
              <CategoryTile
                key={t.title}
                index={i}
                title={t.title}
                subtitle={t.subtitle}
                href={t.href}
                image={t.image}
                className={g.collections.length > 2 ? "aspect-[3/4]" : "aspect-[3/4] lg:aspect-[16/10]"}
              />
            ))}
          </div>
        </section>
      ))}

      {/* All products */}
      <section className="bg-sand px-7 py-24 max-md:px-4 max-md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="mb-8 max-w-[640px]">
            <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
              Our Range
            </div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-ink font-serif max-md:text-[44px] max-md:leading-[1.02] max-md:tracking-[-0.035em]">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic">Products</span>
            </h2>
          </Reveal>
          <ProductFilterGrid products={products} categoryBySlug={categoryBySlug} tabs={tabs} />
          <Reveal className="mt-14 text-center">
            <p className="text-muted font-light">
              Need something different?{" "}
              <Link href="/contact" className="arrow-link font-semibold text-ink transition-colors hover:text-gold">
                Talk to our design team
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </>
  );
}
