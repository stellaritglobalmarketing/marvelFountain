-- Client change list, November 2026. Safe to run on a live database, and safe to re-run.
-- It only touches the rows named below; contact messages, admin logins and other content stay as they are.
SET NAMES utf8mb4;

-- Contact: alternate number
INSERT INTO settings (k, v) VALUES ('contact_phone_2', '+91 92745 68827')
  ON DUPLICATE KEY UPDATE v = VALUES(v);

-- Prices are no longer shown
UPDATE products SET price = NULL;

-- Removed products (their photos and specs cascade)
DELETE FROM products WHERE slug IN ('tabletop-zen-fountain', 'ceramic-pot-fountain', 'static-fountains');
DELETE FROM collections WHERE href IN ('/products/tabletop-zen-fountain', '/products/ceramic-pot-fountain', '/products/static-fountains');

-- Static category -> general outdoor gallery tab, so the finished-work photos stay online
UPDATE gallery_categories SET name = 'Outdoor Fountains' WHERE name = 'Static Fountains';
UPDATE gallery_photos SET alt = 'Illuminated garden fountain' WHERE alt = 'Ceramic pot fountain';
UPDATE menu_links SET label = 'Programmable Fountains', href = '/products/programmable-fountains'
  WHERE menu = 'footer_products' AND href = '/products/static-fountains';

-- Repeated photos: pro15 is the same shot as pro14, st1 is the same shot as pro12
DELETE FROM gallery_photos WHERE src IN ('/media/pro15.jpg', '/media/st1.jpg');

-- About page
UPDATE settings SET v = '/media/pro17.jpg' WHERE k = 'about_image' AND v = '/media/about-fountain.jpg';
DELETE FROM content_blocks WHERE section = 'about_designs' AND title = 'Static fountains';
UPDATE content_blocks SET title = 'Many more models are available as per requirement'
  WHERE section = 'about_designs' AND title LIKE 'Wave fountain%';

-- Clients (name tiles until the real logos are uploaded)
DELETE FROM clients WHERE logo IN ('/clients/chiripal.png', '/clients/navratna.png');
INSERT INTO clients (logo, name, sort_order) VALUES
('/clients/chiripal.png', 'Chiripal', 28),
('/clients/navratna.png', 'Navratna Developers', 29);

