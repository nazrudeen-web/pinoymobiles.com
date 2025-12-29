/**
 * Data Adapter Utilities
 * 
 * These functions help transform Supabase data to match the format
 * expected by existing components, ensuring backward compatibility.
 */

/**
 * Transform Supabase product to legacy phone format
 * This helps existing components work without modifications
 */
export function transformProductToPhone(product) {
  if (!product) return null;

  return {
    // Basic info
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    
    // Brand - handle both old string format and new object format
    brand: product.brand?.name || product.brand || '',
    brandSlug: product.brand?.slug || '',
    brandLogo: product.brand?.logo || '',
    
    // Pricing
    price: product.best_price || 0,
    oldPrice: product.old_price || null,
    
    // Rating/Score
    rating: product.expert_score || 0,
    expert_score: product.expert_score || 0,
    
    // Images
    image: product.main_image || '',
    main_image: product.main_image || '',
    images: product.images || [],
    
    // Badge/Category
    badge: product.badge || '',
    category: getCategoryFromProduct(product),
    
    // Year
    launch_year: product.launch_year,
    year: product.launch_year,
    
    // Variants
    variants: product.variants || [],
    colors: product.colors || [],
    
    // Specifications
    specs: product.specifications_grouped || product.specifications || {},
    specifications: product.specifications_grouped || {},
    key_specifications: product.key_specifications || [],
    
    // Highlights (derived from key specs)
    highlights: deriveHighlights(product),
    
    // Expert Rating
    expertRating: product.expert_rating || null,
    pros: product.expert_rating?.pros || [],
    cons: product.expert_rating?.cons || [],
    
    // Additional data
    prices: product.prices || [],
    relatedProducts: product.relatedProducts || [],
    
    // OS (derived from specs or brand)
    os: deriveOS(product),
    
    // Keep original for debugging
    _original: product
  };
}

/**
 * Transform multiple products
 */
export function transformProducts(products) {
  if (!products || !Array.isArray(products)) return [];
  return products.map(transformProductToPhone);
}

/**
 * Derive category from badge or price
 */
function getCategoryFromProduct(product) {
  if (product.category) return product.category;
  
  const price = product.best_price || 0;
  
  if (price >= 60000) return 'Flagship';
  if (price >= 25000) return 'Mid-range';
  if (price >= 10000) return 'Budget';
  return 'Entry';
}

/**
 * Derive OS from specifications or brand
 */
function deriveOS(product) {
  // Check specifications first
  if (product.specifications_grouped?.['Platform']?.['OS']) {
    const os = product.specifications_grouped['Platform']['OS'];
    if (os.toLowerCase().includes('ios')) return 'iOS';
    if (os.toLowerCase().includes('android')) return 'Android';
    return os;
  }
  
  // Check individual specs
  const osSpec = product.specifications?.find(
    s => s.spec_name?.toLowerCase() === 'os' || s.spec_group?.toLowerCase() === 'platform'
  );
  if (osSpec) {
    if (osSpec.spec_value?.toLowerCase().includes('ios')) return 'iOS';
    if (osSpec.spec_value?.toLowerCase().includes('android')) return 'Android';
    return osSpec.spec_value;
  }
  
  // Derive from brand
  const brandName = product.brand?.name || product.brand || '';
  if (brandName.toLowerCase() === 'apple') return 'iOS';
  
  return 'Android'; // Default
}

/**
 * Derive highlights from key specifications
 */
function deriveHighlights(product) {
  const highlights = [];
  
  // From key specifications
  if (product.key_specifications?.length > 0) {
    product.key_specifications.forEach(spec => {
      highlights.push(`${spec.title}: ${spec.value}`);
    });
  }
  
  // From expert rating pros
  if (highlights.length === 0 && product.expert_rating?.pros?.length > 0) {
    return product.expert_rating.pros.slice(0, 4);
  }
  
  return highlights.slice(0, 4);
}

/**
 * Transform brand data
 */
export function transformBrand(brand) {
  if (!brand) return null;
  
  return {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo: brand.logo,
    is_active: brand.is_active,
    created_at: brand.created_at,
    updated_at: brand.updated_at
  };
}

/**
 * Transform brands array
 */
export function transformBrands(brands) {
  if (!brands || !Array.isArray(brands)) return [];
  return brands.map(transformBrand);
}

/**
 * Transform specifications to flat object (for backward compatibility)
 */
export function transformSpecsToFlat(specifications) {
  const flat = {};
  
  if (!specifications) return flat;
  
  // If already grouped
  if (!Array.isArray(specifications)) {
    Object.keys(specifications).forEach(group => {
      specifications[group].forEach(spec => {
        const key = spec.spec_name.toLowerCase().replace(/\s+/g, '_');
        flat[key] = spec.spec_value;
      });
    });
    return flat;
  }
  
  // If array format
  specifications.forEach(spec => {
    const key = spec.spec_name.toLowerCase().replace(/\s+/g, '_');
    flat[key] = spec.spec_value;
  });
  
  return flat;
}

