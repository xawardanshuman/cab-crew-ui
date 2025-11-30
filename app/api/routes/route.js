import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('routes')
      .select('location_name')
      .order('location_name');

    if (error) throw error;

    return Response.json(data.map(r => r.location_name));
  } catch (error) {
    console.error('Routes fetch error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}