import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import EnquiryButtons from "@/components/EnquiryButtons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/queries";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.name} | Marvel Fountains` : "Product | Marvel Fountains" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(slug, 3);
  // Mobile: the short description is a big grey lead-in, the full description follows as statements
  const paragraphs = product.desc.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <Header solid title={product.name} />
      <div className="max-md:hidden">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
      </div>
      <div className="h-20 md:hidden" />

      <section className="px-7 pb-25 max-md:px-0 max-md:pb-20">
        <Link href="/products" className="inline-flex items-center gap-2 text-muted text-[13px] mb-6.5 transition-all hover:text-gold-deep hover:gap-3 max-w-[1240px] mx-auto max-md:hidden">
          <ArrowLeft size={15} /> Back to Collection
        </Link>
        <div className="max-w-[1240px] mx-auto grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.1fr_0.9fr] gap-15 items-start">
          <Reveal variant="fade-left" className="lg:sticky lg:top-[110px]">
            <ProductGallery name={product.name} thumbs={product.thumbs} />
          </Reveal>
          <Reveal variant="fade-right" className="max-md:-mt-7 max-md:px-4">
            {product.badge && (
              <div className="flex items-center gap-3.5 mb-4.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold max-md:justify-center max-md:before:hidden">
                {product.badge}
              </div>
            )}
            <h1 className="text-[clamp(28px,3.6vw,40px)] font-bold text-ink mb-4 font-serif max-md:mb-6 max-md:text-center max-md:text-[46px] max-md:leading-[1.02] max-md:tracking-[-0.035em]">{product.name}</h1>
            <div className="flex items-baseline gap-3.5 mb-6 max-md:justify-center">
              <span className="font-serif text-[30px] font-bold text-gold-deep max-md:text-[22px] max-md:font-semibold">{product.price}</span>
            </div>
            <p className="text-muted font-light mb-7.5 whitespace-pre-line max-md:hidden">{product.desc}</p>

            {/* Mobile: Fontana-style statements */}
            <div className="md:hidden">
              {product.shortDesc && (
                <p className="py-12 text-center text-[32px] leading-[1.2] tracking-[-0.025em] text-muted/70">
                  {product.shortDesc}
                </p>
              )}
              {paragraphs.map((p, i) => (
                <p key={i} className="whitespace-pre-line py-8 text-[25px] leading-[1.25] tracking-[-0.02em] text-ink">
                  {p}
                </p>
              ))}
            </div>

            {product.specs.length > 0 && (
              <div className="py-16 md:hidden">
                <h2 className="mb-10 text-[46px] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
                  Built with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-cyan">attention to detail.</span>
                </h2>
                <ul className="space-y-4">
                  {product.specs.map(([label, value]) => (
                    <li key={label} className="flex gap-3 text-[16px] leading-snug text-ink">
                      <ChevronRight size={24} strokeWidth={3.5} className="-ml-1 shrink-0 text-cyan" />
                      <span>
                        <span className="text-muted">{label}:</span> {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.specs.length > 0 && (
              <table className="w-full border-collapse mb-8.5 max-md:hidden">
                <tbody>
                  {product.specs.map(([label, value]) => (
                    <tr key={label} className="border-b border-line">
                      <td className="py-3.5 text-[11.5px] text-muted uppercase tracking-wide w-2/5">{label}</td>
                      <td className="py-3.5 text-[13.5px] text-ink font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex gap-4.5 flex-wrap mb-9 max-md:flex-col max-md:gap-3 max-md:[&_a]:w-full">
              <Link href="/contact" className="text-center rounded-full bg-gradient-to-r from-gold to-gold-deep text-navy-deep px-8.5 py-4 text-xs font-bold tracking-widest uppercase shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_14px_36px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_10px_rgba(212,175,55,0.35)]">
                Enquire Now
              </Link>
              <EnquiryButtons product={product.name} className="contents" />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal className="max-w-[1240px] mx-auto mb-7.5 px-7 max-md:mb-10 max-md:px-4">
        <div className="flex items-center gap-3.5 mb-2.5 text-gold text-xs font-semibold tracking-[3px] uppercase before:content-[''] before:w-8.5 before:h-px before:bg-gold">
          You May Also Like
        </div>
        <h3 className="text-2xl font-bold text-ink font-serif max-md:text-[40px] max-md:leading-[1.05] max-md:tracking-[-0.035em]">More From Our Collection</h3>
      </Reveal>
      <div className="max-w-[1240px] mx-auto px-7 pb-25 max-md:px-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={(i % 6) * 0.08} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
