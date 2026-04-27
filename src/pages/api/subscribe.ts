import type { APIRoute } from "astro";
import { getPostHogServer } from "../../lib/posthog-server";

export const prerender = false;

/**
 * POST /api/subscribe
 * Body: { email: string, lang?: "es" | "en" }
 *
 * Suscribe un email a MailerLite usando su API REST.
 * Guarda el idioma del suscriptor en el campo personalizado "language".
 * Requiere MAILERLITE_API_KEY en las variables de entorno.
 */
export const POST: APIRoute = async ({ request }) => {
  const posthog = getPostHogServer();
  const sessionId = request.headers.get("X-PostHog-Session-Id") || undefined;
  const distinctId =
    request.headers.get("X-PostHog-Distinct-Id") || "anonymous";
  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "MailerLite API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { email?: string; lang?: "es" | "en" };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = body?.email?.trim();
  const lang = body?.lang;
  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Valid email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload: Record<string, any> = { email };
  if (lang) {
    payload.fields = { language: lang };
  }
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
      posthog.capture({
        distinctId,
        event: "newsletter_subscription_failed",
        properties: {
          $session_id: sessionId,
          lang,
          error_status: res.status,
        },
      });
      return new Response(
        JSON.stringify({
          error: "Failed to subscribe. Please try again later.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await res.json();
    posthog.capture({
      distinctId,
      event: "newsletter_subscribed",
      properties: {
        $session_id: sessionId,
        lang,
        subscriber_id: data.data?.id,
      },
    });
    return new Response(
      JSON.stringify({ success: true, subscriberId: data.data?.id }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Subscribe endpoint error:", err);
    posthog.capture({
      distinctId,
      event: "newsletter_subscription_failed",
      properties: {
        $session_id: sessionId,
        lang,
        error_status: 500,
      },
    });
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
