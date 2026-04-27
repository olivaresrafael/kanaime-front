import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

/**
 * Get the PostHog server-side client.
 * Accepts token and host explicitly to support Cloudflare runtime env vars.
 */
export function getPostHogServer(
  token: string,
  host?: string
): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(token, {
      host: host || "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return posthogClient;
}

export async function shutdownPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
    posthogClient = null;
  }
}
