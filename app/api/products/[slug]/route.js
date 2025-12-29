import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { toProductDetail, toPriceItem } from '@/lib/data-adapter';

export async function GET(request, { params }) {
  try {
    const slug = params.slug;

    const { data: productData, error: productError } = await supabase
      .from('product_complete_view')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (productError) throw productError;
    if (!productData) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const product = toProductDetail(productData);

    const { data: pricesData, error: pricesError } = await supabase
      .from('variant_prices_view')
      .select('*')
      .eq('product_id', product.id)
      .order('price', { ascending: true });

    if (pricesError) throw pricesError;

    const prices = (pricesData || []).map(toPriceItem);

    return NextResponse.json({ product, prices });
  } catch (error) {
    console.error('API /products/[slug] error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
