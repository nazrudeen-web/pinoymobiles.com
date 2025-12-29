-- Example seed data for Pinoymobiles database
-- Run this in your Supabase SQL Editor

-- Insert Brands
INSERT INTO brands (name, slug, logo, is_active) VALUES
  ('Apple', 'apple', '/images/brands/apple.png', true),
  ('Samsung', 'samsung', '/images/brands/samsung.png', true),
  ('Xiaomi', 'xiaomi', '/images/brands/xiaomi.png', true),
  ('OPPO', 'oppo', '/images/brands/oppo.png', true),
  ('Vivo', 'vivo', '/images/brands/vivo.png', true),
  ('Realme', 'realme', '/images/brands/realme.png', true),
  ('OnePlus', 'oneplus', '/images/brands/oneplus.png', true),
  ('Google', 'google', '/images/brands/google.png', true),
  ('Huawei', 'huawei', '/images/brands/huawei.png', true),
  ('Motorola', 'motorola', '/images/brands/motorola.png', true);

-- Insert Stores
INSERT INTO stores (name, logo, website_url, is_official, is_authorized_seller, delivery_time, return_policy, is_active) VALUES
  ('Lazada', '/images/stores/lazada.png', 'https://lazada.com.ph', false, true, '2-5 days', '7 days return', true),
  ('Shopee', '/images/stores/shopee.png', 'https://shopee.ph', false, true, '3-7 days', '7 days return', true),
  ('Apple Store', '/images/stores/apple.png', 'https://apple.com/ph', true, true, '1-3 days', '14 days return', true),
  ('Samsung Official Store', '/images/stores/samsung.png', 'https://samsung.com/ph', true, true, '1-3 days', '7 days return', true),
  ('Abenson', '/images/stores/abenson.png', 'https://abenson.com', false, true, '2-5 days', '7 days return', true),
  ('SM Appliance', '/images/stores/sm.png', 'https://sm-appliance.com', false, true, '3-7 days', '7 days return', true);

-- Example: Insert iPhone 16 Pro
DO $$
DECLARE
  brand_apple_id uuid;
  product_id uuid;
  store_lazada_id uuid;
  store_apple_id uuid;
  variant_256gb_id uuid;
  variant_512gb_id uuid;
  color_natural_id uuid;
  color_blue_id uuid;
BEGIN
  -- Get brand IDs
  SELECT id INTO brand_apple_id FROM brands WHERE slug = 'apple';
  SELECT id INTO store_lazada_id FROM stores WHERE name = 'Lazada';
  SELECT id INTO store_apple_id FROM stores WHERE name = 'Apple Store';

  -- Insert Product
  INSERT INTO products (
    brand_id, name, slug, description, launch_year, 
    best_price, expert_score, main_image, badge, is_active
  ) VALUES (
    brand_apple_id,
    'iPhone 16 Pro',
    'iphone-16-pro',
    'The latest flagship iPhone with A18 Pro chip, advanced camera system, and titanium design.',
    2024,
    84990,
    4.9,
    '/images/iphone-16-pro.jpg',
    'latest',
    true
  ) RETURNING id INTO product_id;

  -- Insert Product Images
  INSERT INTO product_images (product_id, image_url, is_main, sort_order) VALUES
    (product_id, '/images/iphone-16-pro-front.jpg', true, 1),
    (product_id, '/images/iphone-16-pro-back.jpg', false, 2),
    (product_id, '/images/iphone-16-pro-side.jpg', false, 3);

  -- Insert Colors
  INSERT INTO product_colors (product_id, color_name, color_hex, is_available, sort_order) VALUES
    (product_id, 'Natural Titanium', '#8B7E74', true, 1) RETURNING id INTO color_natural_id;
  INSERT INTO product_colors (product_id, color_name, color_hex, is_available, sort_order) VALUES
    (product_id, 'Blue Titanium', '#4A5D75', true, 2) RETURNING id INTO color_blue_id;
  INSERT INTO product_colors (product_id, color_name, color_hex, is_available, sort_order) VALUES
    (product_id, 'White Titanium', '#E8E8E8', true, 3);
  INSERT INTO product_colors (product_id, color_name, color_hex, is_available, sort_order) VALUES
    (product_id, 'Black Titanium', '#2C2C2C', true, 4);

  -- Insert Variants
  INSERT INTO product_variants (product_id, storage, is_available) VALUES
    (product_id, '256GB', true) RETURNING id INTO variant_256gb_id;
  INSERT INTO product_variants (product_id, storage, is_available) VALUES
    (product_id, '512GB', true) RETURNING id INTO variant_512gb_id;
  INSERT INTO product_variants (product_id, storage, is_available) VALUES
    (product_id, '1TB', true);

  -- Insert Prices
  INSERT INTO prices (product_id, variant_id, store_id, price, old_price, stock_status, affiliate_url) VALUES
    (product_id, variant_256gb_id, store_apple_id, 84990, NULL, 'in_stock', 'https://apple.com/ph/iphone-16-pro'),
    (product_id, variant_256gb_id, store_lazada_id, 86990, 89990, 'in_stock', 'https://lazada.com.ph/iphone-16-pro'),
    (product_id, variant_512gb_id, store_apple_id, 94990, NULL, 'in_stock', 'https://apple.com/ph/iphone-16-pro');

  -- Insert Key Specifications
  INSERT INTO key_specifications (product_id, icon, title, value, sort_order) VALUES
    (product_id, '📱', 'Display', '6.3" Super Retina XDR', 1),
    (product_id, '⚡', 'Processor', 'A18 Pro chip', 2),
    (product_id, '📷', 'Camera', '48MP Triple Camera', 3),
    (product_id, '🔋', 'Battery', '3582 mAh', 4);

  -- Insert Detailed Specifications
  INSERT INTO specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
    (product_id, 'Display', 'Type', 'Super Retina XDR OLED', 1),
    (product_id, 'Display', 'Size', '6.3 inches', 2),
    (product_id, 'Display', 'Resolution', '2556 x 1179 pixels', 3),
    (product_id, 'Display', 'Refresh Rate', '120Hz ProMotion', 4),
    (product_id, 'Performance', 'Chipset', 'Apple A18 Pro', 1),
    (product_id, 'Performance', 'CPU', 'Hexa-core', 2),
    (product_id, 'Performance', 'GPU', 'Apple GPU (6-core)', 3),
    (product_id, 'Performance', 'RAM', '8GB', 4),
    (product_id, 'Camera', 'Main', '48MP, f/1.78', 1),
    (product_id, 'Camera', 'Telephoto', '12MP, f/2.8', 2),
    (product_id, 'Camera', 'Ultra Wide', '12MP, f/1.9', 3),
    (product_id, 'Camera', 'Front', '12MP, f/1.9', 4),
    (product_id, 'Battery', 'Capacity', '3582 mAh', 1),
    (product_id, 'Battery', 'Charging', '25W fast charging', 2),
    (product_id, 'Battery', 'Wireless', '15W MagSafe', 3);

  -- Insert Expert Rating
  INSERT INTO expert_ratings (
    product_id, overall_score, camera_score, battery_score, 
    performance_score, display_score, pros, cons
  ) VALUES (
    product_id,
    4.9,
    4.9,
    4.5,
    5.0,
    5.0,
    ARRAY['Best performance in class', 'Exceptional camera quality', 'Premium titanium build', 'Long software support'],
    ARRAY['High price point', 'No charger included', 'Limited customization']
  );

