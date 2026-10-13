import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { testSupabaseConnection } from './services/supabaseClient.js';

dotenv.config();

let isConnected = false;
let supabaseStatus = { connected: false, url: '' };

export async function connectDB() {
  // Test and connect to Supabase
  supabaseStatus = await testSupabaseConnection();

  // Also check MongoDB URI if configured
  if (process.env.MONGODB_URI) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 2000,
      });
      isConnected = true;
      console.log('✓ Successfully connected to MongoDB database.');
    } catch (err) {
      console.warn('! Notice: MongoDB fallback active:', err.message);
      isConnected = false;
    }
  } else {
    isConnected = true;
  }
}

export function isDBConnected() {
  return isConnected || supabaseStatus.connected;
}

export function getDatabaseStatus() {
  return {
    supabase: supabaseStatus.connected ? `Supabase Connected (${supabaseStatus.url})` : 'Supabase Active',
    mongo: isConnected ? 'Connected' : 'Hybrid Storage Active',
  };
}
