// Describes every table the admin panel can edit. Table and column names only ever
// come from this file — never from the request — so they are safe to put in SQL.
// Wording here is shown to the site owner, so keep it plain and non-technical.

export type Option = { value: string; label: string };

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "image" | "video" | "number" | "checkbox" | "select";
  required?: boolean;
  nullable?: boolean; // empty input is stored as NULL
  help?: string;
  placeholder?: string;
  advanced?: boolean; // tucked away under "Advanced options"
  options?: Option[]; // static select options
  optionsFrom?: { table: string; label: string; orderBy: string }; // select options from another table (value = id)
};

export type ChildList = {
  name: string;
  label: string;
  table: string;
  fk: string;
  help?: string;
  addLabel: string;
  columns: { name: string; label: string; type: "text" | "image" }[];
};

export type Display = {
  image?: string; // list column holding an image / video URL
  youtube?: string; // list column holding a YouTube id
  title: string;
  subtitle?: string;
  flag?: { column: string; on: string; off?: string }; // small yes/no badge
};

export type Resource = {
  key: string;
  label: string;
  singular: string;
  icon: string; // lucide icon name, mapped in components/admin/icons.ts
  description: string;
  advanced?: boolean; // listed under "More settings" in the sidebar
  table: string;
  listSql: string; // must select `id` plus every column used in `display` / `groupBy`
  view: "cards" | "rows";
  display: Display;
  groupBy?: { column: string; label?: string; options?: Option[] }; // list headings; reordering stays inside a group
  fields: Field[];
  children?: ChildList[];
  deleteWarning?: string;
};

export const contentSections: Option[] = [
  { value: "home_stats", label: "Home page — short facts line" },
  { value: "about_story", label: "About page — company story paragraphs" },
  { value: "about_designs", label: "About page — fountain designs list" },
  { value: "about_services", label: "About page — musical fountain & services list" },
  { value: "home_mission", label: "Home page — Vision & Mission" },
  { value: "about_stats", label: "About page — big numbers" },
  { value: "about_strengths_a", label: "About page — strengths (next to video)" },
  { value: "about_strengths_b", label: "About page — strengths (next to photo)" },
  { value: "about_process", label: "About page — how we work steps" },
  { value: "projects_stats", label: "Projects page — numbers" },
];

export const menus: Option[] = [
  { value: "header_products_recommended", label: "Top menu → Products → Recommended" },
  { value: "header_products_buttons", label: "Top menu → Products → Buttons (first 2)" },
  { value: "header_gallery_recommended", label: "Top menu → Gallery → Recommended" },
  { value: "header_gallery_buttons", label: "Top menu → Gallery → Buttons (first 2)" },
  { value: "footer_quick", label: "Footer → Quick Links" },
  { value: "footer_products", label: "Footer → Products" },
  { value: "footer_social", label: "Footer → Follow Us" },
];

