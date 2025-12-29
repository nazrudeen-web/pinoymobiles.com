# 🎯 Quick Reference - Supabase Integration

## 🚀 Quick Start

```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Add your Supabase credentials to .env.local
# Get from: Supabase Dashboard → Project Settings → API

# 3. Run setup script (optional)
./setup-supabase.sh

# 4. Start development
npm run dev
```

## 📦 Import Paths

```javascript
// Query functions
import { 
  getAllProducts, 
  getProductBySlug,
  getAllBrands 
} from '@/lib/supabase-queries';

// Data adapters (for backward compatibility)
import { 
  transformProductToPhone,
  transformProducts 
} from '@/lib/data-adapter';

// Supabase client (advanced usage)
import { supabase } from '@/lib/supabase';
```

## 🔍 Common Queries

### Get All Products

```javascript
const products = await getAllProducts();
```

### Get Products with Filters

```javascript
const products = await getAllProducts({
  brandId: 'uuid',           // Filter by brand
  badge: 'latest',           // Filter by badge
  minPrice: 10000,           // Min price
  maxPrice: 50000,           // Max price
  launchYear: 2024,          // Launch year
  sortBy: 'price_asc',       // Sort order
  limit: 20,                 // Results per page
  offset: 0                  // Pagination offset
});
```

### Get Product Details

```javascript
const product = await getProductBySlug('iphone-16-pro');

// Product includes:
// - brand { id, name, slug, logo }
// - images []
// - colors []
// - variants []
// - specifications_grouped {}
// - key_specifications []
// - expert_rating {}
```

### Get Latest Products

```javascript
const latest = await getLatestProducts(12);
```

### Get Popular Products

```javascript
const popular = await getPopularProducts(10);
```

### Get Budget Phones

```javascript
const budget = await getBudgetPhones(20000, 8);
```

### Get Product Prices

```javascript
const prices = await getProductPrices(productId);
// Returns array with store info, prices, stock status
```

### Search Products

```javascript
const results = await searchProducts('Samsung Galaxy', 10);
```

### Get Related Products

```javascript
const related = await getRelatedProducts(productId, 'similar', 6);
```

## 🎨 Data Structure

### Product Object

```javascript
{
  id: 'uuid',
  name: 'iPhone 16 Pro',
  slug: 'iphone-16-pro',
  description: 'Product description...',
  
  // Brand (object)
  brand: {
    id: 'uuid',
    name: 'Apple',
    slug: 'apple',
    logo: '/images/brands/apple.png'
  },
  
  // Pricing
  best_price: 84990,
  price_last_updated: '2024-01-15T10:30:00',
  
  // Images
  main_image: '/images/iphone-16-pro.jpg',
  images: [
    { image_url: '...', is_main: true, sort_order: 1 }
  ],
  
  // Colors
  colors: [
    { color_name: 'Natural Titanium', color_hex: '#8B7E74', is_available: true }
  ],
  
  // Variants
  variants: [
    { storage: '256GB', is_available: true, price_modifier: 0 }
  ],
  
  // Specifications (grouped by category)
  specifications_grouped: {
    'Display': [
      { spec_name: 'Type', spec_value: 'OLED' }
    ],
    'Performance': [...]
  },
  
  // Key Specs (highlighted)
  key_specifications: [
    { icon: '📱', title: 'Display', value: '6.3" OLED' }
  ],
  
  // Expert Rating
  expert_rating: {
    overall_score: 4.9,
    camera_score: 4.8,
    battery_score: 4.5,
    performance_score: 5.0,
    display_score: 5.0,
    pros: ['...'],
    cons: ['...']
  },
  
  // Meta
  badge: 'latest',
  launch_year: 2024,
  is_active: true
}
```

## 🔄 Data Transformation

Use adapters for backward compatibility:

```javascript
import { transformProductToPhone } from '@/lib/data-adapter';

// Transform single product
const phone = transformProductToPhone(product);

// Now works with old component structure
phone.brand // → 'Apple' (string)
phone.price // → 84990
phone.rating // → 4.9
```

## 🎯 Component Usage

### Server Component (Default)

```javascript
// app/page.js
import { getLatestProducts } from '@/lib/supabase-queries';

export default async function Page() {
  const products = await getLatestProducts(12);
  
  return <ProductList products={products} />;
}
```

### Client Component

```javascript
// app/phones/page.js (wrapper)
import { getAllProducts } from '@/lib/supabase-queries';
import PhonesClient from './PhonesClient';

export default async function Page() {
  const phones = await getAllProducts();
  return <PhonesClient phones={phones} />;
}

// PhonesClient.jsx
'use client';
export default function PhonesClient({ phones }) {
  // Client-side filtering, sorting, etc.
}
```

## ⚙️ Configuration

### Caching

```javascript
// Page level
export const revalidate = 3600; // Revalidate every hour

// Or force dynamic
export const dynamic = 'force-dynamic';
```

### Static Generation

```javascript
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}
```

## 🔧 Advanced Usage

### Direct Supabase Query

```javascript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
  .limit(10);
```

### Parallel Fetching

```javascript
const [products, brands, stores] = await Promise.all([
  getAllProducts(),
  getAllBrands(),
  getAllStores()
]);
```

## 🎨 Utility Functions

```javascript
import { 
  formatPrice,
  formatExpertScore,
  getMainImage,
  getStorageOptions,
  getColorOptions,
  isNewProduct,
  getAvailabilityStatus
} from '@/lib/data-adapter';

formatPrice(84990) // → '₱84,990'
formatExpertScore(4.87) // → '4.9'
getMainImage(product) // → '/images/...'
getStorageOptions(product) // → ['256GB', '512GB', '1TB']
isNewProduct(product) // → true/false
```

## 📊 Sort Options

Available `sortBy` values:
- `'price_asc'` - Price: Low to High
- `'price_desc'` - Price: High to Low
- `'created_at_desc'` - Newest First
- `'created_at_asc'` - Oldest First
- `'expert_score_desc'` - Highest Rated
- `'name_asc'` - Name: A-Z

## 🏷️ Badge Types

- `'latest'` - New releases
- `'upcoming'` - Coming soon
- `'popular'` - High demand
- `'featured'` - Editor's choice
- `'best-seller'` - Top selling

## 🔍 Search Tips

```javascript
// Search by brand or model name
searchProducts('iPhone 16', 10)
searchProducts('Samsung', 20)
searchProducts('Galaxy S24', 15)
```

## ⚠️ Error Handling

All query functions return:
- Empty arrays `[]` for list queries on error
- `null` for single item queries on error
- Errors are logged to console

```javascript
const product = await getProductBySlug('unknown');
if (!product) {
  notFound(); // Next.js 404
}
```

## 🔗 Related Files

- **Query Functions**: [lib/supabase-queries.js](lib/supabase-queries.js)
- **Data Adapters**: [lib/data-adapter.js](lib/data-adapter.js)
- **Supabase Client**: [lib/supabase.js](lib/supabase.js)
- **Setup Guide**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
- **Migration Guide**: [SUPABASE_MIGRATION.md](SUPABASE_MIGRATION.md)

## 📞 Support

- Check console for errors
- Verify `.env.local` variables
- Test Supabase connection in Network tab
- Review RLS policies in Supabase dashboard
- Ensure tables have data

---

**Happy coding!** 🚀
