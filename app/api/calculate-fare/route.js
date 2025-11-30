import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getDistanceFromGoogle(pickup, dropoff) {
  const apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY;
  const origin = `${pickup}, Pune, Maharashtra, India`;
  const destination = `${dropoff}, Pune, Maharashtra, India`;
  
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.rows[0]?.elements[0]?.status === 'OK') {
    return data.rows[0].elements[0].distance.value / 1000; // Convert meters to km
  }
  throw new Error('Distance calculation failed');
}

function isPeakHour(time) {
  const hour = parseInt(time.split(':')[0]);
  return (hour >= 8 && hour < 10) || (hour >= 17 && hour < 20);
}

function isNightHour(time) {
  const hour = parseInt(time.split(':')[0]);
  return hour >= 22 || hour < 6;
}

export async function POST(req) {
  try {
    const { service_type, vehicle_type, pickup, dropoff, date, time } = await req.json();

    // Validate inputs
    if (!pickup || !dropoff || !vehicle_type || !time) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get pricing
    const { data: pricing, error: pricingError } = await supabase
      .from('pricing')
      .select('*')
      .eq('vehicle_type', vehicle_type)
      .single();

    if (pricingError) throw new Error('Pricing not found');

    // Get distance from Google
    const distance_km = await getDistanceFromGoogle(pickup, dropoff);

    // Calculate base fare
    let fare = pricing.base_fare + (distance_km * pricing.per_km);

    // Apply minimum fare
    fare = Math.max(fare, pricing.min_fare);

    // Build breakdown
    const breakdown = {
      base_fare: pricing.base_fare,
      distance_km: parseFloat(distance_km.toFixed(2)),
      distance_charge: parseFloat((distance_km * pricing.per_km).toFixed(2)),
      subtotal: parseFloat(fare.toFixed(2))
    };

    // Apply night charge
    if (isNightHour(time)) {
      const { data: nightCharge } = await supabase
        .from('extra_charges')
        .select('amount')
        .eq('name', 'Night Charge')
        .single();
      
      if (nightCharge) {
        fare += nightCharge.amount;
        breakdown.night_charge = nightCharge.amount;
      }
    }

    // Apply peak multiplier
    if (isPeakHour(time)) {
      const { data: peakMultiplier } = await supabase
        .from('extra_charges')
        .select('multiplier')
        .eq('name', 'Peak Hour Multiplier')
        .single();
      
      if (peakMultiplier) {
        const originalFare = fare;
        fare = fare * peakMultiplier.multiplier;
        breakdown.peak_multiplier = parseFloat((fare - originalFare).toFixed(2));
      }
    }

    return Response.json({
      distance_km: parseFloat(distance_km.toFixed(2)),
      estimated_fare: parseFloat(fare.toFixed(2)),
      breakdown
    });
  } catch (error) {
    console.error('Fare calculation error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}