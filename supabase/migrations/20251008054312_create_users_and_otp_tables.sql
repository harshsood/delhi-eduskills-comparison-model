/*
  # Create Users and OTP Tables

  ## Overview
  This migration creates the core authentication tables for user management and OTP verification.

  ## New Tables
  
  ### 1. `users` table
  Stores user account information
  - `id` (uuid, primary key) - Unique identifier for each user
  - `email` (text, unique, not null) - User's email address
  - `phone` (text, unique, not null) - User's phone number
  - `name` (text, not null) - User's full name
  - `password_hash` (text) - Hashed password for login (optional, can use OTP only)
  - `is_verified` (boolean, default false) - Whether the user has verified their account
  - `created_at` (timestamptz, default now()) - Account creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 2. `otp_verifications` table
  Stores OTP verification codes for phone verification
  - `id` (uuid, primary key) - Unique identifier for each OTP request
  - `phone` (text, not null) - Phone number the OTP was sent to
  - `email` (text) - Optional email associated with the OTP
  - `otp_code` (text, not null) - The 6-digit OTP code
  - `expires_at` (timestamptz, not null) - When the OTP expires (typically 10 minutes)
  - `is_used` (boolean, default false) - Whether the OTP has been verified
  - `attempts` (integer, default 0) - Number of verification attempts
  - `created_at` (timestamptz, default now()) - When the OTP was created

  ## Security
  - Enable Row Level Security (RLS) on both tables
  - Users can only read their own data
  - Users can insert their own records during signup
  - Users can update their own profile data
  - OTP table is protected - only accessible through edge functions

  ## Important Notes
  1. OTP codes expire after 10 minutes for security
  2. Maximum 3 verification attempts per OTP
  3. Phone numbers must be unique to prevent duplicate accounts
  4. Passwords are optional - users can authenticate via OTP only
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text UNIQUE NOT NULL,
  name text NOT NULL,
  password_hash text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS otp_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  email text,
  otp_code text NOT NULL,
  expires_at timestamptz NOT NULL,
  is_used boolean DEFAULT false,
  attempts integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert user data"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage OTP data"
  ON otp_verifications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();