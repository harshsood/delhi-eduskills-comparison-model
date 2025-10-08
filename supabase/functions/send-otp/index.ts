import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SendOTPRequest {
  phone: string;
  email: string;
  name: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authkeyApiKey = Deno.env.get("AUTHKEY_API_KEY") || "c31b7fef4132a385";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { phone, email, name }: SendOTPRequest = await req.json();

    if (!phone || !email || !name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: insertError } = await supabase
      .from("otp_verifications")
      .insert({
        phone,
        email,
        otp_code: otpCode,
        expires_at: expiresAt,
      });

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to generate OTP" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let smsStatus = "pending";
    let smsError = null;

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const authkeyUrl = `https://api.authkey.io/request?authkey=${authkeyApiKey}&mobile=${cleanPhone}&country_code=91&sid=14537&otp=${otpCode}`;

      console.log(`Sending SMS to: ${cleanPhone}`);

      const smsResponse = await fetch(authkeyUrl, {
        method: "GET",
      });

      const smsData = await smsResponse.json();

      console.log("Authkey API response:", JSON.stringify(smsData));

      if (smsResponse.ok && smsData.Message === "Message sent successfully") {
        console.log(`OTP sent successfully via SMS to ${cleanPhone}`);
        smsStatus = "success";
      } else {
        console.error("Authkey API error:", smsData);
        smsStatus = "failed";
        smsError = smsData.Message || "Failed to send SMS";
      }
    } catch (error) {
      console.error("Error sending SMS via Authkey:", error);
      smsStatus = "failed";
      smsError = error.message;
    }

    console.log(`OTP generated for ${phone}: ${otpCode} (SMS Status: ${smsStatus})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "OTP sent successfully",
        smsStatus,
        smsError,
        devOtp: otpCode,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-otp:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