-- Rewritten descriptions. short_desc is no longer displayed.
UPDATE products SET short_desc = '';
UPDATE products SET description = 'A multi-tier fountain with a gentle cascading flow, made for gardens, lawns and courtyards. Its stone finish and weatherproof build keep it looking its best through every season.' WHERE slug = 'classic-garden-fountain';
UPDATE products SET description = 'A slate-panel water wall with ambient LED lighting. It brings a calm, continuous sheet of water to hotel lobbies, offices, reception areas and living rooms.' WHERE slug = 'wall-mounted-water-feature';
UPDATE products SET description = 'A landmark fountain for hotel entrances, farmhouses and commercial complexes. Layered cascades and integrated lighting create a strong first impression, day and night.' WHERE slug = 'grand-entrance-fountain';
UPDATE products SET description = 'A jet-style fountain for swimming pools and rooftop decks, with corrosion-resistant construction and adjustable spray patterns for a resort-style display.' WHERE slug = 'modern-pool-fountain';
UPDATE products SET name = 'Musical Dancing Fountains', description = 'Water, light and music choreographed into one live show. Jets rise, sway and change colour in time with the soundtrack you choose.\n\nMusical dancing fountains suit public parks, malls, hotels, resorts and event venues, and can be scaled from compact installations to large outdoor shows.\n\nWe handle the complete project: site survey, design, manufacturing, installation and programming.' WHERE slug = 'dancing-fountains';
UPDATE products SET description = 'Water jets and lights programmed to change in a timed sequence, creating a display that keeps moving without needing a soundtrack.\n\nEvery system is designed around your site and requirement.' WHERE slug = 'sequencing-fountains';
UPDATE products SET description = 'Water features for indoor and outdoor walls, including trickling walls, water sheets, wall waterfalls and water partitions.\n\nWe prepare the civil drawings from your site drawing and can finish the feature with warm white or RGB lighting.' WHERE slug = 'wall-fountains';
UPDATE products SET description = 'A self-contained fountain that floats on a lake or pond and rises and falls with the water level, so changing depths and uneven lake beds are not a problem.\n\nAs well as making a striking display, the spray helps aerate standing water. Choose from a range of spray patterns and lighting options to suit your lake.' WHERE slug = 'floating-fountains';
UPDATE products SET description = 'Water and light that move to the beat of the music. Our control panels are designed around each fountain, so every jet and light follows the soundtrack precisely.\n\nWe plan, build and install complete musical fountain systems, including lighting and programming, for any music you choose.' WHERE slug = 'musical-fountains';
UPDATE products SET description = 'Fountains that give gardens, parks, plazas and building entrances a lively focal point. Designs, colours and sizes are chosen to suit your site.\n\nEvery fountain is built from quality materials, inspected before dispatch and designed for straightforward upkeep.' WHERE slug = 'outdoor-fountains';
UPDATE products SET description = 'Have something different in mind? We design, supply and install water features beyond our standard range, working with you from first concept through to handover.\n\nOur team selects the right nozzles, lights and electrical and mechanical equipment for each design, so the finished feature performs the way it was imagined.' WHERE slug = 'other-fountains';
UPDATE products SET description = 'A heavy centre jet forms a narrow white column of water, surrounded by six aerated jets radiating out from the base. Water reaches about 20 m at the centre and 9 m on the side streams in no-wind conditions.' WHERE slug = 'mf-fl-125-arching-jet-fountain';
UPDATE products SET description = 'A single heavy centre jet forms a thick white column of water, reaching about 22 m in no-wind conditions.' WHERE slug = 'mf-fl-126-high-jet-fountain';
UPDATE products SET description = 'A single heavy centre jet forms a thick white column of water, reaching about 12 m in no-wind conditions.' WHERE slug = 'mf-fl-127-stream-jet-fountain';
UPDATE products SET description = 'A centre stream jet framed by a crown of vertical jets, with RGB lighting for a change of colour after dark.' WHERE slug = 'mf-fl-127-stream-with-crown-fountain';
UPDATE products SET description = 'A floating platform that creates a wide cone of water, with RGB lighting for a change of colour after dark.' WHERE slug = 'mf-fl-127-wide-trumpet-fountain';

-- New fountain list
INSERT INTO products (slug, category_id, name, badge, price, short_desc, description, sort_order)
SELECT n.slug, (SELECT id FROM categories WHERE slug = 'range'), n.name, '', NULL, '', n.description, 0
FROM (
  SELECT 'drydeck-fountains' AS slug, 'Drydeck Fountains' AS name, 'Jets rise straight from a paved surface, with the pipework and water hidden below. When the fountain is off, the area stays open and walkable, which makes it ideal for plazas, entrances and public spaces.' AS description
  UNION ALL SELECT 'laser-shows', 'Laser Shows', 'Laser projections that add a striking visual layer to a night-time water show. They can be combined with musical fountains and multimedia for parks, events and public attractions.'
  UNION ALL SELECT 'floating-musical-fountains', 'Floating Musical Fountains', 'A musical fountain show built on a floating platform, bringing choreographed water and light to lakes and large water bodies.'
  UNION ALL SELECT 'dmx-musical-fountains', 'DMX Musical Fountains', 'Musical fountains run by a DMX control system, which gives precise, programmable control of jets and lights for detailed, repeatable shows.'
  UNION ALL SELECT 'programmable-fountains', 'Programmable Fountains', 'Fountains with pre-set patterns of water and light that run automatically. Shows can be planned to suit your site and the look you want.'
  UNION ALL SELECT 'laminar-jet-fountains', 'Laminar Jet Fountains', 'Smooth, glass-like streams of water that hold a clean arc through the air. Laminar jets add an elegant, modern accent to pools, plazas and landscaped spaces.'
  UNION ALL SELECT 'jumping-jet-fountains', 'Jumping Jet Fountains', 'Separate bursts of water that leap from point to point, creating a playful display that draws people in. A popular choice for parks and family spaces.'
  UNION ALL SELECT 'lake-aerators', 'Lake Aerators', 'Floating aerators that keep water moving and add oxygen, helping to support healthier lakes and ponds while creating an attractive spray on the surface.'
) n
ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

