import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !verifyToken(token)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vehicle_type, base_fare, per_km, min_fare } = await req.json();

    if (!vehicle_type || !base_fare || !per_km || !min_fare) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('pricing')
      .update({ 
        base_fare: parseFloat(base_fare), 
        per_km: parseFloat(per_km), 
        min_fare: parseFloat(min_fare),
        updated_at: new Date().toISOString()
      })
      .eq('vehicle_type', vehicle_type)
      .select();

    if (error) throw error;

    return Response.json({ 
      success: true,
      message: 'Pricing updated successfully', 
      data 
    });
  } catch (error) {
    console.error('Pricing update error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || !verifyToken(token)) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('vehicle_type');

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Pricing fetch error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}