END $$;

-- Example: Insert Samsung Galaxy S24 Ultra
DO $$
DECLARE
  brand_samsung_id uuid;
  product_id uuid;
  store_lazada_id uuid;
  store_samsung_id uuid;
BEGIN
  SELECT id INTO brand_samsung_id FROM brands WHERE slug = 'samsung';
  SELECT id INTO store_lazada_id FROM stores WHERE name = 'Lazada';
  SELECT id INTO store_samsung_id FROM stores WHERE name = 'Samsung Official Store';

  INSERT INTO products (
    brand_id, name, slug, description, launch_year, 
    best_price, expert_score, main_image, badge, is_active
  ) VALUES (
    brand_samsung_id,
    'Samsung Galaxy S24 Ultra',
    'samsung-galaxy-s24-ultra',
    'Ultimate flagship with 200MP camera, S Pen, and AI features.',
    2024,
    79990,
    4.8,
    '/images/galaxy-s24-ultra.jpg',
    'latest',
    true
  ) RETURNING id INTO product_id;

  INSERT INTO product_images (product_id, image_url, is_main, sort_order) VALUES
    (product_id, '/images/galaxy-s24-ultra-front.jpg', true, 1),
    (product_id, '/images/galaxy-s24-ultra-back.jpg', false, 2);

  INSERT INTO product_colors (product_id, color_name, color_hex, is_available, sort_order) VALUES
    (product_id, 'Titanium Gray', '#71727A', true, 1),
    (product_id, 'Titanium Black', '#2C2C2C', true, 2),
    (product_id, 'Titanium Violet', '#8B6F9B', true, 3);

  INSERT INTO product_variants (product_id, storage, is_available) VALUES
    (product_id, '256GB', true),
    (product_id, '512GB', true),
    (product_id, '1TB', true);

  INSERT INTO key_specifications (product_id, icon, title, value, sort_order) VALUES
    (product_id, '📱', 'Display', '6.8" Dynamic AMOLED', 1),
    (product_id, '⚡', 'Processor', 'Snapdragon 8 Gen 3', 2),
    (product_id, '📷', 'Camera', '200MP Quad Camera', 3),
    (product_id, '🔋', 'Battery', '5000 mAh', 4);

  INSERT INTO expert_ratings (
    product_id, overall_score, camera_score, battery_score, 
    performance_score, display_score, pros, cons
  ) VALUES (
    product_id,
    4.8,
    5.0,
    4.8,
    4.9,
    5.0,
    ARRAY['Best zoom camera', 'Excellent display', 'S Pen included', 'All-day battery'],
    ARRAY['Heavy device', 'Expensive', 'No microSD slot']
  );

END $$;