/**
 * Format price for display
 */
export function formatPrice(price) {
  if (!price) return 'Price not available';
  return `₱${Number(price).toLocaleString('en-PH')}`;
}

/**
 * Format expert score for display
 */
export function formatExpertScore(score) {
  if (!score) return 'N/A';
  return Number(score).toFixed(1);
}

/**
 * Get main image URL from product
 */
export function getMainImage(product) {
  // Direct main_image field
  if (product.main_image) return product.main_image;
  
  // From images array - find marked as main
  if (product.images?.length > 0) {
    const mainImg = product.images.find(img => img.is_main);
    if (mainImg) return mainImg.image_url;
    
    // Fallback to first image
    return product.images[0].image_url;
  }
  
  // Legacy image field
  if (product.image) return product.image;
  
  // Fallback
  return '/images/placeholder-phone.jpg';
}

/**
 * Get available storage options from variants
 */
export function getStorageOptions(product) {
  if (!product.variants?.length) return [];
  
  const storages = [...new Set(product.variants.map(v => v.storage))];
  return storages.sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    return aNum - bNum;
  });
}

/**
 * Get available colors
 */
export function getColorOptions(product) {
  if (!product.colors?.length) return [];
  
  return product.colors
    .filter(c => c.is_available)
    .sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Check if product is new (within last 90 days)
 */
export function isNewProduct(product) {
  if (!product.created_at) return false;
  
  const createdDate = new Date(product.created_at);
  const now = new Date();
  const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
  
  return diffDays <= 90;
}

/**
 * Check if product is upcoming
 */
export function isUpcoming(product) {
  return product.badge === 'upcoming' || product.badge === 'coming-soon';
}

/**
 * Get product availability status
 */
export function getAvailabilityStatus(product) {
  if (isUpcoming(product)) return 'Coming Soon';
  
  // Check if any variants are available
  const hasAvailable = product.variants?.some(v => v.is_available);
  if (hasAvailable) return 'In Stock';
  
  // Check prices
  const hasInStockPrice = product.prices?.some(p => p.stock_status === 'in_stock');
  if (hasInStockPrice) return 'In Stock';
  
  return 'Out of Stock';
}

/**
 * New DTO adapters used by API routes
 */
export function toProductListItem(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brand: {
      name: row.brand_name ?? row.brand?.name ?? '',
      slug: row.brand_slug ?? row.brand?.slug ?? '',
      logo: row.brand_logo ?? row.brand?.logo ?? undefined,
    },
    main_image: row.main_image ?? row.image_url ?? undefined,
    badge: row.badge ?? undefined,
    best_price: row.best_price ?? null,
    expert_score: row.expert_score ?? null,
    launch_year: row.launch_year ?? undefined,
    storage_options: Array.isArray(row.storage_options) ? row.storage_options : [],
  };
}

export function toProductDetail(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    brand: {
      name: row.brand_name ?? row.brand?.name ?? '',
      slug: row.brand_slug ?? row.brand?.slug ?? '',
      logo: row.brand_logo ?? row.brand?.logo ?? undefined,
    },
    main_image: row.main_image ?? undefined,
    images: row.images ?? [],
    colors: row.colors ?? [],
    variants: row.variants ?? [],
    key_specifications: row.key_specifications ?? [],
    specifications_grouped: row.specifications_grouped ?? {},
    expert_rating: row.expert_rating ?? null,
    badge: row.badge ?? undefined,
    best_price: row.best_price ?? null,
    expert_score: row.expert_score ?? null,
    launch_year: row.launch_year ?? undefined,
  };
}

export function toPriceItem(row) {
  if (!row) return null;
  return {
    id: row.id,
    store: {
      id: row.store_id ?? row.store?.id,
      name: row.store_name ?? row.store?.name,
      logo: row.store_logo ?? row.store?.logo,
      website_url: row.website_url ?? row.store?.website_url,
      is_official: row.is_official ?? row.store?.is_official,
      is_authorized_seller: row.is_authorized_seller ?? row.store?.is_authorized_seller,
    },
    variant: {
      id: row.variant_id ?? row.variant?.id,
      storage: row.storage ?? row.variant?.storage,
      color_name: row.color_name ?? undefined,
      color_hex: row.color_hex ?? row.variant?.color_hex,
    },
    price: row.price,
    old_price: row.old_price ?? null,
    discount: row.old_price ? Math.max(0, row.old_price - row.price) : null,
    affiliate_url: row.affiliate_url ?? null,
    updated_at: row.updated_at ?? undefined,
  };
}
