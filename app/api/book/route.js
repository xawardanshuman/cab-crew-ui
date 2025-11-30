import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function generateBookingId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `CB${timestamp}${random}`;
}

export async function POST(req) {
  try {
    const { 
      name, 
      phone, 
      pickup, 
      dropoff, 
      vehicle_type, 
      service_type, 
      date, 
      time, 
      fare_estimate, 
      fare_breakdown, 
      distance_km 
    } = await req.json();

    // Validate required fields
    if (!name || !phone || !pickup || !dropoff || !vehicle_type || !date || !time || !fare_estimate) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking_id = generateBookingId();

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          booking_id,
          name,
          phone,
          pickup,
          dropoff,
          vehicle_type,
          service_type: service_type || 'Local',
          booking_date: date,
          booking_time: time,
          distance_km: distance_km || 0,
          fare_estimate,
          fare_breakdown: fare_breakdown || {},
          status: 'confirmed'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return Response.json({ 
      success: true,
      booking_id, 
      message: 'Booking confirmed successfully',
      data 
    });
  } catch (error) {
    console.error('Booking error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}