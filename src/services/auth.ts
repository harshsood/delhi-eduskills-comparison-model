import { supabase } from '@/lib/supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export interface SendOTPResponse {
  success: boolean;
  message: string;
  devOtp?: string;
  error?: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    phone: string;
    name: string;
    is_verified: boolean;
  };
  message: string;
  error?: string;
}

export const authService = {
  async sendOTP(email: string, phone: string, name: string): Promise<SendOTPResponse> {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, phone, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      return data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  async verifyOTP(email: string, phone: string, name: string, otp: string): Promise<VerifyOTPResponse> {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, phone, name, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify OTP');
      }

      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_verified', true)
        .maybeSingle();

      if (error || !user) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
};
