-- Marvel Fountains — initial content (everything that used to be hard-coded in the site)
SET NAMES utf8mb4;

INSERT INTO settings (k, v) VALUES
('contact_phone', '+91 98250 68827'),
('contact_email', 'info@marvelfountains.com'),
('contact_email_2', 'marvelfountains80@gmail.com'),
('contact_address', 'A-5, Swaminarayan Complex, Beside Navjivan Hotel, Jain Merchant Society, Nr. Mahalaxmi Five Roads, Paldi, Ahmedabad-380007, Gujarat, India'),
('whatsapp_number', '919825068827'),
('footer_tagline', 'Designer and manufacturer of all types of fountains since 1998 — static, programmable, floating, sequencing, musical and dancing fountains.'),
('hero_image_about', '/media/about-hero.jpg'),
('hero_image_products', '/media/mf1.jpg'),
('hero_image_projects', '/media/mf5.jpg'),
('hero_image_gallery', '/media/mf6.jpg'),
('hero_image_press', '/media/kankaria.jpg'),
('about_video', '/videos/hero-fountain-2.mp4'),
('about_image', '/media/about-fountain.jpg');

INSERT INTO categories (id, slug, name, label, sort_order) VALUES
(4, 'range', 'Our Fountain Range', 'Fountains', 1),
(5, 'floating-models', 'Floating Fountain Models', 'Floating Models', 2),
(1, 'outdoor', 'Outdoor Fountains', 'Outdoor', 3),
(2, 'indoor', 'Indoor Water Features', 'Indoor', 4),
(3, 'custom', 'Custom Solutions', 'Custom', 5);

INSERT INTO collections (id, category_id, title, home_title, subtitle, href, image, sort_order, home_order) VALUES
(1, 1, 'Garden Fountains', NULL, 'Multi-tier stone-finish cascades for lawns & courtyards.', '/products/classic-garden-fountain', '/media/st2.jpg', 1, 1),
(2, 1, 'Grand Entrance Fountains', NULL, 'Statement pieces for hotels, farmhouses & complexes.', '/products/grand-entrance-fountain', '/media/mf2.jpg', 2, 4),
(3, 1, 'Pool Fountains', NULL, 'Jet-style displays for pools & rooftop decks.', '/products/modern-pool-fountain', '/media/ff2.jpg', 3, 5),
(4, 1, 'Ceramic Pot Fountains', NULL, 'Handcrafted cascades for balconies & small gardens.', '/products/ceramic-pot-fountain', '/media/st10.jpg', 4, 6),
(5, 2, 'Wall & LED Water Features', 'Wall & LED Features', 'Slate-panel water curtains with ambient LED lighting.', '/products/wall-mounted-water-feature', '/media/wf2.jpg', 1, 2),
(6, 2, 'Tabletop Fountains', NULL, 'Compact, ultra-quiet fountains for desks & meditation corners.', '/products/tabletop-zen-fountain', '/media/st6.jpg', 2, 3),
(7, 3, 'Custom Design', 'Custom Design & Installation', 'Bespoke fountains designed around your space and budget.', '/contact', '/media/mf3.jpg', 1, 7),
(8, 3, 'Installation & Maintenance', NULL, 'On-site setup, testing and after-sales servicing.', '/contact', '/media/mf4.jpg', 2, NULL),
(9, 4, 'Dancing Fountains', NULL, 'Colourful lighting & glorious dancing water patterns.', '/products/dancing-fountains', '/media/mf2.jpg', 1, NULL),
(10, 4, 'Musical Fountains', NULL, 'Water shows that move to the beat of the music.', '/products/musical-fountains', '/media/mf8.jpg', 2, NULL),
(11, 4, 'Floating Fountains', NULL, 'Floating fountains & aerators for lakes and ponds.', '/products/floating-fountains', '/media/ff1.jpg', 3, NULL),
(12, 4, 'Sequencing Fountains', NULL, 'Programmed water jets and lights in timed sequences.', '/products/sequencing-fountains', '/media/sf1.jpg', 4, NULL),
(13, 4, 'Wall Fountains', NULL, 'Trickling, water sheets & wall waterfalls — indoor and outdoor.', '/products/wall-fountains', '/media/wf1.jpg', 5, NULL),
(14, 4, 'Static Fountains', NULL, 'Dome, ring, mist, curtain & water-sheet designs.', '/products/static-fountains', '/media/st1.jpg', 6, NULL),
(15, 4, 'Outdoor Fountains', NULL, 'Garden & outdoor fountains in rich designs.', '/products/outdoor-fountains', '/media/st13.jpg', 7, NULL),
(16, 4, 'Other Fountains', NULL, 'Design, supply & installation of every kind of water feature.', '/products/other-fountains', '/media/pro14.jpg', 8, NULL);

INSERT INTO products (id, slug, category_id, name, badge, price, short_desc, description, sort_order) VALUES
(1, 'classic-garden-fountain', 1, 'Classic Garden Fountain', 'Bestseller', 18999,
 'Elegant multi-tier stone-finish fountain, perfect for gardens, lawns and courtyards.',
 'An elegant multi-tier, stone-finish fountain crafted for gardens, lawns and courtyards. Its cascading water flow and weatherproof build make it a timeless centerpiece for outdoor spaces, day or night.', 14),
