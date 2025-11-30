import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password_hash);

    if (!isPasswordValid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    return Response.json({ 
      success: true,
      token, 
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}