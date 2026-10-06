import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <div className="pt-[150px] pb-10 px-7 max-md:px-4 max-w-[1240px] mx-auto text-xs tracking-wide uppercase text-muted max-md:pt-[110px]">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? (
            <Link href={item.href} className="text-gold">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
          {i < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </div>
  );
}
