import nodemailer from "npm:nodemailer@6.9.15";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GUIDE_PDF_URL =
  "https://pub-85e8da6f6b3443da89cb72ca8b6938ec.r2.dev/Guides/Prediction_Markets_101_Course.pdf";

const FROM_ADDRESS = "hello@predictionmarkets101.academy";
const BRAND_NAME = "Prediction Markets 101";

function makeTransport() {
  const host = Deno.env.get("SMTP_HOST");
  const port = Deno.env.get("SMTP_PORT");
  const user = Deno.env.get("SMTP_USERNAME");
  const pass = Deno.env.get("SMTP_PASSWORD");

  if (!host || !port || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Required secrets: SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD."
    );
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
}

function subscriberMessage(to: string) {
  const subject = `Your free ${BRAND_NAME} guide is here`;

  const text = `Hi there,

Thanks for requesting the guide — it's ready for you right now.

You can download it directly here:
${GUIDE_PDF_URL}

We'll only send occasional, relevant lessons and guides. No spam, ever.

— The ${BRAND_NAME} team
${FROM_ADDRESS}`;

  const html = `<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #1F2937; line-height: 1.6;">
  <p style="margin: 0 0 16px;">Hi there,</p>
  <p style="margin: 0 0 16px;">Thanks for requesting the guide — it's ready for you right now.</p>
  <p style="margin: 0 0 16px;">
    <a href="${GUIDE_PDF_URL}" style="display: inline-block; padding: 12px 24px; background-color: #3D8B6D; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-family: Inter, system-ui, sans-serif;">Download the Guide</a>
  </p>
  <p style="margin: 0 0 16px; font-size: 14px; color: #6B7280;">Or copy this link directly:<br/><span style="word-break: break-all;">${GUIDE_PDF_URL}</span></p>
  <p style="margin: 24px 0 8px; font-size: 14px; color: #6B7280;">We'll only send occasional, relevant lessons and guides. No spam, ever.</p>
  <p style="margin: 24px 0 0; font-size: 14px; color: #6B7280;">— The ${BRAND_NAME} team<br/>${FROM_ADDRESS}</p>
</div>`;

  return { from: `${BRAND_NAME} <${FROM_ADDRESS}>`, to, subject, text, html };
}

function notificationMessage(
  subscriberEmail: string,
  name: string,
  phone: string,
  timestamp: string
) {
  const subject = `New subscriber: ${subscriberEmail}`;

  const textLines = [
    `Email: ${subscriberEmail}`,
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    `Signed up: ${timestamp}`,
  ].filter(Boolean);

  const text = `A new person just subscribed to ${BRAND_NAME}.

${textLines.join("\n")}

This record is also stored in the subscribers table.`;

  const htmlLines = [
    `<p style="margin: 0 0 4px;"><strong>Email:</strong> ${subscriberEmail}</p>`,
    name ? `<p style="margin: 0 0 4px;"><strong>Name:</strong> ${name}</p>` : "",
    phone ? `<p style="margin: 0 0 4px;"><strong>Phone:</strong> ${phone}</p>` : "",
    `<p style="margin: 0 0 12px;"><strong>Signed up:</strong> ${timestamp}</p>`,
  ].filter(Boolean).join("");

  const html = `<div style="font-family: Inter, system-ui, sans-serif; max-width: 480px; margin: 0 auto; color: #1F2937; line-height: 1.6;">
  <p style="margin: 0 0 12px;">A new person just subscribed to ${BRAND_NAME}.</p>
  ${htmlLines}
  <p style="margin: 8px 0 0; font-size: 13px; color: #6B7280;">This record is also stored in the subscribers table.</p>
</div>`;

  return { from: `${BRAND_NAME} <${FROM_ADDRESS}>`, to: FROM_ADDRESS, subject, text, html };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== "string" || !body.email.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'email' field." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subscriberEmail = body.email.trim();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const timestamp = body.timestamp || new Date().toISOString();

    const transport = makeTransport();

    const results = await Promise.allSettled([
      transport.sendMail(subscriberMessage(subscriberEmail)),
      transport.sendMail(notificationMessage(subscriberEmail, name, phone, timestamp)),
    ]);

    const [subscriberResult, notifyResult] = results;

    const failures: string[] = [];
    if (subscriberResult.status === "rejected") {
      failures.push(`Subscriber email failed: ${subscriberResult.reason?.message ?? subscriberResult.reason}`);
    }
    if (notifyResult.status === "rejected") {
      failures.push(`Notification email failed: ${notifyResult.reason?.message ?? notifyResult.reason}`);
    }

    if (failures.length > 0) {
      return new Response(
        JSON.stringify({ error: "One or more emails failed to send.", details: failures }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, sentTo: subscriberEmail }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unexpected error sending email." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