DELETE i FROM product_images i JOIN products p ON p.id = i.product_id
WHERE p.slug IN ('drydeck-fountains', 'laser-shows', 'floating-musical-fountains', 'dmx-musical-fountains', 'programmable-fountains', 'laminar-jet-fountains', 'jumping-jet-fountains', 'lake-aerators');
INSERT INTO product_images (product_id, url, sort_order)
SELECT p.id, n.url, n.sort_order FROM (
  SELECT 'drydeck-fountains' AS slug, '/media/st17.jpg' AS url, 1 AS sort_order
  UNION ALL SELECT 'drydeck-fountains', '/media/st16.jpg', 2
  UNION ALL SELECT 'laser-shows', '/media/ff5.jpg', 1
  UNION ALL SELECT 'floating-musical-fountains', '/media/ff4.jpg', 1
  UNION ALL SELECT 'floating-musical-fountains', '/media/ff5.jpg', 2
  UNION ALL SELECT 'dmx-musical-fountains', '/media/mf2.jpg', 1
  UNION ALL SELECT 'dmx-musical-fountains', '/media/mf3.jpg', 2
  UNION ALL SELECT 'programmable-fountains', '/media/sf9.jpg', 1
  UNION ALL SELECT 'programmable-fountains', '/media/st5.jpg', 2
  UNION ALL SELECT 'laminar-jet-fountains', '/media/st10.jpg', 1
  UNION ALL SELECT 'jumping-jet-fountains', '/media/mf11.jpg', 1
  UNION ALL SELECT 'lake-aerators', '/media/ff6.jpg', 1
  UNION ALL SELECT 'lake-aerators', '/media/ff3.jpg', 2
) n JOIN products p ON p.slug = n.slug;

-- Product order: client's list first, everything else after it (fixed values, so re-runs give the same order)
UPDATE products SET sort_order = CASE slug
  WHEN 'outdoor-fountains' THEN 1 WHEN 'drydeck-fountains' THEN 2 WHEN 'musical-fountains' THEN 3
  WHEN 'dancing-fountains' THEN 4 WHEN 'laser-shows' THEN 5 WHEN 'floating-musical-fountains' THEN 6
  WHEN 'dmx-musical-fountains' THEN 7 WHEN 'programmable-fountains' THEN 8 WHEN 'laminar-jet-fountains' THEN 9
  WHEN 'jumping-jet-fountains' THEN 10 WHEN 'wall-fountains' THEN 11 WHEN 'lake-aerators' THEN 12
  WHEN 'floating-fountains' THEN 13 WHEN 'sequencing-fountains' THEN 14 WHEN 'other-fountains' THEN 15
  WHEN 'mf-fl-125-arching-jet-fountain' THEN 16 WHEN 'mf-fl-126-high-jet-fountain' THEN 17
  WHEN 'mf-fl-127-stream-jet-fountain' THEN 18 WHEN 'mf-fl-127-stream-with-crown-fountain' THEN 19
  WHEN 'mf-fl-127-wide-trumpet-fountain' THEN 20 WHEN 'classic-garden-fountain' THEN 21
  WHEN 'wall-mounted-water-feature' THEN 22 WHEN 'grand-entrance-fountain' THEN 23
  WHEN 'modern-pool-fountain' THEN 24
  ELSE sort_order END;