(2, 'wall-mounted-water-feature', 2, 'Wall-Mounted Water Feature', 'New', 24499,
 'Modern slate-panel wall fountain with LED lighting, ideal for lobbies & living rooms.',
 'A modern slate-panel wall fountain with ambient LED lighting, designed to elevate hotel lobbies, living rooms and reception areas with a calming water curtain effect.', 15),
(3, 'tabletop-zen-fountain', 2, 'Tabletop Zen Fountain', 'Popular', 4299,
 'Compact indoor fountain with calming flow, great for offices and meditation corners.',
 'A compact indoor fountain with a soothing, continuous water flow — designed for desks, office corners and meditation spaces where calm matters most.', 16),
(4, 'grand-entrance-fountain', 1, 'Grand Entrance Fountain', 'Premium', 64999,
 'Statement-piece fountain for hotel entrances, farmhouses and commercial complexes.',
 'A statement-piece fountain engineered for hotel entrances, farmhouses and commercial complexes — designed to leave a lasting first impression with grand, layered cascades.', 17),
(5, 'modern-pool-fountain', 1, 'Modern Pool Fountain', 'Custom', 39999,
 'Sleek jet-style fountain designed for swimming pools and rooftop decks.',
 'A sleek, jet-style fountain built for swimming pools and rooftop decks — corrosion-resistant construction with adjustable spray patterns for a resort-style water display.', 18),
(6, 'ceramic-pot-fountain', 1, 'Ceramic Pot Fountain', 'Trending', 7499,
 'Handcrafted ceramic-pot cascade fountain, ideal for balconies and small gardens.',
 'A handcrafted, hand-glazed ceramic-pot cascade fountain — bringing warm, artisanal charm to balconies, small gardens and courtyard corners.', 19),
