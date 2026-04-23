/**
 * UI translation strings for Kanaimé.
 * Keys are organized by page/section.
 */
export const ui = {
  es: {
    "site.title": "Kanaimé",
    "site.description": "Revista digital de naturaleza, exploración y cultura desde el corazón de Venezuela.",

    "nav.home": "Home",
    "nav.authors": "Autores",
    "nav.sponsors": "Sponsors",
    "nav.about": "About",
    "nav.search": "Buscar",

    "nav.nature": "naturaleza",
    "nav.exploration": "exploración",
    "nav.culture": "cultura",
    "nav.photography": "fotografía",
    "nav.profiles": "perfiles",

    "hero.cta": "Haz click para continuar",
    "hero.close": "Cerrar portada",
    "hero.show": "Portada",

    "home.recent": "Recientes -",

    "search.title": "Buscar",
    "search.placeholder": "Buscar artículos...",
    "search.all": "Todos",
    "search.filterByTag": "Filtrar por tag",
    "search.results": "artículos",
    "search.result": "artículo",
    "search.noResults": "No se encuentran resultados.",

    "tags.popular": "Tags populares",
    "tags.articlesIn": "artículos en",
    "tags.noArticles": "No hay artículos en esta categoría.",
    "tags.explore": "Explorar el archivo",

    "post.writtenBy": "Escrito por",
    "post.readingTime": "min de lectura",
    "post.updated": "Actualizado:",
    "post.tags": "Etiquetas",
    "post.viewProfile": "Ver perfil",
    "post.follow": "Seguir",

    "authors.title": "Voces del Territorio",
    "authors.subtitle": "Los Contribuyentes",
    "authors.description": "Los guardianes de nuestra narrativa. Un colectivo de escritores, exploradores y fotógrafos dedicados a documentar la majestuosidad frágil de nuestro planeta desde Venezuela.",
    "authors.articles": "artículos publicados",
    "authors.noArticles": "Este autor aún no tiene artículos publicados.",

    "sponsors.title": "Sponsors",

    "about.title": "Sobre Kanaimé",

    "footer.navigation": "Navegación",
    "footer.categories": "Categorías",
    "footer.tagline": "Naturaleza, exploración y cultura desde el corazón de Venezuela.",
    "footer.rights": "Todos los derechos reservados.",
    "footer.madeIn": "Hecho con pasión en Venezuela.",
  },
  en: {
    "site.title": "Kanaimé",
    "site.description": "Digital magazine of nature, exploration, and culture from the heart of Venezuela.",

    "nav.home": "Home",
    "nav.authors": "Authors",
    "nav.sponsors": "Sponsors",
    "nav.about": "About",
    "nav.search": "Search",

    "nav.nature": "nature",
    "nav.exploration": "exploration",
    "nav.culture": "culture",
    "nav.photography": "photography",
    "nav.profiles": "profiles",

    "hero.cta": "Click to continue",
    "hero.close": "Close cover",
    "hero.show": "Cover",

    "home.recent": "Recent -",

    "search.title": "Search",
    "search.placeholder": "Search articles...",
    "search.all": "All",
    "search.filterByTag": "Filter by tag",
    "search.results": "articles",
    "search.result": "article",
    "search.noResults": "No results found.",

    "tags.popular": "Popular tags",
    "tags.articlesIn": "articles in",
    "tags.noArticles": "No articles in this category.",
    "tags.explore": "Explore the archive",

    "post.writtenBy": "Written by",
    "post.readingTime": "min read",
    "post.updated": "Updated:",
    "post.tags": "Tags",
    "post.viewProfile": "View profile",
    "post.follow": "Follow",

    "authors.title": "Voices of the Territory",
    "authors.subtitle": "The Contributors",
    "authors.description": "The guardians of our narrative. A collective of writers, explorers, and photographers dedicated to documenting the fragile majesty of our planet from Venezuela.",
    "authors.articles": "articles published",
    "authors.noArticles": "This author has no published articles yet.",

    "sponsors.title": "Sponsors",

    "about.title": "About Kanaimé",

    "footer.navigation": "Navigation",
    "footer.categories": "Categories",
    "footer.tagline": "Nature, exploration, and culture from the heart of Venezuela.",
    "footer.rights": "All rights reserved.",
    "footer.madeIn": "Made with passion in Venezuela.",
  },
} as const;

export type UILanguage = keyof typeof ui;
export type UIKey = keyof (typeof ui)["es"];

export function useTranslations(lang: UILanguage) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui["es"][key] || key;
  };
}
