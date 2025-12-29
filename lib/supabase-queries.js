import { supabase, handleSupabaseError } from './supabase';

// ============================================
// BRANDS
// ============================================

/**
 * Get all active brands
 */
export async function getAllBrands() {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getAllBrands') || [];
  }
}

/**
 * Get brand by slug
 */
export async function getBrandBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    return handleSupabaseError(error, 'getBrandBySlug');
  }
}

// ============================================
// PRODUCTS
// ============================================

/**
 * Get all active products with brand info
 */
export async function getAllProducts(options = {}) {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(id, name, slug, logo),
        main_image_data:product_images!product_images_product_id_fkey(image_url, is_main, sort_order)
      `)
      .eq('is_active', true);

    // Apply filters
    if (options.brandId) {
      query = query.eq('brand_id', options.brandId);
    }

    if (options.badge) {
      query = query.eq('badge', options.badge);
    }

    if (options.minPrice) {
      query = query.gte('best_price', options.minPrice);
    }

    if (options.maxPrice) {
      query = query.lte('best_price', options.maxPrice);
    }

    if (options.launchYear) {
      query = query.eq('launch_year', options.launchYear);
    }

    // Apply sorting (robust parsing for keys like "created_at_desc")
    if (options.sortBy) {
      const sortMap = {
        price_asc: { field: 'best_price', ascending: true },
        price_desc: { field: 'best_price', ascending: false },
        best_price_asc: { field: 'best_price', ascending: true },
        best_price_desc: { field: 'best_price', ascending: false },
        created_at_asc: { field: 'created_at', ascending: true },
        created_at_desc: { field: 'created_at', ascending: false },
        expert_score_asc: { field: 'expert_score', ascending: true },
        expert_score_desc: { field: 'expert_score', ascending: false },
        name_asc: { field: 'name', ascending: true },
        name_desc: { field: 'name', ascending: false },
      };

      const cfg = sortMap[options.sortBy];
      if (cfg) {
        query = query.order(cfg.field, { ascending: cfg.ascending });
      } else {
        // Fallback: parse by last underscore
        const idx = options.sortBy.lastIndexOf('_');
        if (idx > 0) {
          const field = options.sortBy.substring(0, idx);
          const order = options.sortBy.substring(idx + 1);
          query = query.order(field, { ascending: order === 'asc' });
        } else {
          query = query.order('created_at', { ascending: false });
        }
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform data to include main_image (sorted by sort_order)
    return (data || []).map(product => {
      const sortedImages = [...(product.main_image_data || [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

      const mainImage =
        sortedImages.find(img => img.is_main)?.image_url ||
        sortedImages[0]?.image_url ||
        null;

      return {
        ...product,
        main_image: mainImage,
      };
    });
  } catch (error) {
    return handleSupabaseError(error, 'getAllProducts') || [];
  }
}

/**
 * Get product by slug with all details
 */
export async function getProductBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(id, name, slug, logo),
        images:product_images(id, image_url, is_main, sort_order),
        colors:product_colors(id, color_name, color_hex, color_image, is_available, sort_order),
        variants:product_variants(id, storage, color_hex, sku, is_available, price_modifier),
        specifications(id, spec_group, spec_name, spec_value, sort_order, icon, is_key_spec),
        key_specifications(id, icon, title, value, sort_order),
        expert_rating:expert_ratings(
          overall_score, 
          camera_score, 
          battery_score, 
          performance_score, 
          display_score,
          pros,
          cons,
          camera_details,
          battery_details,
          performance_details,
          display_details,
          camera_pros,
          camera_cons,
          battery_pros,
          battery_cons,
          performance_pros,
          performance_cons,
          display_pros,
          display_cons
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    // Sort arrays
    if (data) {
      // Sort images strictly by sort_order (lowest first); main image is the one with sort_order = 0
      data.images = (data.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      data.key_specifications = (data.key_specifications || []).sort((a, b) => a.sort_order - b.sort_order);
      
      // Group specifications
      const specsGrouped = {};
      (data.specifications || []).forEach(spec => {
        if (!specsGrouped[spec.spec_group]) {
          specsGrouped[spec.spec_group] = [];
        }
        specsGrouped[spec.spec_group].push(spec);
      });
      
      // Sort specs within each group
      Object.keys(specsGrouped).forEach(group => {
        specsGrouped[group].sort((a, b) => a.sort_order - b.sort_order);
      });
      
      data.specifications_grouped = specsGrouped;
      
      // Extract expert_rating from array if exists
      if (data.expert_rating && Array.isArray(data.expert_rating) && data.expert_rating.length > 0) {
        data.expert_rating = data.expert_rating[0];
      }
    }
    return data;
  } catch (error) {
    return handleSupabaseError(error, 'getProductBySlug');
  }
}

/**
 * Get products by brand slug
 */
export async function getProductsByBrand(brandSlug, options = {}) {
  try {
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', brandSlug)
      .single();

    if (brandError) throw brandError;

    return getAllProducts({ ...options, brandId: brand.id });
  } catch (error) {
    return handleSupabaseError(error, 'getProductsByBrand') || [];
  }
}

/**
 * Get latest products
 */
export async function getLatestProducts(limit = 10) {
  return getAllProducts({ 
    limit,
    sortBy: 'created_at_desc'
  });
}

/**
 * Get popular products (can be based on views, ratings, etc.)
 */
export async function getPopularProducts(limit = 10) {
  return getAllProducts({ 
    limit,
    sortBy: 'expert_score_desc'
  });
}

/**
 * Get upcoming products
 */
export async function getUpcomingProducts(limit = 10) {
  return getAllProducts({ 
    badge: 'upcoming',
    limit,
    sortBy: 'created_at_desc'
  });
}

/**
 * Get budget phones
 */
export async function getBudgetPhones(maxPrice = 15000, limit = 10) {
  return getAllProducts({ 
    maxPrice,
    limit,
    sortBy: 'best_price_asc'
  });
}

// ============================================
// PRICES
// ============================================

/**
 * Get prices for a product
 */
export async function getProductPrices(productId) {
  try {
    const { data, error } = await supabase
      .from('prices')
      .select(`
        *,
        store:stores(id, name, logo, website_url, is_official, delivery_time, return_policy, is_authorized_seller),
        variant:product_variants(id, storage, color_hex)
      `)
      .eq('product_id', productId)
      .order('price', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getProductPrices') || [];
  }
}

/**
 * Get best price for a product
 */
export async function getBestPrice(productId) {
  try {
    const { data, error } = await supabase
      .from('prices')
      .select(`
        *,
        store:stores(id, name, logo, website_url, is_official)
      `)
      .eq('product_id', productId)
      .eq('stock_status', 'in_stock')
      .order('price', { ascending: true })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    return handleSupabaseError(error, 'getBestPrice');
  }
}

// ============================================
// STORES
// ============================================

/**
 * Get all active stores
 */
export async function getAllStores() {
  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getAllStores') || [];
  }
}

// ============================================
// RELATED PRODUCTS
// ============================================

/**
 * Get related products
 */
export async function getRelatedProducts(productId, type = 'similar', limit = 6) {
  try {
    const { data, error } = await supabase
      .from('related_products')
      .select(`
        type,
        related_product:products!related_products_related_product_id_fkey(
          id,
          name,
          slug,
          best_price,
          expert_score,
          main_image,
          badge,
          brand:brands(name, slug)
        )
      `)
      .eq('product_id', productId)
      .eq('type', type)
      .limit(limit);

    if (error) throw error;
    
    return (data || []).map(item => item.related_product).filter(Boolean);
  } catch (error) {
    return handleSupabaseError(error, 'getRelatedProducts') || [];
  }
}

// ============================================
// SEARCH
// ============================================

/**
 * Search products by name or brand
 */
export async function searchProducts(query, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(id, name, slug, logo)
      `)
      .or(`name.ilike.%${query}%,brand.name.ilike.%${query}%`)
      .eq('is_active', true)
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'searchProducts') || [];
  }
}