export const resources: Resource[] = [
  {
    key: "products",
    label: "Products",
    singular: "Product",
    icon: "package",
    description: "The fountains shown on the Products page and the home page.",
    table: "products",
    listSql: `SELECT p.id, p.name, p.price, p.badge, p.is_active, c.label AS category,
                (SELECT url FROM product_images i WHERE i.product_id = p.id ORDER BY i.sort_order, i.id LIMIT 1) AS image,
                CONCAT_WS(' · ', c.label, IF(p.price IS NULL, 'Price on request', CONCAT('₹', FORMAT(p.price, 0, 'en_IN')))) AS info
              FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.sort_order, p.id`,
    view: "cards",
    display: { image: "image", title: "name", subtitle: "info", flag: { column: "is_active", on: "Visible", off: "Hidden" } },
    fields: [
      { name: "name", label: "Product name", type: "text", required: true, placeholder: "e.g. Classic Garden Fountain" },
      {
        name: "category_id",
        label: "Type",
        type: "select",
        nullable: true,
        optionsFrom: { table: "categories", label: "name", orderBy: "sort_order, id" },
      },
      { name: "price", label: "Price in ₹", type: "number", nullable: true, placeholder: "e.g. 18999", help: "Only numbers, no commas or ₹ sign. Leave empty to show “Price on request”." },
      { name: "badge", label: "Small label on the photo", type: "text", placeholder: "e.g. Bestseller, New, Popular" },
      { name: "short_desc", label: "Short description", type: "textarea", help: "One line shown on the product card." },
      { name: "description", label: "Full description", type: "textarea", required: true, help: "Shown on the product’s own page." },
      { name: "is_active", label: "Show this product on the website", type: "checkbox", help: "Untick to hide it without deleting it." },
      {
        name: "slug",
        label: "Web address",
        type: "text",
        advanced: true,
        help: "The end of the page link, e.g. classic-garden-fountain. Leave empty and it is made from the name.",
      },
    ],
    children: [
      {
        name: "images",
        label: "Photos",
        table: "product_images",
        fk: "product_id",
        addLabel: "Add another photo",
        help: "The first photo is the main one. Use the arrows to change the order.",
        columns: [{ name: "url", label: "Photo", type: "image" }],
      },
      {
        name: "specs",
        label: "Specifications",
        table: "product_specs",
        fk: "product_id",
        addLabel: "Add a specification",
        help: "For example: Material — Stone finish, Height — 4 ft.",
        columns: [
          { name: "label", label: "Name (e.g. Height)", type: "text" },
          { name: "value", label: "Detail (e.g. 4 ft)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "gallery-photos",
    label: "Photo Gallery",
    singular: "Photo",
    icon: "image",
    description: "Photos on the Gallery page.",
    table: "gallery_photos",
    listSql: `SELECT p.id, p.src, p.alt, c.name AS category
              FROM gallery_photos p JOIN gallery_categories c ON c.id = p.category_id ORDER BY p.sort_order, p.id`,
    view: "cards",
    display: { image: "src", title: "alt", subtitle: "category" },
    fields: [
      { name: "src", label: "Photo", type: "image", required: true },
      { name: "alt", label: "Caption", type: "text", required: true, placeholder: "e.g. Dancing fountain at night" },
      {
        name: "category_id",
        label: "Category",
        type: "select",
        required: true,
        optionsFrom: { table: "gallery_categories", label: "name", orderBy: "sort_order, id" },
      },
    ],
  },
  {
    key: "videos",
    label: "Videos",
    singular: "Video",
    icon: "video",
    description: "YouTube videos on the Gallery page.",
    table: "videos",
    listSql: "SELECT id, youtube_id, title, category FROM videos ORDER BY sort_order, id",
    view: "cards",
    display: { youtube: "youtube_id", title: "title", subtitle: "category" },
    fields: [
      {
        name: "youtube_id",
        label: "YouTube link",
        type: "text",
        required: true,
        placeholder: "https://www.youtube.com/watch?v=…",
        help: "Open the video on YouTube, copy the address from the top of the browser and paste it here.",
      },
      { name: "title", label: "Video title", type: "text", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "e.g. Musical, Indoor, Outdoor" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    singular: "Project",
    icon: "building",
    description: "Finished installations shown on the home page and Projects page.",
    table: "projects",
    listSql: "SELECT id, image, title, place FROM projects ORDER BY sort_order, id",
    view: "cards",
    display: { image: "image", title: "title", subtitle: "place" },
    fields: [
      { name: "image", label: "Photo", type: "image", required: true },
      { name: "title", label: "Project name", type: "text", required: true, placeholder: "e.g. Hotel Lobby Fountain" },
      { name: "place", label: "Type of place", type: "text", required: true, placeholder: "e.g. Commercial, Residential, Hotel" },
    ],
  },
  {
    key: "testimonials",
    label: "Customer Reviews",
    singular: "Review",
    icon: "star",
    description: "What customers say — shown on the Reviews page (and some on the home page).",
    table: "testimonials",
    listSql: "SELECT id, name, role, on_home, LEFT(quote, 140) AS quote FROM testimonials ORDER BY sort_order, id",
    view: "rows",
    display: { title: "name", subtitle: "quote", flag: { column: "on_home", on: "On home page" } },
    fields: [
      { name: "name", label: "Customer name", type: "text", required: true },
      { name: "role", label: "Who they are", type: "text", placeholder: "e.g. Homeowner, Jaipur" },
      { name: "quote", label: "What they said", type: "textarea", required: true },
      { name: "on_home", label: "Also show on the home page", type: "checkbox" },
    ],
  },
  {
    key: "clients",
    label: "Client Logos",
    singular: "Client logo",
    icon: "badge",
    description: "Logos in the moving “Our Clients” strip on the home page.",
    table: "clients",
    listSql: "SELECT id, logo, name FROM clients ORDER BY sort_order, id",
    view: "cards",
    display: { image: "logo", title: "name" },
    fields: [
      { name: "logo", label: "Logo", type: "image", required: true },
      { name: "name", label: "Client name", type: "text", help: "Optional — only for your reference." },
    ],
  },
  {
    key: "hero-slides",
    label: "Home Slider",
    singular: "Slide",
    icon: "slides",
    description: "The big rotating pictures at the top of the home page.",
    table: "hero_slides",
    listSql: "SELECT id, COALESCE(video, image) AS media, title, subtitle FROM hero_slides ORDER BY sort_order, id",
    view: "cards",
    display: { image: "media", title: "title", subtitle: "subtitle" },
    fields: [
      { name: "image", label: "Photo", type: "image", nullable: true },
      { name: "video", label: "Video (optional)", type: "video", nullable: true, help: "If you add a video, it plays instead of the photo." },
      { name: "eyebrow", label: "Small text above the title", type: "text", placeholder: "e.g. Outdoor" },
      { name: "title", label: "Big title", type: "text", required: true },
      { name: "subtitle", label: "Line under the title", type: "text" },
      {
        name: "href",
        label: "“Discover” button opens",
        type: "text",
        advanced: true,
        help: "A page of this website, e.g. /products or /products/classic-garden-fountain",
      },
    ],
  },

  // ---- "More settings" (rarely needed) ----
  {
    key: "categories",
    label: "Product Types",
    singular: "Product type",
    icon: "folder",
    description: "Groups on the Products page: Outdoor, Indoor, Custom.",
    advanced: true,
    table: "categories",
    listSql: "SELECT id, name, label FROM categories ORDER BY sort_order, id",
    view: "rows",
    display: { title: "name", subtitle: "label" },
    fields: [
      { name: "name", label: "Heading", type: "text", required: true, placeholder: "e.g. Outdoor Fountains" },
      { name: "label", label: "Short name (filter button)", type: "text", required: true, placeholder: "e.g. Outdoor" },
      { name: "slug", label: "Link name", type: "text", required: true, advanced: true, help: "Lowercase, no spaces, e.g. outdoor" },
    ],
    deleteWarning: "Its collection tiles will be deleted too. Products of this type stay, but without a type.",
  },
  {
    key: "collections",
    label: "Collection Tiles",
    singular: "Collection tile",
    icon: "grid",
    description: "Picture tiles on the Products page, the home page and the top menu.",
    advanced: true,
    table: "collections",
    listSql: `SELECT co.id, co.image, co.title, co.subtitle, co.category_id, c.name AS category
              FROM collections co JOIN categories c ON c.id = co.category_id ORDER BY c.sort_order, co.sort_order, co.id`,
    view: "cards",
    display: { image: "image", title: "title", subtitle: "subtitle" },
    groupBy: { column: "category_id", label: "category" },
    fields: [
      { name: "image", label: "Photo", type: "image", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Line under the title", type: "text" },
      {
        name: "category_id",
        label: "Product type",
        type: "select",
        required: true,
        optionsFrom: { table: "categories", label: "name", orderBy: "sort_order, id" },
      },
      { name: "href", label: "Opens page", type: "text", required: true, help: "e.g. /products/classic-garden-fountain or /contact" },
      { name: "home_title", label: "Different title on the home page", type: "text", nullable: true, advanced: true, help: "Optional." },
      { name: "home_order", label: "Position on the home page", type: "number", nullable: true, advanced: true, help: "1 = first. Leave empty to hide it on the home page." },
    ],
  },
  {
    key: "gallery-categories",
    label: "Gallery Categories",
    singular: "Gallery category",
    icon: "folder",
    description: "Filter buttons above the photo gallery.",
    advanced: true,
    table: "gallery_categories",
    listSql: "SELECT id, name, show_in_gallery FROM gallery_categories ORDER BY sort_order, id",
    view: "rows",
    display: { title: "name", flag: { column: "show_in_gallery", on: "On Gallery page", off: "Own page only" } },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "show_in_gallery",
        label: "Show on the Gallery page",
        type: "checkbox",
        help: "Untick for categories that have their own page, like “Press & Media”.",
      },
    ],
    deleteWarning: "Every photo in this category will be deleted too.",
  },
  {
    key: "content",
    label: "Page Text Lists",
    singular: "Text item",
    icon: "text",
    description: "Small lists on pages: numbers, Vision & Mission, strengths and work steps.",
    advanced: true,
    table: "content_blocks",
    listSql: "SELECT id, section, value, title, body FROM content_blocks ORDER BY section, sort_order, id",
    view: "rows",
    display: { title: "title", subtitle: "body" },
    groupBy: { column: "section", options: contentSections },
    fields: [
      { name: "section", label: "Where it shows", type: "select", required: true, options: contentSections },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "value", label: "Number", type: "text", help: "Only for numbers (e.g. 1200+ or 98%) and steps (01, 02 …)." },
      { name: "body", label: "Text", type: "textarea", nullable: true },
    ],
  },
  {
    key: "menus",
    label: "Menu Links",
    singular: "Menu link",
    icon: "link",
    description: "Links in the top menu and the footer.",
    advanced: true,
    table: "menu_links",
    listSql: "SELECT id, menu, label, href FROM menu_links ORDER BY menu, sort_order, id",
    view: "rows",
    display: { title: "label", subtitle: "href" },
    groupBy: { column: "menu", options: menus },
    fields: [
      { name: "menu", label: "Which menu", type: "select", required: true, options: menus },
      { name: "label", label: "Text", type: "text", required: true },
      { name: "href", label: "Opens", type: "text", required: true, help: "A page like /products, or a full link like https://instagram.com/…" },
    ],
  },
];

export const getResource = (key: string) => resources.find((r) => r.key === key);

export const settingGroups: {
  title: string;
  fields: { k: string; label: string; type: "text" | "textarea" | "image" | "video"; help?: string }[];
}[] = [
  {
    title: "Contact details",
    fields: [
      { k: "contact_phone", label: "Phone number", type: "text", help: "Shown on the Contact page and the home page." },
      { k: "contact_email", label: "Email", type: "text" },
      { k: "contact_email_2", label: "Second email", type: "text", help: "Optional." },
      { k: "whatsapp_number", label: "WhatsApp number", type: "text", help: "With country code, numbers only — e.g. 919825068827. Used for the green WhatsApp button." },
      { k: "contact_address", label: "Address", type: "textarea" },
      { k: "footer_tagline", label: "Line at the bottom of every page", type: "textarea" },
    ],
  },
  {
    title: "Page banner photos",
    fields: [
      { k: "hero_image_about", label: "About page", type: "image" },
      { k: "hero_image_products", label: "Products page", type: "image" },
      { k: "hero_image_projects", label: "Projects page", type: "image" },
      { k: "hero_image_gallery", label: "Gallery page", type: "image" },
      { k: "hero_image_press", label: "Press & Media page", type: "image" },
    ],
  },
  {
    title: "About page media",
    fields: [
      { k: "about_video", label: "Video", type: "video" },
      { k: "about_image", label: "Photo", type: "image" },
    ],
  },
];

export const settingFields = settingGroups.flatMap((g) => g.fields);
