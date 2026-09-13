import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    console.log("BMC Webhook:", JSON.stringify(body));

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const eventType = body.type || body.event_type || "unknown";

    if (eventType === "donation.created" || eventType === "one_time_donation.created") {
      const d = body.data || body;

      const supporter = {
        support_id: String(d.id || "bmc_" + Date.now()),
        name: d.supporter_name || d.name || d.buyer_name || "Anonymous",
        email: d.email || d.buyer_email || null,
        amount: Math.round((d.amount || d.support_coffee_count || 1) * 100) / 100,
        currency: d.currency || "INR",
        message: d.message || d.supporter_message || null,
        support_type: "one-time",
        status: "completed",
      };

      const { data: inserted, error } = await supabase
        .from("coffee_supporters")
        .insert(supporter)
        .select();

      if (error) {
        console.error("Insert error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("Supporter added:", inserted);
      return new Response(JSON.stringify({ success: true, supporter: inserted }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle refund events
    if (eventType === "donation.refunded" || eventType === "one_time_donation.refunded") {
      const d = body.data || body;
      const supportId = String(d.id || "");

      if (supportId) {
        await supabase
          .from("coffee_supporters")
          .update({ status: "refunded" })
          .eq("support_id", supportId);
      }

      return new Response(JSON.stringify({ success: true, action: "refunded" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, action: "ignored" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
