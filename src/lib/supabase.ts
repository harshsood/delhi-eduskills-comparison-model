import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string;
          name: string;
          password_hash: string | null;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          phone: string;
          name: string;
          password_hash?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          phone?: string;
          name?: string;
          password_hash?: string | null;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      otp_verifications: {
        Row: {
          id: string;
          phone: string;
          email: string | null;
          otp_code: string;
          expires_at: string;
          is_used: boolean;
          attempts: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          email?: string | null;
          otp_code: string;
          expires_at: string;
          is_used?: boolean;
          attempts?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          email?: string | null;
          otp_code?: string;
          expires_at?: string;
          is_used?: boolean;
          attempts?: number;
          created_at?: string;
        };
      };
    };
  };
};
