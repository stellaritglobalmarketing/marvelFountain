import HeaderClient, { type NavItem } from "./HeaderClient";
import { getCategories, getGalleryCategories, getMenu, getVideos } from "@/lib/queries";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Server half of the header: builds the mega menus from the database, then hands
// them to the interactive client header.
export default async function Header({ solid = false, title }: { solid?: boolean; title?: string }) {
  const [categories, photoCategories, videos, productsRec, productsBtns, galleryRec, galleryBtns] = await Promise.all([
    getCategories(),
    getGalleryCategories(),
    getVideos(),
    getMenu("header_products_recommended"),
    getMenu("header_products_buttons"),
    getMenu("header_gallery_recommended"),
    getMenu("header_gallery_buttons"),
  ]);

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    {
      href: "/products",
      label: "Products",
      mega: {
        recommended: productsRec,
        buttons: productsBtns,
        columns: categories
        .filter((c) => c.collections.length > 0)
        .map((c) => ({
            title: c.name,
            viewAll: `/products#${c.slug}`,
            links: c.collections.map((col) => ({ label: col.title, href: col.href })),
          })),
      },
    },
    { href: "/projects", label: "Projects" },
    {
      href: "/gallery",
      label: "Gallery",
      mega: {
        recommended: galleryRec,
        buttons: galleryBtns,
        columns: [
          {
            title: "Photos",
            viewAll: "/gallery#photos",
            links: photoCategories.map((c) => ({ label: c, href: `/gallery#${slug(c)}` })),
          },
          {
            title: "Videos",
            viewAll: "/gallery#videos",
            links: videos.slice(0, 5).map((v) => ({ label: v.title, href: "/gallery#videos" })),
          },
        ],
      },
    },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
  ];

  return <HeaderClient navItems={navItems} solid={solid} title={title} />;
}
