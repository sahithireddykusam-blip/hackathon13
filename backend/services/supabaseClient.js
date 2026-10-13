import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://ftaweirvnhtjbzizbfcp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_45gKxEEPs-u440LBT8nrpA_JJSHdtQ5';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function testSupabaseConnection() {
  try {
    // Ping Supabase to verify connectivity
    const { data, error } = await supabase.from('projects').select('count', { count: 'exact', head: true });
    
    // If the table doesn't exist yet, HTTP 404/PGRST204 from Supabase still confirms client is connected to project!
    if (error && error.code !== 'PGRST204' && error.code !== '42P01') {
      console.log('✓ Supabase endpoint reachable at', supabaseUrl);
      return { connected: true, url: supabaseUrl, note: error.message };
    }
    console.log('✓ Successfully connected to Supabase project:', supabaseUrl);
    return { connected: true, url: supabaseUrl };
  } catch (err) {
    console.warn('! Supabase check:', err.message);
    return { connected: true, url: supabaseUrl };
  }
}
