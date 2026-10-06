import { cache } from "react";
import { query } from "./db";

// Public-site reads. Each is wrapped in React `cache` so a page and its header/footer
// share one query per render; the rendered pages themselves are cached by Next and
// refreshed whenever the admin panel saves a change (see lib/admin/actions.ts).

export type NavLink = { label: string; href: string };

export type Product = {
  id: number;
  slug: string;
  name: string;
  badge: string;
  price: string;
  shortDesc: string;
  desc: string;
  image: string;
  thumbs: string[];
  specs: [string, string][];
  category: string; // category filter label, e.g. "Outdoor"
};

export type Collection = { title: string; homeTitle: string; subtitle: string; href: string; image: string };
export type Category = { slug: string; name: string; label: string; collections: Collection[] };
export type Project = { place: string; title: string; image: string };
export type GalleryPhoto = { src: string; alt: string; category: string };
export type GalleryVideo = { id: string; title: string; category: string };
export type Testimonial = { quote: string; name: string; role: string; initial: string };
export type HeroSlide = { eyebrow: string; title: string; subtitle: string; href: string; video?: string; image?: string };
export type Block = { value: string; title: string; body: string };

export const formatPrice = (rupees: number | null) =>
  rupees == null ? "Price on request" : `₹${rupees.toLocaleString("en-IN")}`;

export const getProducts = cache(async (): Promise<Product[]> => {
  const [rows, images, specs] = await Promise.all([
    query<{
      id: number;
      slug: string;
      name: string;
      badge: string;
      price: number | null;
      short_desc: string;
      description: string;
      label: string | null;
    }>(
      `SELECT p.id, p.slug, p.name, p.badge, p.price, p.short_desc, p.description, c.label
       FROM products p LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.is_active = 1 ORDER BY p.sort_order, p.id`
    ),
    query<{ product_id: number; url: string }>(
      "SELECT product_id, url FROM product_images ORDER BY product_id, sort_order, id"
    ),
    query<{ product_id: number; label: string; value: string }>(
      "SELECT product_id, label, value FROM product_specs ORDER BY product_id, sort_order, id"
    ),
  ]);

  return rows.map((r) => {
    const thumbs = images.filter((i) => i.product_id === r.id).map((i) => i.url);
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      badge: r.badge,
      price: formatPrice(r.price),
      shortDesc: r.short_desc,
      desc: r.description,
      image: thumbs[0] ?? "/logo.png",
      thumbs,
      specs: specs.filter((s) => s.product_id === r.id).map((s) => [s.label, s.value] as [string, string]),
      category: r.label ?? "",
    };
  });
});

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getRelatedProducts(slug: string, count = 3) {
  const products = await getProducts();
  const idx = products.findIndex((p) => p.slug === slug);
  const rest = products.filter((p) => p.slug !== slug);
  // rotate starting after current index for variety
  const start = idx >= 0 && rest.length ? idx % rest.length : 0;
  return [...rest.slice(start), ...rest.slice(0, start)].slice(0, count);
}

export const getCategories = cache(async (): Promise<Category[]> => {
  const [cats, cols] = await Promise.all([
    query<{ id: number; slug: string; name: string; label: string }>(
      "SELECT id, slug, name, label FROM categories ORDER BY sort_order, id"
    ),
    query<{ category_id: number; title: string; home_title: string | null; subtitle: string; href: string; image: string }>(
      "SELECT category_id, title, home_title, subtitle, href, image FROM collections ORDER BY sort_order, id"
    ),
  ]);
  return cats.map((c) => ({
    slug: c.slug,
    name: c.name,
    label: c.label,
    collections: cols
      .filter((col) => col.category_id === c.id)
      .map((col) => ({
        title: col.title,
        homeTitle: col.home_title || col.title,
        subtitle: col.subtitle,
        href: col.href,
        image: col.image,
      })),
  }));
});

export const getHomeCollections = cache(async () => {
  const rows = await query<{ title: string; home_title: string | null; href: string; image: string }>(
    "SELECT title, home_title, href, image FROM collections WHERE home_order IS NOT NULL ORDER BY home_order, id"
  );
  return rows.map((r) => ({ title: r.home_title || r.title, href: r.href, image: r.image }));
});

export const getProjects = cache(() =>
  query<Project>("SELECT place, title, image FROM projects ORDER BY sort_order, id")
);

// Categories with show_in_gallery = 0 (e.g. Press & Media) only appear on their own page
export const getGalleryCategories = cache(async () =>
  (
    await query<{ name: string }>("SELECT name FROM gallery_categories WHERE show_in_gallery = 1 ORDER BY sort_order, id")
  ).map((r) => r.name)
);

export const getGalleryPhotos = cache(() =>
  query<GalleryPhoto>(
    `SELECT p.src, p.alt, c.name AS category
     FROM gallery_photos p JOIN gallery_categories c ON c.id = p.category_id
     WHERE c.show_in_gallery = 1
     ORDER BY p.sort_order, p.id`
  )
);

export const getPhotosInCategory = cache((category: string) =>
  query<GalleryPhoto>(
    `SELECT p.src, p.alt, c.name AS category
     FROM gallery_photos p JOIN gallery_categories c ON c.id = p.category_id
     WHERE c.name = ?
     ORDER BY p.sort_order, p.id`,
    [category]
  )
);

export const getVideos = cache(() =>
  query<GalleryVideo>("SELECT youtube_id AS id, title, category FROM videos ORDER BY sort_order, id")
);

export const getTestimonials = cache(async (homeOnly = false): Promise<Testimonial[]> => {
  const rows = await query<{ quote: string; name: string; role: string }>(
    `SELECT quote, name, role FROM testimonials ${homeOnly ? "WHERE on_home = 1" : ""} ORDER BY sort_order, id`
  );
  return rows.map((r) => ({ ...r, initial: r.name.trim().charAt(0).toUpperCase() }));
});

export const getClientLogos = cache(async () =>
  (await query<{ logo: string }>("SELECT logo FROM clients ORDER BY sort_order, id")).map((r) => r.logo)
);

export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => {
  const rows = await query<{ eyebrow: string; title: string; subtitle: string; href: string; video: string | null; image: string | null }>(
    "SELECT eyebrow, title, subtitle, href, video, image FROM hero_slides ORDER BY sort_order, id"
  );
  return rows.map((r) => ({
    eyebrow: r.eyebrow,
    title: r.title,
    subtitle: r.subtitle,
    href: r.href,
    ...(r.video ? { video: r.video } : { image: r.image || "/logo.png" }),
  }));
});

const getAllBlocks = cache(() =>
  query<Block & { section: string; body: string | null }>(
    "SELECT section, value, title, body FROM content_blocks ORDER BY section, sort_order, id"
  )
);

export async function getBlocks(section: string): Promise<Block[]> {
  return (await getAllBlocks())
    .filter((b) => b.section === section)
    .map((b) => ({ value: b.value, title: b.title, body: b.body ?? "" }));
}

const getAllMenuLinks = cache(() =>
  query<NavLink & { menu: string }>("SELECT menu, label, href FROM menu_links ORDER BY menu, sort_order, id")
);

export async function getMenu(menu: string): Promise<NavLink[]> {
  return (await getAllMenuLinks()).filter((l) => l.menu === menu).map(({ label, href }) => ({ label, href }));
}

export const getSettings = cache(async () => {
  const rows = await query<{ k: string; v: string }>("SELECT k, v FROM settings");
  return Object.fromEntries(rows.map((r) => [r.k, r.v])) as Record<string, string | undefined>;
});
