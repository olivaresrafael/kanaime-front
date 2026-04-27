/**
 * Newsletter subscription handler.
 */
(function () {
  const form = document.getElementById("newsletter-form");
  const input = document.getElementById("newsletter-email");
  const btn = document.getElementById("newsletter-btn");
  const successMsg = document.getElementById("newsletter-success");
  const errorMsg = document.getElementById("newsletter-error");

  if (!form || !input || !btn) return;

  const originalText = btn.textContent || "";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = input.value.trim();
    if (!email || !email.includes("@")) {
      input.focus();
      return;
    }

    btn.disabled = true;
    btn.textContent = "...";
    successMsg?.classList.add("hidden");
    errorMsg?.classList.add("hidden");

    try {
      const sessionId = window.posthog?.get_session_id?.() || "";
      const distinctId = window.posthog?.get_distinct_id?.() || "";

      window.posthog?.capture("newsletter_form_submitted", {
        lang: document.documentElement.lang,
      });

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PostHog-Session-Id": sessionId,
          "X-PostHog-Distinct-Id": distinctId,
        },
        body: JSON.stringify({
          email,
          lang: document.documentElement.lang,
        }),
      });

      if (res.ok) {
        input.value = "";
        successMsg?.classList.remove("hidden");
      } else {
        errorMsg?.classList.remove("hidden");
      }
    } catch (_err) {
      errorMsg?.classList.remove("hidden");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
})();
