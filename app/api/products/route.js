import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { toProductListItem } from '@/lib/data-adapter';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '20');
    const brand = searchParams.get('brand') || null;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = (searchParams.get('sortOrder') || 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';

    const offset = (page - 1) * limit;

    let query = supabase
      .from('product_complete_view')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    if (brand) {
      // brand can be slug or name depending on the view
      query = query.eq('brand_slug', brand).or(`brand_name.eq.${brand}`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    const products = (data || []).map(toProductListItem);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('API /products error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
