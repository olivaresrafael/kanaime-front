/**
 * Tag page search: filters articles by query text.
 * Used on /tags/[tag] pages.
 */
(function () {
  const input = document.getElementById("tag-search-input");
  const btn = document.getElementById("tag-search-btn");

  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function filterPosts() {
    if (!input) return;
    const query = normalize(input.value);
    const articles = document.querySelectorAll("article");
    let visibleCount = 0;

    articles.forEach(function (article) {
      const title = normalize(
        article.querySelector("h2")?.textContent || ""
      );
      const desc = normalize(
        article.querySelector("p")?.textContent || ""
      );
      const tag = normalize(
        article.querySelector("span:last-child")?.textContent || ""
      );

      if (title.includes(query) || desc.includes(query) || tag.includes(query)) {
        article.style.display = "";
        visibleCount++;
      } else {
        article.style.display = "none";
      }
    });

    const countLabel = document.querySelector("section p:first-child");
    if (countLabel) {
      const isEs = document.documentElement.lang === "es";
      const suffix = visibleCount === 1
        ? (isEs ? " artículo" : " article")
        : (isEs ? " artículos" : " articles");
      const preposition = isEs ? " encontrados" : " found";
      countLabel.textContent = visibleCount + suffix + preposition;
    }
  }

  if (input) {
    input.addEventListener("input", filterPosts);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") filterPosts();
    });
  }
  if (btn) {
    btn.addEventListener("click", filterPosts);
  }
})();
