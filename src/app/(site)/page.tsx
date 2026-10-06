import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import ProjectsSpotlight from "@/components/ProjectsSpotlight";
import ClientsSection from "@/components/ClientsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import {
  getBlocks,
  getHeroSlides,
  getHomeCollections,
  getProducts,
  getProjects,
  getSettings,
  getTestimonials,
} from "@/lib/queries";

function SectionHeading({ strong, rest }: { strong: string; rest: string }) {
  return (
    <Reveal className="mx-auto mb-10 w-full max-w-[1240px] px-7 max-md:px-4">
      <h2 className="text-[24px] font-normal tracking-[-0.016em] text-ink max-md:text-[46px] max-md:font-bold max-md:leading-[1.02] max-md:tracking-[-0.035em]">
        <strong className="font-semibold">{strong}</strong>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan italic max-md:not-italic">{rest}</span>
      </h2>
    </Reveal>
  );
}

export default async function Home() {
  const [slides, categories, stats, missionVision, projects, products, testimonials, settings] = await Promise.all([
    getHeroSlides(),
    getHomeCollections(),
    getBlocks("home_stats"),
    getBlocks("home_mission"),
    getProjects(),
    getProducts(),
    getTestimonials(true),
    getSettings(),
  ]);
  const phone = settings.contact_phone ?? "";

  return (
    <>
      <Header />
      <HeroSlider slides={slides} />

      {/* Category tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group relative block h-[50vw] overflow-hidden bg-navy-deep lg:h-[25vw]"
          >
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-[transform,filter] duration-[1400ms] ease-[cubic-bezier(.33,1,.68,1)] group-hover:scale-[1.05] group-hover:saturate-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/10 to-transparent" />
            <span className="absolute top-0 left-0 z-[1] p-7 text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-white lg:text-[26px] lg:font-semibold transition-colors group-hover:text-gold max-md:p-5">
              {c.title}
            </span>
          </Link>
        ))}
        <Link
          href="/products"
          className="group relative flex h-[50vw] bg-sand transition-colors duration-300 hover:bg-gold lg:h-[25vw]"
        >
          <span className="p-7 text-[20px] font-medium tracking-[-0.02em] text-ink lg:text-[26px] lg:font-semibold transition-colors group-hover:text-navy-deep max-md:p-5">
            All Products +
          </span>
        </Link>
      </section>

      {/* Intro */}
      <section className="bg-navy-deep px-7 py-28 max-md:px-4 max-md:py-24">
        <div className="mx-auto max-w-[860px]">
          <Reveal>
            <ul className="mb-10 flex flex-wrap gap-x-9 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.4px] text-muted">
              <li className="text-gold">Marvel Fountains</li>
              {stats.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-6 text-[19px] leading-[1.5] font-light text-muted md:text-[22px] max-md:mb-16 max-md:text-[25px] max-md:leading-[1.25] max-md:font-normal max-md:tracking-[-0.02em]">
              <strong className="font-medium text-ink max-md:font-normal">
                One of the leading &amp; largest designers and manufacturers of fountains, based in{" "}
                <span className="max-md:text-transparent max-md:bg-clip-text max-md:bg-gradient-to-r max-md:from-gold max-md:to-cyan">
                  Ahmedabad, Gujarat
                </span>
                .
              </strong>{" "}
              Founded in 1998, we build all types of static, programmable, architectural, floating, sequential and
              musical fountains — always looking for new creative &amp; innovative solutions for our customers.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[19px] leading-[1.5] font-light text-muted md:text-[22px] max-md:text-[25px] max-md:leading-[1.25] max-md:font-normal max-md:tracking-[-0.02em]">
              We undertake turnkey jobs — survey, design, supply and installation of all types of fountains, water
              games and musical dancing fountains, to your requirements or our own designs — along with servicing
              &amp; maintenance contracts.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {missionVision.map((m, i) => (
              <Reveal key={m.title} delay={0.1 + i * 0.1}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-gold">{m.title}</div>
                <p className="text-[15.5px] font-light leading-relaxed text-muted">{m.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="mt-10">
            <Link href="/about" className="arrow-link text-[17px] font-medium text-ink transition-colors hover:text-gold">
              More about us
            </Link>
          </Reveal>
        </div>
      </section>

      <ClientsSection />

      {/* Projects spotlight */}
      <section className="bg-sand pt-24 pb-6">
        <SectionHeading strong="Projects" rest="Spotlight" />
        <ProjectsSpotlight projects={projects} />
        <div className="text-center">
          <Link
            href="/projects"
            className="arrow-link inline-block px-8 py-10 text-[20px] font-medium text-ink transition-colors hover:text-gold"
          >
            Explore our work
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24">
        <SectionHeading strong="Featured" rest="Products" />
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-3 px-4 sm:gap-6 sm:px-7 lg:grid-cols-3">
          {products.slice(0, 6).map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={(i % 6) * 0.08} />
          ))}
        </div>
      </section>

      {/* Testimonials — hidden until there are reviews */}
      {testimonials.length > 0 && (
        <section className="bg-sand py-24">
          <SectionHeading strong="Client" rest="Stories" />
          <TestimonialSlider testimonials={testimonials} />
          <div className="mx-auto mt-8 max-w-[1240px] px-7 max-md:px-4">
            <Link
              href="/reviews"
              className="arrow-link text-[18px] font-medium text-ink transition-colors hover:text-gold"
            >
              Read all reviews
            </Link>
          </div>
        </section>
      )}

      {/* Contact band */}
      <section className="bg-navy-deep px-7 py-32 max-md:px-4 max-md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <h3 className="text-[36px] font-normal leading-[1.15] tracking-[-0.013em] text-muted md:text-[56px] max-md:text-[40px] max-md:leading-[1.08] max-md:tracking-[-0.03em]">
            Want to{" "}
            <Link
              href="/contact"
              className="relative inline-block italic text-gold after:absolute after:left-0 after:-bottom-0.5 after:h-1 after:w-full after:bg-cyan after:transition-[width] after:duration-500 hover:after:w-0"
            >
              create
            </Link>
            <br />
            <span className="text-ink">something beautiful?</span>
          </h3>
          <ul className="mt-12 flex flex-wrap gap-x-[60px] gap-y-4 text-[18px] font-medium">
            <li>
              <Link href="/contact" className="arrow-link text-ink transition-colors hover:text-gold">
                Get in touch
              </Link>
            </li>
            <li>
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="arrow-link text-ink transition-colors hover:text-gold">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
