-- Marvel Fountains — MySQL / MariaDB schema
-- All tables: InnoDB + utf8mb4 so ₹, em dashes etc. store correctly.
-- Lists are ordered by `sort_order` (indexed); child rows cascade on delete.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS admin_users, contact_messages, menu_links, content_blocks, hero_slides, clients,
  testimonials, videos, gallery_photos, gallery_categories, projects, product_specs, product_images,
  products, collections, categories, settings;

SET FOREIGN_KEY_CHECKS = 1;

-- Single values used across the site (phone, email, page hero images …)
CREATE TABLE settings (
  k VARCHAR(64) NOT NULL PRIMARY KEY,
  v TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product groups: Outdoor / Indoor / Custom
CREATE TABLE categories (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,           -- section heading, e.g. "Outdoor Fountains"
  label VARCHAR(50) NOT NULL,           -- short filter-tab label, e.g. "Outdoor"
  sort_order SMALLINT NOT NULL DEFAULT 0,
  UNIQUE KEY uq_categories_slug (slug),
  KEY idx_categories_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Collection tiles (products page groups, home page tiles, header mega menu)
CREATE TABLE collections (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id SMALLINT UNSIGNED NOT NULL,
  title VARCHAR(120) NOT NULL,
  home_title VARCHAR(120) NULL,         -- optional shorter/different title on the home page
  subtitle VARCHAR(255) NOT NULL DEFAULT '',
  href VARCHAR(255) NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  home_order SMALLINT NULL,             -- NULL = not shown on the home page
  KEY idx_collections_cat (category_id, sort_order),
  KEY idx_collections_home (home_order),
  CONSTRAINT fk_collections_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL,
  category_id SMALLINT UNSIGNED NULL,
  name VARCHAR(150) NOT NULL,
  badge VARCHAR(40) NOT NULL DEFAULT '',
  price INT UNSIGNED NULL,              -- whole rupees; NULL = "Price on request"
  short_desc VARCHAR(255) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_products_slug (slug),
  KEY idx_products_list (is_active, sort_order),
  KEY idx_products_category (category_id),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- First image (lowest sort_order) is the product's main image
CREATE TABLE product_images (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  url VARCHAR(500) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_product_images (product_id, sort_order),
  CONSTRAINT fk_product_images FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_specs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  label VARCHAR(60) NOT NULL,
  value VARCHAR(255) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_product_specs (product_id, sort_order),
  CONSTRAINT fk_product_specs FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE projects (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  place VARCHAR(60) NOT NULL,
  title VARCHAR(150) NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_projects_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery_categories (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  show_in_gallery TINYINT(1) NOT NULL DEFAULT 1, -- 0 = only used on its own page (e.g. Press & Media)
  sort_order SMALLINT NOT NULL DEFAULT 0,
  UNIQUE KEY uq_gallery_categories_name (name),
  KEY idx_gallery_categories_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE gallery_photos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id SMALLINT UNSIGNED NOT NULL,
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(200) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_gallery_photos_sort (sort_order),
  KEY idx_gallery_photos_cat (category_id),
  CONSTRAINT fk_gallery_photos_category FOREIGN KEY (category_id) REFERENCES gallery_categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE videos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  youtube_id VARCHAR(20) NOT NULL,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(60) NOT NULL DEFAULT '',
  sort_order SMALLINT NOT NULL DEFAULT 0,
  UNIQUE KEY uq_videos_youtube (youtube_id),
  KEY idx_videos_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE testimonials (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quote TEXT NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(150) NOT NULL DEFAULT '',
  on_home TINYINT(1) NOT NULL DEFAULT 0,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_testimonials_sort (sort_order),
  KEY idx_testimonials_home (on_home, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE clients (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  logo VARCHAR(500) NOT NULL,
  name VARCHAR(150) NOT NULL DEFAULT '',
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_clients_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Home page hero: each slide has either a video or an image
CREATE TABLE hero_slides (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  eyebrow VARCHAR(80) NOT NULL DEFAULT '',
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(255) NOT NULL DEFAULT '',
  href VARCHAR(255) NOT NULL DEFAULT '/products',
  video VARCHAR(500) NULL,
  image VARCHAR(500) NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_hero_slides_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Small repeating lists on pages: stats, mission/vision, strengths, process steps
CREATE TABLE content_blocks (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  value VARCHAR(50) NOT NULL DEFAULT '',  -- e.g. "15+", "01"
  title VARCHAR(200) NOT NULL,
  body TEXT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_content_blocks (section, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Editable link lists in the header mega menus and footer
CREATE TABLE menu_links (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  menu VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  KEY idx_menu_links (menu, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact form submissions
CREATE TABLE contact_messages (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_contact_messages (is_read, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admin_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_admin_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
