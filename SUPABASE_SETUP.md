# Supabase Integration Setup Guide

## Overview

This guide will help you connect your Next.js application to Supabase and start using real data from your database.

## 📋 Prerequisites

- Supabase account and project created
- Database tables already set up (brands, products, stores, etc.)
- Node.js and npm installed

## 🚀 Setup Steps

### 1. Install Dependencies

Already completed! The `@supabase/supabase-js` package has been installed.

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

Then update the values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**To get these values:**
1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Go to "API" section
4. Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy "anon/public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Set Up Row Level Security (RLS)

For a public website, you'll want to enable RLS and create policies for public read access:

```sql
-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variant_color_mapping ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_colors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read access" ON specifications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON key_specifications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON expert_ratings FOR SELECT USING (true);
CREATE POLICY "Public read access" ON prices FOR SELECT USING (true);
CREATE POLICY "Public read access" ON stores FOR SELECT USING (true);
CREATE POLICY "Public read access" ON related_products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON variant_color_mapping FOR SELECT USING (true);
```

### 4. Seed Your Database (Optional)

If you need sample data, create a SQL script or use the Supabase dashboard to insert test data.

Example for adding a brand:

```sql
INSERT INTO brands (name, slug, logo, is_active)
VALUES 
  ('Apple', 'apple', '/images/brands/apple.png', true),
  ('Samsung', 'samsung', '/images/brands/samsung.png', true),
  ('Xiaomi', 'xiaomi', '/images/brands/xiaomi.png', true);
```

Example for adding a product:

```sql
INSERT INTO products (brand_id, name, slug, description, launch_year, best_price, expert_score, main_image, badge)
VALUES (
  (SELECT id FROM brands WHERE slug = 'apple'),
  'iPhone 16 Pro',
  'iphone-16-pro',
  'The latest flagship iPhone with A18 Pro chip',
  2024,
  84990,
  4.9,
  '/images/iphone-16-pro.jpg',
  'latest'
);
```

### 5. Update Your Pages

Your pages need to be updated to use async/await since data fetching is now asynchronous.

**Example - Update Home Page:**

```javascript
// app/page.js
import { getLatestProducts, getPopularProducts, getAllBrands } from '@/lib/supabase-queries';

export default async function Home() {
  // Fetch data in parallel
  const [latestPhones, popularPhones, brands] = await Promise.all([
    getLatestProducts(12),
    getPopularProducts(10),
    getAllBrands()
  ]);

  return (
    <main>
      <LatestPhones phones={latestPhones} />
      <PopularPhones phones={popularPhones} />
      <BrandsSection brands={brands} />
    </main>
  );
}
```

**Example - Update Product Detail Page:**

```javascript
// app/phones/[slug]/page.js
import { getProductBySlug, getRelatedProducts, getProductPrices } from '@/lib/supabase-queries';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const [relatedProducts, prices] = await Promise.all([
    getRelatedProducts(product.id),
    getProductPrices(product.id)
  ]);

  return (
    <div>
      <PhoneHeroSection product={product} />
      <PhoneSpecs specifications={product.specifications_grouped} />
      <PriceComparison prices={prices} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

// Generate static params for build time
export async function generateStaticParams() {
  const { data } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true);
  
  return (data || []).map((product) => ({
    slug: product.slug,
  }));
}
```

### 6. Available Query Functions

The following functions are available in `lib/supabase-queries.js`:

**Brands:**
- `getAllBrands()` - Get all active brands
- `getBrandBySlug(slug)` - Get brand by slug

**Products:**
- `getAllProducts(options)` - Get all products with filtering, sorting, pagination
- `getProductBySlug(slug)` - Get product with all details
- `getProductsByBrand(brandSlug, options)` - Get products by brand
- `getLatestProducts(limit)` - Get latest products
- `getPopularProducts(limit)` - Get popular products (by expert score)
- `getUpcomingProducts(limit)` - Get upcoming products
- `getBudgetPhones(maxPrice, limit)` - Get budget-friendly phones

**Prices:**
- `getProductPrices(productId)` - Get all prices for a product
- `getBestPrice(productId)` - Get best available price

**Stores:**
- `getAllStores()` - Get all active stores

**Related Products:**
- `getRelatedProducts(productId, type, limit)` - Get related products

**Search:**
- `searchProducts(query, limit)` - Search products by name or brand

**Comparison:**
- `getProductsForComparison(slugs)` - Get multiple products for comparison

**Statistics:**
- `getTotalProductCount(filters)` - Get total product count
- `getProductCountByBrand()` - Get product count per brand

### 7. Query Options

When using `getAllProducts()`, you can pass various options:

```javascript
const products = await getAllProducts({
  brandId: 'uuid-here',           // Filter by brand
  badge: 'latest',                 // Filter by badge (latest, upcoming, etc.)
  minPrice: 10000,                 // Minimum price
  maxPrice: 50000,                 // Maximum price
  launchYear: 2024,                // Filter by launch year
  sortBy: 'price_asc',            // Sort by: price_asc, price_desc, created_at_asc, etc.
  limit: 20,                       // Number of results
  offset: 0                        // Pagination offset
});
```

### 8. Error Handling

All query functions include error handling and will return:
- Empty arrays `[]` for list queries on error
- `null` for single item queries on error
- Errors are logged to console

### 9. Data Caching

Next.js 13+ automatically caches fetch requests. To control caching:

```javascript
// Revalidate every hour
export const revalidate = 3600;

// Or force dynamic rendering
export const dynamic = 'force-dynamic';
```

### 10. Testing Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Check the console for any Supabase connection errors
3. Visit your pages to see if data is loading
4. Check the Network tab in DevTools to see Supabase API calls

## 🔧 Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env.local` exists with correct values
- Restart your dev server after creating `.env.local`

### Error: "Invalid API key"
- Double-check your anon key in Supabase dashboard
- Make sure there are no extra spaces in `.env.local`

### No data showing up
- Check if your tables have data
- Verify RLS policies allow public read access
- Check browser console for errors

### Data structure doesn't match
- Review the query functions in `lib/supabase-queries.js`
- The functions transform data to match your component needs
- Update component props if structure has changed

## 📚 Next Steps

1. Add more advanced filters to product listing
2. Implement search functionality
3. Add analytics tracking
4. Set up automatic price updates
5. Implement product comparison feature
6. Add user reviews and ratings (with authentication)

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