-- Collection tiles
DELETE FROM collections WHERE href IN ('/products/drydeck-fountains', '/products/laser-shows', '/products/floating-musical-fountains', '/products/dmx-musical-fountains', '/products/programmable-fountains', '/products/laminar-jet-fountains', '/products/jumping-jet-fountains', '/products/lake-aerators');
INSERT INTO collections (category_id, title, home_title, subtitle, href, image, sort_order, home_order)
SELECT (SELECT id FROM categories WHERE slug = 'range'), n.title, NULL, n.subtitle, n.href, n.image, n.sort_order, NULL FROM (
  SELECT 'Drydeck Fountains' AS title, 'Jets that rise from a walkable paved surface.' AS subtitle, '/products/drydeck-fountains' AS href, '/media/st17.jpg' AS image, 2 AS sort_order
  UNION ALL SELECT 'Laser Shows', 'Laser projections for night-time water shows.', '/products/laser-shows', '/media/ff5.jpg', 5
  UNION ALL SELECT 'Floating Musical Fountains', 'Musical water shows for lakes and large water bodies.', '/products/floating-musical-fountains', '/media/ff4.jpg', 6
  UNION ALL SELECT 'DMX Musical Fountains', 'Precise, programmable DMX control of water and light.', '/products/dmx-musical-fountains', '/media/mf2.jpg', 7
  UNION ALL SELECT 'Programmable Fountains', 'Pre-set patterns of water and light that run automatically.', '/products/programmable-fountains', '/media/sf9.jpg', 8
  UNION ALL SELECT 'Laminar Jet Fountains', 'Smooth, glass-like arcs of water.', '/products/laminar-jet-fountains', '/media/st10.jpg', 9
  UNION ALL SELECT 'Jumping Jet Fountains', 'Playful bursts of water that leap from point to point.', '/products/jumping-jet-fountains', '/media/mf11.jpg', 10
  UNION ALL SELECT 'Lake Aerators', 'Floating aerators for healthier lakes and ponds.', '/products/lake-aerators', '/media/ff6.jpg', 12
) n;
UPDATE collections SET title = 'Musical Dancing Fountains', sort_order = 4 WHERE href = '/products/dancing-fountains';
UPDATE collections SET sort_order = 1 WHERE href = '/products/outdoor-fountains';
UPDATE collections SET sort_order = 3, home_order = 7 WHERE href = '/products/musical-fountains';
UPDATE collections SET sort_order = 11 WHERE href = '/products/wall-fountains';
UPDATE collections SET sort_order = 13 WHERE href = '/products/floating-fountains';
UPDATE collections SET sort_order = 14 WHERE href = '/products/sequencing-fountains';
UPDATE collections SET sort_order = 15 WHERE href = '/products/other-fountains';
UPDATE menu_links SET label = 'Musical Dancing Fountains' WHERE href = '/products/dancing-fountains';

-- Custom & installation photos; home page keeps a full grid after the removals
UPDATE collections SET image = '/media/wf7.jpg', home_title = NULL, home_order = 3 WHERE title = 'Custom Design';
UPDATE collections SET image = '/media/pro18.jpg', home_order = 6 WHERE title = 'Installation & Maintenance';

-- Content clean-up: sample labels and specs, price wording, "static" wording
UPDATE products SET badge = '' WHERE badge IN ('Bestseller', 'New', 'Popular', 'Premium', 'Custom', 'Trending');
DELETE s FROM product_specs s JOIN products p ON p.id = s.product_id
WHERE p.slug IN ('classic-garden-fountain', 'wall-mounted-water-feature', 'grand-entrance-fountain', 'modern-pool-fountain');
UPDATE content_blocks SET body = 'We wish to develop good & long lasting business relationships with our clients, built on superior quality products and dependable service.'
  WHERE section = 'about_strengths_b' AND title = 'Clientele';
UPDATE content_blocks SET body = REPLACE(body, 'all types of Static, Programmable', 'all types of Programmable')
  WHERE section = 'about_story' AND title = 'Who we are';
UPDATE settings SET v = REPLACE(v, 'since 1998 — static, programmable', 'since 1998 — programmable')
  WHERE k = 'footer_tagline';
