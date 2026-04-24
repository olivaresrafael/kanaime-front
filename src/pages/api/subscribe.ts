import type { APIRoute } from "astro";

export const prerender = false;

/**
 * POST /api/subscribe
 * Body: { email: string }
 *
 * Suscribe un email a MailerLite usando su API REST.
 * Requiere MAILERLITE_API_KEY en las variables de entorno.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  // Leer API key desde runtime (Cloudflare) o process.env (local)
  const runtime = (locals as any)?.runtime;
  const apiKey =
    runtime?.env?.MAILERLITE_API_KEY ||
    (typeof process !== "undefined" ? process.env.MAILERLITE_API_KEY : "");

  const groupId =
    runtime?.env?.MAILERLITE_GROUP_ID ||
    (typeof process !== "undefined" ? process.env.MAILERLITE_GROUP_ID : "");

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "MailerLite API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const email = body?.email?.trim();
  if (!email || !email.includes("@")) {
    return new Response(
      JSON.stringify({ error: "Valid email is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const payload: Record<string, any> = { email };
  if (groupId) {
    payload.groups = [groupId];
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("MailerLite API error:", res.status, errText);
      return new Response(
        JSON.stringify({ error: "Failed to subscribe. Please try again later." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, subscriberId: data.data?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Subscribe endpoint error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