// ============================================
// COMPARISON
// ============================================

/**
 * Get products for comparison by slugs
 */
export async function getProductsForComparison(slugs) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(id, name, slug, logo),
        images:product_images(image_url, is_main),
        specifications(spec_group, spec_name, spec_value, sort_order),
        key_specifications(icon, title, value),
        expert_rating:expert_ratings(overall_score, camera_score, battery_score, performance_score, display_score)
      `)
      .in('slug', slugs)
      .eq('is_active', true);

    if (error) throw error;
    
    return (data || []).map(product => ({
      ...product,
      main_image: product.images?.find(img => img.is_main)?.image_url || product.images?.[0]?.image_url,
      expert_rating: Array.isArray(product.expert_rating) && product.expert_rating.length > 0 
        ? product.expert_rating[0] 
        : product.expert_rating
    }));
  } catch (error) {
    return handleSupabaseError(error, 'getProductsForComparison') || [];
  }
}

// ============================================
// STATISTICS
// ============================================

/**
 * Get total product count
 */
export async function getTotalProductCount(filters = {}) {
  try {
    let query = supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    if (filters.brandId) {
      query = query.eq('brand_id', filters.brandId);
    }

    const { count, error } = await query;

    if (error) throw error;
    return count || 0;
  } catch (error) {
    return handleSupabaseError(error, 'getTotalProductCount') || 0;
  }
}

/**
 * Get product count by brand
 */
export async function getProductCountByBrand() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('brand_id, brands(name, slug)')
      .eq('is_active', true);

    if (error) throw error;
    
    // Count products per brand
    const counts = {};
    (data || []).forEach(product => {
      const brandSlug = product.brands?.slug;
      if (brandSlug) {
        counts[brandSlug] = (counts[brandSlug] || 0) + 1;
      }
    });
    
    return counts;
  } catch (error) {
    return handleSupabaseError(error, 'getProductCountByBrand') || {};
  }
}
