import Image from "next/image";
import Link from "next/link";
import { getMenu, getSettings, type NavLink } from "@/lib/queries";

function LinkColumn({ title, links, external }: { title: string; links: NavLink[]; external?: boolean }) {
  return (
    <div>
      <h5 className="text-ink mb-4.5 text-[14px] tracking-wide uppercase font-semibold">{title}</h5>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={`${l.label}-${i}`}>
            {external ? (
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[14px] hover:text-gold-deep transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-[14px] hover:text-gold-deep transition-colors">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const [settings, quick, products, social] = await Promise.all([
    getSettings(),
    getMenu("footer_quick"),
    getMenu("footer_products"),
    getMenu("footer_social"),
  ]);

  return (
    <footer className="bg-sand text-muted px-7 max-md:px-4 pt-15 pb-6 border-t border-line">
      <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-11 pb-9 border-b border-line">
        <div>
          <div className="mb-3.5 inline-block bg-white rounded-lg p-2 shadow-[0_2px_10px_rgba(13,21,38,0.06)]">
            <Image src="/logo.png" alt="Marvel Fountains logo" height={52} width={120} className="h-[52px] w-auto" />
          </div>
          <p className="text-[16px] font-medium">{settings.footer_tagline}</p>
          <div className="mt-4 space-y-1.5 text-[14px]">
            {settings.contact_address && <p>{settings.contact_address}</p>}
            {settings.contact_phone && (
              <a href={`tel:${settings.contact_phone.replace(/[^\d+]/g, "")}`} className="block hover:text-gold-deep transition-colors">
                {settings.contact_phone}
              </a>
            )}
            {[settings.contact_email, settings.contact_email_2].filter(Boolean).map((e) => (
              <a key={e} href={`mailto:${e}`} className="block hover:text-gold-deep transition-colors">
                {e}
              </a>
            ))}
          </div>
        </div>
        <LinkColumn title="Quick Links" links={quick} />
        <LinkColumn title="Products" links={products} />
        <LinkColumn title="Follow Us" links={social} external />
      </div>
      <div className="max-w-[1240px] mx-auto mt-5.5 text-center text-xs text-muted">
        © 2026 Marvel Fountains. All Rights Reserved.
      </div>
    </footer>
  );
}
