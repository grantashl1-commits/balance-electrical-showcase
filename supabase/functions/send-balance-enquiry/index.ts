import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("Balance Electrical enquiry received:", JSON.stringify(body));

    const { full_name, phone, email, suburb, service_type, message } = body;

    if (!full_name || !phone || !email || !suburb || !service_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Log to database
    const { error: dbError } = await supabase
      .from("balance_enquiries")
      .insert({
        full_name,
        phone,
        email,
        suburb,
        service_type,
        message: message || null,
      });

    if (dbError) {
      console.error("DB error:", dbError.message);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Enquiry logged to database");

    const nzNow = new Date().toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });

    // Email to Victoria
    const victoriaEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Balance Electrical Website <enquiries@balanceelectrical.co.nz>",
        to: ["enquire@balanceelectrical.co.nz"],
        reply_to: email,
        subject: `New enquiry from ${full_name} — ${service_type}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8; padding: 40px;">
            <div style="border-bottom: 1px solid #C9933A; padding-bottom: 20px; margin-bottom: 24px;">
              <h2 style="color: #C9933A; margin: 0; font-size: 20px; letter-spacing: 0.05em;">NEW ENQUIRY</h2>
              <p style="color: #888880; font-size: 13px; margin: 4px 0 0;">Balance Electrical website · ${nzNow} NZST</p>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #888880; font-size: 13px; width: 130px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #F5F0E8; font-weight: bold;">${full_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #888880; font-size: 13px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #F5F0E8;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #888880; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220;"><a href="mailto:${email}" style="color: #C9933A;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #888880; font-size: 13px;">Suburb</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #F5F0E8;">${suburb}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #888880; font-size: 13px;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222220; color: #F5F0E8;">${service_type}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888880; font-size: 13px; vertical-align: top; padding-top: 12px;">Message</td>
                <td style="padding: 10px 0; color: #F5F0E8;">${message || "No message provided"}</td>
              </tr>
            </table>
            <div style="margin-top: 32px; padding: 16px; border: 1px solid #222220;">
              <a href="tel:${phone}" style="color: #C9933A; font-size: 16px; text-decoration: none;">Call ${full_name} →</a>
            </div>
          </div>
        `,
      }),
    });

    const victoriaEmailData = await victoriaEmail.json();
    console.log("Victoria notification:", JSON.stringify(victoriaEmailData));

    if (!victoriaEmail.ok) {
      throw new Error(`Resend error: ${JSON.stringify(victoriaEmailData)}`);
    }

    // Auto-reply to enquirer
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Victoria — Balance Electrical <enquiries@balanceelectrical.co.nz>",
        to: [email],
        subject: "Thanks for your enquiry — Balance Electrical",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0E8; padding: 40px;">
            <div style="border-bottom: 1px solid #C9933A; padding-bottom: 20px; margin-bottom: 24px;">
              <h2 style="color: #F5F0E8; margin: 0; font-size: 24px;">Thanks ${full_name.split(" ")[0]}.</h2>
            </div>
            <p style="color: #888880; line-height: 1.8;">I've received your enquiry about <span style="color: #C9933A;">${service_type}</span> and will be in touch within 24 hours.</p>
            <p style="color: #888880; line-height: 1.8;">If you need to reach me sooner:</p>
            <p style="font-size: 20px; color: #C9933A; margin: 24px 0;">
              <a href="tel:+64279162077" style="color: #C9933A; text-decoration: none;">027 916 2077</a>
            </p>
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #222220;">
              <p style="color: #888880; font-size: 13px; margin: 0;">Victoria Grant</p>
              <p style="color: #888880; font-size: 13px; margin: 4px 0;">Owner operator · Registered Electrician</p>
              <p style="color: #888880; font-size: 13px; margin: 4px 0;">Balance Electrical · Taupō</p>
              <a href="https://www.balanceelectrical.co.nz" style="color: #C9933A; font-size: 13px;">balanceelectrical.co.nz</a>
            </div>
          </div>
        `,
      }),
    });

    console.log("Auto-reply sent to enquirer");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
