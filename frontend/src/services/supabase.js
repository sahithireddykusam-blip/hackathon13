import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ftaweirvnhtjbzizbfcp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_45gKxEEPs-u440LBT8nrpA_JJSHdtQ5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
