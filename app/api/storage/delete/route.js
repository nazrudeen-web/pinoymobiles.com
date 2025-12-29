import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { bucket, imageUrl, fileName, productId } = body;

    if (!bucket || (!imageUrl && !fileName)) {
      return NextResponse.json({ error: 'Missing bucket or file reference' }, { status: 400 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!serviceKey || !supabaseUrl) {
      return NextResponse.json({ error: 'Missing Supabase service credentials' }, { status: 500 });
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // Determine file path from imageUrl if not provided
    let path = fileName;
    if (!path && imageUrl) {
      const url = new URL(imageUrl);
      // Extract after '/storage/v1/object/public/<bucket>/'
      const marker = `/storage/v1/object/public/${bucket}/`;
      const idx = url.pathname.indexOf(marker);
      if (idx >= 0) {
        path = url.pathname.substring(idx + marker.length);
      }
    }

    if (!path) {
      return NextResponse.json({ error: 'Unable to determine file path' }, { status: 400 });
    }

    // Delete from storage
    const { error: storageError } = await admin.storage.from(bucket).remove([path]);
    if (storageError) throw storageError;

    // Optionally delete DB record and clear main_image
    if (productId) {
      await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)
        .eq('image_url', imageUrl);

      // If the product.main_image matches, clear it
      const { data: product, error: prodError } = await supabase
        .from('products')
        .select('id, main_image')
        .eq('id', productId)
        .single();
      if (!prodError && product?.main_image === imageUrl) {
        await supabase
          .from('products')
          .update({ main_image: null })
          .eq('id', productId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('API /storage/delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
