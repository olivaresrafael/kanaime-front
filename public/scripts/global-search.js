/**
 * Global search: filters articles by text query and active tag.
 * Used on /search and /en/search pages.
 */
(function () {
  const input = document.getElementById("search-input");
  const btn = document.getElementById("search-btn");
  const countLabel = document.getElementById("results-count");
  const noResults = document.getElementById("no-results");
  const articles = document.querySelectorAll(".search-item");
  const tagButtons = document.querySelectorAll("#tag-filters button");

  let activeTag = "";

  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function filterPosts() {
    const query = normalize(input?.value || "");
    let visibleCount = 0;

    articles.forEach(function (article) {
      const title = normalize(article.dataset.title || "");
      const desc = normalize(article.dataset.description || "");
      const author = normalize(article.dataset.author || "");
      const tags = article.dataset.tags || "";

      const matchesText =
        !query || title.includes(query) || desc.includes(query) || author.includes(query);
      const matchesTag = !activeTag || tags.split(",").includes(activeTag);

      if (matchesText && matchesTag) {
        article.style.display = "";
        visibleCount++;
      } else {
        article.style.display = "none";
      }
    });

    if (countLabel) {
      const isEs = document.documentElement.lang === "es";
      countLabel.textContent =
        visibleCount +
        (visibleCount === 1
          ? (isEs ? " artículo" : " article")
          : (isEs ? " artículos" : " articles"));
    }

    if (noResults) {
      noResults.classList.toggle("hidden", visibleCount > 0);
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

  tagButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeTag = button.dataset.tag || "";

      tagButtons.forEach(function (b) {
        b.classList.remove("border-[#A31621]", "text-[#A31621]", "bg-[#A31621]/5");
        b.classList.add("border-gray-200", "text-gray-600");
      });
      button.classList.remove("border-gray-200", "text-gray-600");
      button.classList.add("border-[#A31621]", "text-[#A31621]", "bg-[#A31621]/5");

      filterPosts();
    });
  });
})();