(7, 'dancing-fountains', 4, 'Dancing Fountains', '', NULL, 'Musical Dancing Fountains can be designed colorful lighting & Glorious dancing water patterns to accommodate the largest outdoor venues to the smallest of indoor environments.', 'Musical Dancing Fountains can be designed colorful lighting & Glorious dancing water patterns to accommodate the largest outdoor venues to the smallest of indoor environments.

Lively dancing water can be a spectacular asset in shopping Centers,Malls,Five Star Hotels, Resorts, & Public parks.

We design fountains as you need.

A Dancing fountain is a kind of vivified wellspring for diversion purposes that makes a stylish plan (counting three-dimensional pictures). This is accomplished by utilizing coordinated sound waves and planned light (counting laser) against water particles. The water refracts and mirrors the morning, and in doing so, three-dimensional pictures can be delivered.

The establishments of the Dancing fountain manufacturer in Ahmedabad can be enormous scope, utilizing many water planes and lights, and costing into the large numbers of dollars, or in more modest family shapes, where a spending plan is attainable. Musical highlights will, in general, be intricate and require a level of mechanical, water driven, electrical, and electronic segments out of view that may be as great to its crowd as the actual show.

We have faith in giving that customized to any music as per customer decision. This arranges music and sound that effectively control by the framework. We have a tremendous load of various sorts of melodic wellspring that meets the prerequisite within the given time. We offer different kinds of dancing fountain in India at severe costs. We provide various types of dancing fountain that are ideal for other show and water programs—our Dancing fountain service with the prerequisite of all necessities.

We are one of the leading producer, provider and Dancing fountain manufacturer in India. We are here furnishing different sorts of melodic wellspring with various plan, shapes and size. We give the Dancing fountain exact plan and measurement.', 1),
(8, 'sequencing-fountains', 4, 'Sequencing Fountains', '', NULL, 'Sequencing fountains with programmed water jets and lighting that change in a timed sequence.', 'Sequencing fountains with programmed water jets and lighting that change in a timed sequence.

Designed, manufactured and installed by Marvel Fountains to suit your site — share your requirement with us.', 2),
(9, 'wall-fountains', 4, 'Wall Fountains', '', NULL, 'Wall fountains water creations – indoor and outdoor have so many option to travel the water as per the requirement and create trickling, water sheets, wall waterfall, water sheets in partitions etc.', 'Wall fountains water creations – indoor and outdoor have so many option to travel the water as per the requirement and create trickling, water sheets, wall waterfall, water sheets in partitions etc.

Required necessary civil drawing provided by us after receiving the drawing from the client. Also giving lighting effect by warm white or Rgb effect etc.', 3),
(10, 'static-fountains', 4, 'Static Fountains', '', NULL, 'Dome & ring, water sheet / glass waterfall, mist and curtain fountains for every kind of site.', 'Our static fountain designs include:

• Dome & ring fountains
• Water sheet / glass waterfall fountains
• Mist fountains
• Curtain fountains
• Traffic islands

Every design is made to suit your site and requirement — share your drawing or idea with us.', 4),
(11, 'floating-fountains', 4, 'Floating Fountains', '', NULL, 'A Floating Fountain is essentially a wellspring in a lake to skim here and there as the water levels change, utilising a siphon and air circulation advantage for the water.', 'A Floating Fountain is essentially a wellspring in a lake to skim here and there as the water levels change, utilising a siphon and air circulation advantage for the water. Driven by development and quality, Marvel Fountains produces the skimming wellsprings available today. We offer novel decisions to our client on both the showcase designs and the working frameworks relying on your necessities. Marvel Fountains assembles wellsprings and buoyancy gadgets for client arrangements. We offer more than fifty lovely skimming wellsprings, lake aerators and circulators. The Decorative wellspring/Aerator is the lone result of its sort that contains no oil, is rustproof, and is absolutely contamination free.

As the Floating fountain manufacturer, the floating Fountain incorporates a buoy, wide cone spout and siphon. This wellspring is enlivening and adds oxygen, and gives air circulation to your lake. With different discretionary wellspring examples to browse, you have the opportunity to change your drifting wellspring to accommodate your lake, climate conditions, and your preferences.

Floating fountains in India interesting has the gliding framework permits the siphon to stay just beneath the water''s outside water where the water is liberated from the excess. Changing water profundities, uneven lake floor and numerous different issues disappear. Just buoy the unit into the lake, and it wraps up.

These fountains have been explicitly intended for pools, lakes and lakes embellishment, giving an ideal supplement to enrich these compositional scenes. Albeit wellsprings are aerators themselves, as the sprinkle of the planes running into the outside of the lake inhales O2 in standing water. We offer the chance of streamlining the air circulation.', 5),
(12, 'musical-fountains', 4, 'Musical Fountains', '', NULL, 'Musical Fountains are captivating light and water arrangements.', 'Musical Fountains are captivating light and water arrangements. We are the unmistakable Musical fountain manufacturer and purveyor of shifted range of Fountains Products. Our specific tasks include planning, creating and introducing our height items to our customer''s details.

Our wide range of items involves - LED Lighting Systems, Programmable Fiber Optics, Fountain Lights, Effects of Lighting and Programmable Fountains. We are likewise an overwhelming Musical fountain dealer in Advance Level Creative and innovated Musical Fountains.

Being the Musical fountain dealer, we provide music to the water waves and based on the beat of the music and are perhaps the most requested shows throughout the planet. This sort of water diversion advancements depends on the latest innovation incorporated into the Control Panel, leading the entire water show. These control boards are planned by Marvel Fountain explicitly for the requirements of your moving wellspring and contain gadgets to make water move to the beat of the music.

We comprehend the intricacy of water media outlet and the troubles that a significant number of our clients are confronting when planning and executing these ventures.

Whenever wanted, we can characterize the sensible situation for your moving drinking fountain arranging your product. When you gain to the Power Panel, the gear has effectively represented the essential components that frame your music wellspring. What''s more, every part of the Musical fountain suppliers is designed with the best channel and address to work with ensuing musical fountain settings.', 6),
(13, 'outdoor-fountains', 4, 'Outdoor Fountains', '', NULL, 'We are an Outdoor fountain manufacturer in Ahmedabad, an Outdoor fountain manufacturer in Gujarat.', 'We are an Outdoor fountain manufacturer in Ahmedabad, an Outdoor fountain manufacturer in Gujarat. We are likewise the maker of the arch fountain, floating fountain, musical fountain, dancing fountain, indoor fountain, garden fountain, wall fountain, and so forth.

Being the Outdoor Garden fountain manufacturer, our organization has made a specialty in assembling, supplying, and exchanging Outdoor Fountains. These Fountains are made by our master group utilizing high evaluation materials and present-day innovation. We have wide ranges and plans for these wellsprings according to our client''s particular. Also, our customers could buy these wellsprings at reasonable costs.

Highlights as the Outdoor fountain manufacturer:
• Rich plans
• Less upkeep
• Assortment of shadings

We utilize quality-supported fundamental material and state-of-the-art innovation in planning measures to keep our items in adherence to worldwide quality guidelines. These items are eminent for their quality credits like appealing plans, good feel, and unimportant upkeep costs.

Outdoor fountain manufacturers in India are valued for their highlights like simple to utilize, harm obstruction, long life, alluring plan, and lightweight. Moreover, we are offering these items at genuinely sensible rates.

Being a customer-situated firm, we give an undeniable level of fulfillment to our customers. Every one of our items is inspected before the last dispatch on specific industry-laid boundaries. With the assistance of our vast and associated dissemination organization, we can give on-time conveyance at customers'' end. Owing to our moral business arrangements, straightforward dealings, brief passage, and customer-driven methodology, we have expanded the rundown of our fulfilled customers.', 7),
(14, 'other-fountains', 4, 'Other Fountains', '', NULL, 'As the Water fountain manufacturer, we give solid quality, cutthroat estimating, and brilliant incentive for cash in each aspect of configuration, supply, and establishment of the fountain framework.', 'As the Water fountain manufacturer, we give solid quality, cutthroat estimating, and brilliant incentive for cash in each aspect of configuration, supply, and establishment of the fountain framework. We work intimately with the customer directly from the underlying idea of the water highlight plan to the establishment of fountain gear and until giving over the total fountain framework. Notable for its fountain configuration, Marvel Fountains offer you a complete bundle for fountain development and water highlight upkeep administrations identified with open-air scene spaces.

We are incredibly enthusiastic in tasteful water designing, and our comprehensive insight into drinking fountain fabricating permits us to comprehend the specialized element of Fountain lights manufacturing items. As a most believed name in planning nursery fountain and manufacture of wall fountains, we have been devoted to making a Wow water highlight. Our water pressure-driven information assists us with choosing the right fountain spouts. Garden fountain manufacturer lights other electrical and mechanical gear.

Maintenance is a considerable concern our clients have when they are searching for a Dry deck fountain manufacturer. Fortunately, almost no support is needed to keep fountains putting their best self forward and running appropriately. The most that should be done to a rush after it has been introduced is basic cleaning. The essential cleaning of a fountain includes depleting the fountain and cleaning down the whole surface with a clammy fabric. This is usually done like clockwork. As well as cleaning the Programmable fountain manufacturer, you will be needed to keep up water levels appropriately. Water levels should be kept at their appropriate level to stay away from expensive harm to the siphon.', 8),
(15, 'mf-fl-125-arching-jet-fountain', 5, 'MF-FL-125 Arching Jet Fountain', 'Floating', NULL, 'Center heavy jet create single, narrow, white columnar water effect & surrounded by six nos.', 'Center heavy jet create single, narrow, white columnar water effect & surrounded by six nos. aerated jets radiating out from the base and very visible and dramatic with height of the jet. Approx water effect height-centre 20 mtr / side stream – 9 mtr. at no wind condition.', 9),
(16, 'mf-fl-126-high-jet-fountain', 5, 'MF-FL-126 High Jet Fountain – 22 mtr', 'Floating', NULL, 'Center heavy jet create single, narrow, white columnar water effect.', 'Center heavy jet create single, narrow, white columnar water effect. Approx water effect height-centre 22 mtr thick stream – at no wind condition.', 10),
(17, 'mf-fl-127-stream-jet-fountain', 5, 'MF-FL-127 Stream Jet Fountain – 12 mtr', 'Floating', NULL, 'Center heavy jet create single, narrow, white columnar water effect.', 'Center heavy jet create single, narrow, white columnar water effect. Approx water effect height-centre 12 mtr thick stream – at no wind condition.', 11),
(18, 'mf-fl-127-stream-with-crown-fountain', 5, 'MF-FL-127 Stream with Crown Fountain – 20 mtr', 'Floating', NULL, 'Centre stream jet with vertical crown jets fountains with different colour Rgb lighting effect.', 'Centre stream jet with vertical crown jets fountains with different colour Rgb lighting effect.', 12),
(19, 'mf-fl-127-wide-trumpet-fountain', 5, 'MF-FL-127 Wide Trumpet Fountain', 'Floating', NULL, 'Fountain design with floating platform and creating wide cone fountains with different colour Rgb lighting effect.', 'Fountain design with floating platform and creating wide cone fountains with different colour Rgb lighting effect.', 13);

INSERT INTO product_images (product_id, url, sort_order) VALUES
(1, '/media/st1.jpg', 1),
(1, '/media/st2.jpg', 2),
(1, '/media/st3.jpg', 3),
(1, '/media/st4.jpg', 4),
(2, '/media/wf1.jpg', 1),
(2, '/media/wf2.jpg', 2),
(2, '/media/wf3.jpg', 3),
(2, '/media/wf4.jpg', 4),
(3, '/media/st5.jpg', 1),
(3, '/media/st6.jpg', 2),
(3, '/media/st7.jpg', 3),
(3, '/media/st8.jpg', 4),
(4, '/media/mf1.jpg', 1),
(4, '/media/mf2.jpg', 2),
(4, '/media/mf3.jpg', 3),
(4, '/media/mf4.jpg', 4),
(5, '/media/ff1.jpg', 1),
(5, '/media/ff2.jpg', 2),
(5, '/media/ff3.jpg', 3),
(5, '/media/ff4.jpg', 4),
(6, '/media/st9.jpg', 1),
(6, '/media/st10.jpg', 2),
(6, '/media/st11.jpg', 3),
(6, '/media/st12.jpg', 4),
(7, '/media/mf1.jpg', 1),
(7, '/media/mf2.jpg', 2),
(7, '/media/mf3.jpg', 3),
(7, '/media/mf4.jpg', 4),
(7, '/media/mf5.jpg', 5),
(7, '/media/mf6.jpg', 6),
(7, '/media/mf7.jpg', 7),
(7, '/media/mf8.jpg', 8),
(7, '/media/mf9.jpg', 9),
(7, '/media/mf10.jpg', 10),
(7, '/media/mf11.jpg', 11),
(8, '/media/sf1.jpg', 1),
(8, '/media/sf2.jpg', 2),
(8, '/media/sf3.jpg', 3),
(8, '/media/sf4.jpg', 4),
(8, '/media/sf5.jpg', 5),
(8, '/media/sf6.jpg', 6),
(8, '/media/sf7.jpg', 7),
(8, '/media/sf8.jpg', 8),
(8, '/media/sf9.jpg', 9),
(9, '/media/wf1.jpg', 1),
(9, '/media/wf2.jpg', 2),
(9, '/media/wf3.jpg', 3),
(9, '/media/wf4.jpg', 4),
(9, '/media/wf5.jpg', 5),
(9, '/media/wf6.jpg', 6),
(9, '/media/wf7.jpg', 7),
(10, '/media/st1.jpg', 1),
(10, '/media/st2.jpg', 2),
(10, '/media/st3.jpg', 3),
(10, '/media/st4.jpg', 4),
(10, '/media/st5.jpg', 5),
(10, '/media/st6.jpg', 6),
(10, '/media/st7.jpg', 7),
(10, '/media/st8.jpg', 8),
(10, '/media/st9.jpg', 9),
(10, '/media/st10.jpg', 10),
(10, '/media/st11.jpg', 11),
(10, '/media/st12.jpg', 12),
(10, '/media/st13.jpg', 13),
(10, '/media/st14.jpg', 14),
(10, '/media/st15.jpg', 15),
(10, '/media/st16.jpg', 16),
(10, '/media/st17.jpg', 17),
(11, '/media/ff1.jpg', 1),
(11, '/media/ff2.jpg', 2),
(11, '/media/ff3.jpg', 3),
(11, '/media/ff4.jpg', 4),
(11, '/media/ff5.jpg', 5),
(11, '/media/ff6.jpg', 6),
(12, '/media/mf8.jpg', 1),
(12, '/media/mf9.jpg', 2),
(12, '/media/mf10.jpg', 3),
(12, '/media/mf11.jpg', 4),
(13, '/media/st13.jpg', 1),
(13, '/media/st14.jpg', 2),
(13, '/media/st15.jpg', 3),
(13, '/media/st16.jpg', 4),
(14, '/media/pro14.jpg', 1),
(14, '/media/pro15.jpg', 2),
(14, '/media/pro16.jpg', 3),
(14, '/media/pro17.jpg', 4),
(15, '/media/ff1.jpg', 1),
(16, '/media/ff2.jpg', 1),
(17, '/media/ff3.jpg', 1),
(18, '/media/ff4.jpg', 1),
(19, '/media/ff5.jpg', 1);

INSERT INTO product_specs (product_id, label, value, sort_order) VALUES
(1, 'Material', 'Stone-finish FRP composite', 1),
(1, 'Height', '4 ft (3-tier)', 2),
(1, 'Pump', 'Submersible, 40W, silent operation', 3),
(1, 'Placement', 'Outdoor — garden, lawn, courtyard', 4),
(1, 'Finish', 'Weatherproof, UV-resistant coating', 5),
(1, 'Warranty', '2 years on pump & motor', 6),
(2, 'Material', 'Natural slate panel & brushed steel frame', 1),
(2, 'Dimensions', '3 ft × 2 ft', 2),
(2, 'Lighting', 'Built-in warm-white / RGB LED', 3),
(2, 'Pump', 'Silent recirculating, 60W', 4),
(2, 'Placement', 'Indoor — lobby, living room, office', 5),
(2, 'Warranty', '2 years on pump & motor', 6),
(3, 'Material', 'Resin & natural pebble finish', 1),
(3, 'Height', '10 inches', 2),
(3, 'Pump', 'Mini submersible, 5W, ultra-quiet', 3),
(3, 'Placement', 'Desk, office, meditation corner', 4),
(3, 'Power', 'USB / plug adapter included', 5),
(3, 'Warranty', '1 year on pump & motor', 6),
(4, 'Material', 'Marble-finish FRP composite', 1),
(4, 'Height', '8 ft (4-tier)', 2),
(4, 'Pump', 'Heavy-duty, 150W, weatherproof', 3),
(4, 'Placement', 'Commercial entrance, hotel lobby, farmhouse', 4),
(4, 'Lighting', 'Integrated underwater LED spotlights', 5),
(4, 'Warranty', '3 years on pump & motor', 6),
(5, 'Material', 'Marine-grade stainless steel', 1),
(5, 'Jet Type', 'Adjustable spray, multi-pattern', 2),
(5, 'Pump', 'Pool-grade, 100W, chlorine-resistant', 3),
(5, 'Placement', 'Swimming pool, rooftop deck', 4),
(5, 'Lighting', 'Optional submersible LED add-on', 5),
(5, 'Warranty', '2 years on pump & motor', 6),
(6, 'Material', 'Hand-glazed terracotta ceramic', 1),
(6, 'Height', '18 inches', 2),
(6, 'Pump', 'Mini submersible, 8W', 3),
(6, 'Placement', 'Balcony, small garden, courtyard', 4),
(6, 'Finish', 'Weather-resistant glaze, fade-proof', 5),
(6, 'Warranty', '1 year on pump & motor', 6),
(15, 'Model', 'MF – FL – 125', 1),
(15, 'Water effect height', 'Centre 20 mtr / side stream 9 mtr (no wind)', 2),
(15, 'Lighting', 'As per requirement', 3),
(16, 'Model', 'MF – FL – 126', 1),
(16, 'Water effect height', '22 mtr (no wind)', 2),
(16, 'Lighting', 'As per requirement', 3),
(17, 'Model', 'MF – FL – 127', 1),
(17, 'Water effect height', '12 mtr (no wind)', 2),
(17, 'Lighting', 'As per requirement', 3),
(18, 'Model', 'MF – FL – 127', 1),
(18, 'Water effect height', '20 mtr', 2),
(18, 'Lighting', 'RGB lighting effect', 3),
(19, 'Model', 'MF – FL – 127', 1),
(19, 'Lighting', 'RGB lighting effect', 3);

INSERT INTO projects (place, title, image, sort_order) VALUES
('Commercial', 'Grand Entrance Fountain', '/media/mf5.jpg', 1),
('Interior', 'LED Wall Water Feature', '/media/wf5.jpg', 2),
('Residential', 'Garden Fountain', '/media/st13.jpg', 3),
('Hospitality', 'Pool Fountain', '/media/ff5.jpg', 4),
('Commercial', 'Lobby Fountain', '/media/mf6.jpg', 5),
('Residential', 'Courtyard Fountain', '/media/st14.jpg', 6);

INSERT INTO gallery_categories (id, name, show_in_gallery, sort_order) VALUES
(1, 'Musical Fountains', 1, 1),
(2, 'Wall Fountains', 1, 2),
(3, 'Static Fountains', 1, 3),
(4, 'Floating Fountains', 1, 4),
(5, 'Sequencing Fountains', 1, 5),
(6, 'Completed Projects', 1, 6),
(7, 'Press & Media', 0, 7);

INSERT INTO gallery_photos (category_id, src, alt, sort_order) VALUES
(1, '/media/mf5.jpg', 'Grand musical fountain show', 1),
(2, '/media/wf5.jpg', 'LED wall water feature', 2),
(3, '/media/st13.jpg', 'Garden fountain installation', 3),
(4, '/media/ff5.jpg', 'Floating lake fountain', 4),
(1, '/media/mf6.jpg', 'Dancing fountain at night', 5),
(2, '/media/wf6.jpg', 'Lobby wall fountain', 6),
(3, '/media/st14.jpg', 'Courtyard fountain', 7),
(4, '/media/ff6.jpg', 'Floating fountain jets', 8),
(1, '/media/mf7.jpg', 'Programmable fountain display', 9),
(2, '/media/wf1.jpg', 'Slate panel water curtain', 10),
(3, '/media/st1.jpg', 'Multi-tier stone fountain', 11),
(4, '/media/ff1.jpg', 'Pool jet fountain', 12),
(1, '/media/mf1.jpg', 'Entrance fountain cascade', 13),
(2, '/media/wf2.jpg', 'Indoor wall fountain', 14),
(3, '/media/st9.jpg', 'Ceramic pot fountain', 15),
(4, '/media/ff2.jpg', 'Floating fountain array', 16),
(5, '/media/sf1.jpg', 'Sequencing fountain', 17),
(5, '/media/sf2.jpg', 'Sequencing fountain', 18),
(5, '/media/sf3.jpg', 'Sequencing fountain', 19),
(5, '/media/sf4.jpg', 'Sequencing fountain', 20),
(5, '/media/sf5.jpg', 'Sequencing fountain', 21),
(5, '/media/sf6.jpg', 'Sequencing fountain', 22),
(5, '/media/sf7.jpg', 'Sequencing fountain', 23),
(5, '/media/sf8.jpg', 'Sequencing fountain', 24),
(5, '/media/sf9.jpg', 'Sequencing fountain', 25),
(6, '/media/pro1.jpg', 'Completed fountain project', 26),
(6, '/media/pro2.jpg', 'Completed fountain project', 27),
(6, '/media/pro3.jpg', 'Completed fountain project', 28),
(6, '/media/pro4.jpg', 'Completed fountain project', 29),
(6, '/media/pro5.jpg', 'Foam / glass waterfall / mist fountains', 30),
(6, '/media/pro6.jpg', 'Foam / glass waterfall / mist fountains', 31),
(6, '/media/pro7.jpg', 'Completed fountain project', 32),
(6, '/media/pro8.jpg', 'Mist dome fountains', 33),
(6, '/media/pro9.jpg', 'Mist with jet fountains', 34),
(6, '/media/pro10.jpg', 'Completed fountain project', 35),
(6, '/media/pro11.jpg', 'Geyser fountains', 36),
(6, '/media/pro12.jpg', 'Geyser fountains', 37),
(6, '/media/pro13.jpg', 'Completed fountain project', 38),
(6, '/media/pro14.jpg', 'Completed fountain project', 39),
(6, '/media/pro15.jpg', 'Completed fountain project', 40),
(6, '/media/pro16.jpg', 'Completed fountain project', 41),
(6, '/media/pro17.jpg', 'Completed fountain project', 42),
(6, '/media/pro18.jpg', 'Completed fountain project', 43),
(6, '/media/pro19.jpg', 'Completed fountain project', 44),
(7, '/media/joggers-park--amc.jpg', 'Joggers Park, AMC', 45),
(7, '/media/kankaria.jpg', 'Kankaria', 46),
(7, '/media/fountain.jpg', 'Fountain project in the news', 47),
(7, '/media/nimbaheda-photo.jpg', 'Nimbaheda', 48),
(7, '/media/photo.jpg', 'Press coverage', 49);

INSERT INTO videos (youtube_id, title, category, sort_order) VALUES
('KK1ADcaSDwA', 'Glass Fountains', 'Indoor', 1),
('Sv9sDJu4cA8', 'Musical Dancing Fountain', 'Musical', 2),
('I-VMDMIhFu4', 'Dancing Fountains', 'Musical', 3),
('kCvU6nWnphY', 'Wall Fountains', 'Indoor', 4),
('_ZbGbvwxZDc', 'Programmable Fountains', 'Outdoor', 5),
('O1pxcjs4kac', 'Programmable Fountains — Night Show', 'Outdoor', 6);

-- Customer reviews: none yet (add real ones from the admin panel)

INSERT INTO clients (logo, sort_order) VALUES
('/clients/1.png', 1), ('/clients/2.png', 2), ('/clients/3.png', 3), ('/clients/4.png', 4),
('/clients/5.png', 5), ('/clients/6.png', 6), ('/clients/7.png', 7), ('/clients/9.png', 8),
('/clients/10.png', 9), ('/clients/11.png', 10), ('/clients/12.png', 11), ('/clients/13.png', 12),
('/clients/14.png', 13), ('/clients/15.png', 14), ('/clients/16.jpg', 15), ('/clients/17.jpg', 16),
('/clients/18.jpg', 17), ('/clients/19.jpg', 18), ('/clients/20.jpg', 19), ('/clients/21.jpg', 20),
('/clients/22.jpg', 21), ('/clients/23.jpg', 22), ('/clients/24.jpg', 23), ('/clients/25.jpg', 24),
('/clients/26.jpg', 25), ('/clients/27.jpg', 26), ('/clients/28.jpg', 27);

INSERT INTO hero_slides (eyebrow, title, subtitle, href, video, image, sort_order) VALUES
('Water · Art · Craft', 'Timeless Water Fountains', 'Designed, manufactured and installed for elegant living spaces.', '/products', '/videos/hero-fountain-2.mp4', NULL, 1),
('Commercial', 'Grand Entrance Fountains', 'Statement pieces for hotels, farmhouses and commercial complexes.', '/products/grand-entrance-fountain', NULL, '/media/mf1.jpg', 2),
('Interior', 'Wall & LED Water Features', 'A calming water curtain for lobbies, offices and living rooms.', '/products/wall-mounted-water-feature', NULL, '/media/wf1.jpg', 3),
('Outdoor', 'Garden Fountains', 'Weatherproof multi-tier cascades for lawns and courtyards.', '/products/classic-garden-fountain', NULL, '/media/st1.jpg', 4);

INSERT INTO content_blocks (section, value, title, body, sort_order) VALUES
('home_stats', '', 'Since 1998', NULL, 1),
('home_stats', '', '1200+ Projects', NULL, 2),
('home_stats', '', '98% Client Satisfaction', NULL, 3),
('home_mission', '', 'Our Vision', 'To provide world class & best combination of water fantasy in our Fountains, by using innovative & Creative ideas with state of the art technology.', 1),
('home_mission', '', 'Our Mission', 'To emerge as a Global leader in Industry, providing an exclusive, innovative fountains range with excellent service & support to our valued customers.', 2),
('about_story', '', 'Who we are', 'Marvel Fountains — one of the leading & Largest Designer and Manufacturer of Fountains based at Ahmedabad, Gujarat in India, Founded in 1998 as a manufacturer of all types of Static, Programmable, Architectural, Floating, and Sequential & Musical Fountains. Marvel Fountains is focused on leading the industry from the front in finding new Creative & Innovative solutions for our esteemed customer’s needs.', 1),
('about_story', '', 'Turnkey projects', 'We undertake the turnkey jobs of survey, design, supply and installation of all types of fountains, Water Games & Musical Dancing Fountain as per our valued customers’ requirement as well as our own designs. We also undertake servicing & maintenance contract of fountains.', 2),
('about_story', '', 'Expert service', 'We provide best Quality services to our Valued & Prestigious Customers, by well qualified and experienced engineers who are capable to survey at any complicated sites and undertake the job of design water fountains suitable to the architecture, buildings, amusement parks, gardens, party plots in order to beautify the existing structures or layouts.', 3),
('about_story', '', 'In-house manufacturing', 'Our separate in house manufacturing department consists well experienced Technicians, looks after the fabrication and assembling section of the above equipments. We are also assisted by well experienced electricians & plumbers in this line of installation of water fountains. Our technicians are always prepared to reach at our customers’ calls within no time, in case of any service required by our customers.', 4),
('about_story', '', 'Quality materials', 'For our fountain products we use Nozzle, Brass and gunmetal, Aluminum material etc., which are non-corrosive to manufacture above equipments and hence can guarantee for any manufacturing defects / corrosion, reliability of the equipment. The nuts and bolts are made of stainless steel and lightings are made of perfect quality material to provide best and long lasting performance. All the parts of fountains are manufacturing in our own company & sister concerns.', 5),
('about_stats', '25+', 'Years of experience', NULL, 1),
('about_stats', '1200+', 'Projects delivered', NULL, 2),
('about_stats', '98%', 'Client satisfaction', NULL, 3),
('about_strengths_a', '', 'Turnkey Projects', 'Survey, design, supply and installation of all types of fountains, water games & musical dancing fountains — to your requirement or our own designs.', 1),
('about_strengths_a', '', 'Experienced Engineers', 'Well qualified and experienced engineers who can survey any complicated site and design fountains to suit the architecture, buildings, amusement parks, gardens and party plots.', 2),
('about_strengths_a', '', 'Servicing & Maintenance', 'We undertake servicing & maintenance contracts. Our technicians are always prepared to reach our customers'' calls within no time.', 3),
('about_strengths_b', '', 'Clientele', 'We wish to develop good & long lasting business relationships with our clients. Superior quality products are offered at most competitive rates that the customers find very feasible.', 1),
('about_strengths_b', '', 'Our Team', 'Efficient and devoted team is the real asset of an organization. We are one of the fortunate companies that has a team of highly experienced and hardworking personnel who believe in giving their best.', 2),
('about_strengths_b', '', 'Why Us', 'Complete in-house facility from design to manufacturing of all related components including nozzles, lights, solenoid valve, plastic components & all sensitive equipments.', 3),
('about_process', '01', 'Survey', 'Our engineers survey your site, however complicated.', 1),
('about_process', '02', 'Design', 'Fountains designed to suit your architecture, building, park or garden.', 2),
('about_process', '03', 'Manufacturing', 'All parts made in our own company & sister concerns.', 3),
('about_process', '04', 'Installation', 'Supply and installation by our technicians, electricians & plumbers.', 4),
('about_process', '05', 'Service & Maintenance', 'Servicing & maintenance contracts, with quick response to every call.', 5),
('projects_stats', '25+', 'Years of experience', NULL, 1),
('projects_stats', '1200+', 'Projects delivered', NULL, 2),
('projects_stats', '98%', 'Client satisfaction', NULL, 3),
('about_designs', '', 'Static fountains', NULL, 1),
('about_designs', '', 'Dome & ring fountains', NULL, 2),
('about_designs', '', 'Water sheet/glass waterfall fountains', NULL, 3),
('about_designs', '', 'Mist fountains', NULL, 4),
('about_designs', '', 'Curtain fountains', NULL, 5),
('about_designs', '', 'Floating fountains', NULL, 6),
('about_designs', '', 'Traffic islands', NULL, 7),
('about_designs', '', 'Programmable fountain', NULL, 8),
('about_designs', '', 'Jumping jet', NULL, 9),
('about_designs', '', 'Water curtain volcano fountain', NULL, 10),
('about_designs', '', 'Wave fountain and many more models are available as per requirement', NULL, 11),
('about_services', '', 'Musical dancing fountain', NULL, 1),
('about_services', '', 'Frequency basis', NULL, 2),
('about_services', '', 'Computerized system', NULL, 3),
('about_services', '', 'Laser show production with multimedia', NULL, 4),
('about_services', '', 'Consulting and concept development', NULL, 5),
('about_services', '', 'Project management and development', NULL, 6),
('about_services', '', 'Event production', NULL, 7),
('about_services', '', 'Customer support services', NULL, 8),
('about_services', '', 'Fire magic', NULL, 9),
('about_services', '', 'Fire flame in musical fountains', NULL, 10),
('about_services', '', 'Fire work & show', NULL, 11);

INSERT INTO menu_links (menu, label, href, sort_order) VALUES
('header_products_recommended', 'Dancing Fountains', '/products/dancing-fountains', 1),
('header_products_recommended', 'Musical Fountains', '/products/musical-fountains', 2),
('header_products_recommended', 'Floating Fountains', '/products/floating-fountains', 3),
('header_products_buttons', 'Design Assistance', '/contact', 1),
('header_products_buttons', 'Get a Quote', '/contact', 2),
('header_gallery_recommended', 'Photo Gallery', '/gallery#photos', 1),
('header_gallery_recommended', 'Video Gallery', '/gallery#videos', 2),
('header_gallery_recommended', 'Our Projects', '/projects', 3),
('header_gallery_recommended', 'Press & Media', '/press', 4),
('header_gallery_buttons', 'Explore Projects', '/projects', 1),
('header_gallery_buttons', 'Contact Us', '/contact', 2),
('footer_quick', 'About Us', '/about', 1),
('footer_quick', 'Products', '/products', 2),
('footer_quick', 'Projects', '/projects', 3),
('footer_quick', 'Gallery', '/gallery', 4),
('footer_quick', 'Press & Media', '/press', 5),
('footer_quick', 'Contact', '/contact', 6),
('footer_products', 'Dancing Fountains', '/products/dancing-fountains', 1),
('footer_products', 'Musical Fountains', '/products/musical-fountains', 2),
('footer_products', 'Floating Fountains', '/products/floating-fountains', 3),
('footer_products', 'Wall Fountains', '/products/wall-fountains', 4),
('footer_products', 'Static Fountains', '/products/static-fountains', 5),
('footer_social', 'Instagram', 'https://www.instagram.com/marvel_fountains', 1),
('footer_social', 'WhatsApp', 'https://api.whatsapp.com/send?phone=919825068827', 2);
