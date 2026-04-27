/**
 * Article lightbox: opens images in a fullscreen overlay.
 */
(function () {
  const lightbox = document.getElementById("article-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCredit = document.getElementById("lightbox-credit");
  const closeBtn = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImg) return;

  function open(src, caption, credit) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    if (lightboxCredit) lightboxCredit.textContent = credit || "";
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  document
    .querySelectorAll(".article-body img, .article-body figure img")
    .forEach(function (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const figure = img.closest("figure");
        const caption = figure
          ? (figure.querySelector("figcaption")?.textContent?.trim() || img.alt || "")
          : (img.alt || "");
        let credit = "";
        let cleanCaption = caption;
        const dashMatch = caption.match(
          /^(.*?)\s*[\u2014\u2013-]\s*(Generated with|Generado con|Foto|Photo|Imagen)(.*)$/i
        );
        if (dashMatch) {
          cleanCaption = dashMatch[1].trim();
          credit = (dashMatch[2] + dashMatch[3]).trim();
        }
        open(img.src, cleanCaption, credit);
      });
    });

  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
      close();
    }
  });
})();
