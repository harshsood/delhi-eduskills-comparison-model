# Deployment Guide

## Prerequisites

Your Supabase project is already configured with the connection details in `.env`:
- VITE_SUPABASE_URL: https://zgbdxtkraqrvdvniobla.supabase.co
- VITE_SUPABASE_ANON_KEY: (configured in .env)

**Note**: The database tables and edge functions have already been deployed automatically!

## Step 1: Set Up Supabase Database

**✅ COMPLETED** - The database has been automatically set up with the following schema:

1. Dashboard: https://supabase.com/dashboard/project/zgbdxtkraqrvdvniobla
2. The following SQL migration has been applied:

```sql
-- Create users table
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

-- Create OTP verifications table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can insert user data"
  ON users FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage OTP data"
  ON otp_verifications FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Auto-update timestamp function
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
```

## Step 2: Deploy Edge Functions

**✅ COMPLETED** - Both edge functions have been automatically deployed:

- ✅ `send-otp` - Generates and stores OTP codes
- ✅ `verify-otp` - Verifies OTP and creates user accounts

The edge function files are located in:
- `supabase/functions/send-otp/index.ts`
- `supabase/functions/verify-otp/index.ts`

You can view them in your Supabase Dashboard → Edge Functions

## Step 3: Configure Netlify Environment Variables

In your Netlify dashboard (Site settings → Environment variables), add:

```
VITE_SUPABASE_URL=https://zgbdxtkraqrvdvniobla.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnYmR4dGtyYXFydmR2bmlvYmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MDk0NzUsImV4cCI6MjA3NTM4NTQ3NX0.fVl27HRloSCRF_q3vHXulcRac28wb3JB4LbRuMglDkw
```

## Step 4: Deploy to Netlify

Your project is already configured with `netlify.toml`. When you push to GitHub:

1. Netlify will automatically detect the changes
2. Run `npm run build`
3. Deploy the `dist` folder
4. Environment variables will be injected during build

## Testing

After deployment:

1. Visit your Netlify site
2. Navigate to the Auth page
3. Try signing up with:
   - Name
   - Email
   - Phone number
4. You should receive an OTP (in development, it's displayed in the toast)
5. Verify the OTP to complete registration

## Important Notes

- **Development Mode**: The current implementation shows the OTP in the response for testing. Remove `devOtp` from the response in production.
- **SMS Integration**: To send actual SMS, integrate a service like Twilio in the `send-otp` edge function.
- **Security**: Never commit your `.env` file to Git. Use Netlify's environment variables.
- **Database Access**: The edge functions use the service role key for database operations, which is automatically available in Supabase Edge Functions.

## SMS Integration (Optional)

To integrate SMS sending with Twilio:

1. Sign up for Twilio: https://www.twilio.com
2. Get your Account SID, Auth Token, and Phone Number
3. Add these as Supabase secrets:
```bash
supabase secrets set TWILIO_ACCOUNT_SID=your_account_sid
supabase secrets set TWILIO_AUTH_TOKEN=your_auth_token
supabase secrets set TWILIO_PHONE_NUMBER=your_phone_number
```

4. Update `send-otp/index.ts` to include Twilio API calls:
```typescript
const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");

const response = await fetch(
  `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
  {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      To: phone,
      From: twilioPhone,
      Body: `Your Delhi Eduskills verification code is: ${otpCode}`,
    }),
  }
);
```

## Troubleshooting

- **Edge Functions not working**: Ensure they're deployed and the URLs are correct
- **CORS errors**: Check that CORS headers are properly set in edge functions
- **Database errors**: Verify the tables were created and RLS policies are active
- **Environment variables**: Ensure they're set in both `.env` (local) and Netlify (production)
