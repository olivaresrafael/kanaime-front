/**
 * Hero Cover logic for Kanaimé homepage.
 * Handles session-based show/hide of the cover overlay.
 */
(function () {
  function initHeroCover() {
    const hero = document.getElementById("hero-cover");
    const closeBtn = document.getElementById("hero-close");
    const heroContent = document.getElementById("hero-content");
    const showCoverBtn = document.getElementById("show-cover-btn");
    const body = document.body;
    const SESSION_KEY = "kanaime-cover-shown";

    if (!hero) return;

    function closeHero(skipStorage, immediate) {
      if (immediate) {
        body.classList.add("no-hero-transition");
      }
      hero.classList.add("hidden");
      body.classList.remove("hero-open");
      const delay = immediate ? 0 : 800;
      setTimeout(function () {
        if (hero && hero.parentNode) {
          hero.style.display = "none";
        }
        if (immediate) {
          body.classList.remove("no-hero-transition");
        }
      }, delay);
      if (showCoverBtn) showCoverBtn.classList.remove("hidden");
      if (!skipStorage) {
        try {
          sessionStorage.setItem(SESSION_KEY, "true");
        } catch (_e) {}
      }
    }

    function openHero() {
      hero.style.display = "";
      void hero.offsetWidth;
      hero.classList.remove("hidden");
      body.classList.add("hero-open");
      if (showCoverBtn) showCoverBtn.classList.add("hidden");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get("showCover") === "1";

    if (forceShow) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );
      if (showCoverBtn) showCoverBtn.classList.add("hidden");
    } else {
      const referrer = document.referrer;
      let isInternal = false;
      try {
        if (referrer) {
          isInternal = new URL(referrer).hostname === location.hostname;
        }
      } catch (_e) {}

      if (isInternal) {
        closeHero(true);
      } else {
        try {
          if (sessionStorage.getItem(SESSION_KEY) === "true") {
            closeHero(true);
          } else {
            if (showCoverBtn) showCoverBtn.classList.add("hidden");
          }
        } catch (_e) {
          if (showCoverBtn) showCoverBtn.classList.add("hidden");
        }
      }
    }

    if (heroContent) {
      heroContent.addEventListener("click", function () {
        closeHero();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeHero();
      });
    }

    if (showCoverBtn) {
      showCoverBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        openHero();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroCover);
  } else {
    initHeroCover();
  }
})();
