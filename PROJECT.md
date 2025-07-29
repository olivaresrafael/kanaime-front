# Kanaimé — Diagnóstico & Plan de Implementación

## Información General
- **Nombre:** Kanaimé
- **Tipo:** Blog / Revista digital
- **Temática:** Naturaleza, exploración, cultura, perfiles, fotografía
- **Framework:** Astro 6.1.8 + TypeScript estricto
- **Estilos:** Tailwind CSS v4 (Vite-native, sin `tailwind.config.js`)
- **Deploy:** Cloudflare Pages (`@astrojs/cloudflare`)
- **Package Manager:** pnpm
- **Autor:** Rafael Olivares

---

## Estructura de Carpetas

```
src/
├── assets/              # Imágenes optimizables por Astro
│   ├── blog-placeholder-*.jpg
│   ├── dibujo-avion-jimmy-angel-01.JPG
│   ├── IMG_*.JPG
│   └── marco-etiopia.jpg
├── components/          # Componentes Astro
│   ├── BaseHead.astro
│   ├── Divider.astro
│   ├── Footer.astro
│   ├── FormattedDate.astro
│   ├── Header.astro
│   ├── HeaderLink.astro
│   ├── HomeBody.astro
│   ├── MainPost.astro
│   ├── PostBlock.astro
│   └── Sidebar.astro
├── content/             # Colecciones de contenido
│   └── blog/
│       ├── el-piloto-del-salto-angel.md
│       ├── el-temido-dios-que-vigila-el-salto-de-agua-mas-alto-del-mundo.md
│       ├── la-vida-es-bella.md
│       ├── marco-jubes.mdx
│       └── third-post.md
├── layouts/
│   └── BlogPost.astro
├── pages/
│   ├── about.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── index.backup.astro
│   └── rss.xml.js
├── styles/
│   └── global.css
├── consts.ts
└── content.config.ts

public/
├── favicon.svg
└── fonts/
    ├── atkinson-regular.woff
    └── atkinson-bold.woff
```

---

## Dependencias Actuales

| Paquete | Versión | Uso |
|---------|---------|-----|
| astro | 6.1.8 | Framework base |
| @astrojs/cloudflare | ^13.1.10 | Adaptador Cloudflare |
| @astrojs/mdx | 5.0.3 | Soporte MDX |
| @astrojs/markdoc | 1.0.3 | Soporte Markdoc |
| @astrojs/rss | ^4.0.18 | Feed RSS |
| @astrojs/sitemap | 3.7.2 | Sitemap automático |
| @tailwindcss/vite | ^4.2.4 | Tailwind v4 Vite |
| tailwindcss | ^4.2.4 | Framework CSS |
| sharp | ^0.34.5 | Procesamiento imágenes |
| wrangler | ^4.84.1 | CLI Cloudflare |
| gsap | ^3.12.x | Animaciones (Flip + ScrollTrigger) |

---

## Componentes

### BaseHead.astro
Metadatos globales, SEO básico, fuentes Google (Source Serif 4, Bebas Neue).

### Header.astro
Cabecera con título del sitio y dos filas de navegación. Links de categorías apuntan a `/tags/[tag]`.

### HeaderLink.astro
Enlace de navegación con estado `active` automático.

### MainPost.astro
Destacado del post principal (primero en la lista). Muestra título, imagen y descripción.

### HomeBody.astro
Grid de dos columnas con posts (excluye el primero). Distribución alternada en columnas.

### PostBlock.astro
Tarjeta de post con imagen, fecha y título. Usa `Image` de Astro.

### Divider.astro
Separador visual configurable.

### FormattedDate.astro
Formatea fechas a locale `en-us`.

### Footer.astro
Pie de página con links, logo centrado y copyright.

---

## Páginas y Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con portada del día (modal) + grilla de posts |
| `/blog/[...slug]` | Página individual de post |
| `/tags/[tag]` | Listado de posts filtrados por tag |
| `/sponsors` | Página de sponsors/aliados |
| `/about` | Página About Me |
| `/rss.xml` | Feed RSS |

---

## Contenido (Posts)

| Post | Fecha | Autor | Tags |
|------|-------|-------|------|
| El piloto del Salto Ángel | Jun 19 2024 | Francisco Olivares | exploración, perfiles, naturaleza |
| El temido Dios que vigila... | Jul 08 2025 | Francisco Olivares | naturaleza, cultura |
| Marco Jubes | Jun 01 2024 | John Doe | perfiles, exploración |
| La Vida es Bella | Jul 15 2024 | John Doe | cultura |
| Third post | Jul 22 2022 | John Doe | fotografía |

---

## Configuraciones Clave

### astro.config.mjs
- `output: 'static'`
- `adapter: cloudflare()`
- `image.service: passthroughImageService()`
- Integraciones: mdx, sitemap, markdoc
- Tailwind via Vite plugin
- Vite: `optimizeDeps.force: true` (previene caché corrupta del dep optimizer)
- Vite SSR: `noExternal: ['astro']` (evita errores con módulos internos de Astro)

### tsconfig.json
- Extiende `astro/tsconfigs/strict`
- `strictNullChecks: true`

---

## Diseño y Estilo

### Tailwind v4
- Sin archivo de configuración JS.
- Configuración vía CSS (`@import "tailwindcss"`).
- Plugin Vite: `@tailwindcss/vite`.

### Tipografía
- **Títulos:** Bebas Neue (Google Fonts)
- **Cuerpo:** Source Serif 4 (Google Fonts)
- **Fallback:** system-ui, sans-serif

### Variables CSS (global.css)
- `--accent`, `--gray`, `--gray-light`, `--gray-dark`, `--black`
- `--box-shadow`

### Color de portada configurable
- Definido en `src/consts.ts` como `COVER_BG_COLOR`.
- Permite cambiar el fondo del hero diariamente según el post.

---

## Features Implementadas

### Versión Modal (rama principal)
- Home `/` con portada del día (full-screen, fondo de color).
- Click o botón X cierra la portada y revela el blog.
- Fallback `<noscript>`: muestra el blog directamente sin portada.
- Header, logo y contenido se revelan al cerrar el modal.

### Versión Animación (rama `feature/hero-animation`)
- Mismo diseño de portada pero con animación GSAP + ScrollTrigger + Flip.
- Scroll anima el título e imagen desde el hero hacia la posición final en la grilla.
- Transición de fondo rojo → blanco.
- Requiere JavaScript activado.

### Tags/Categorías
- Campo `tags` en esquema Zod y frontmatter de posts.
- Página dinámica `/tags/[tag].astro` filtra posts.
- Header navega a `/tags/naturaleza`, `/tags/exploración`, etc.

### Sponsors
- Página `/sponsors` con grid de tarjetas.
- eko.red como sponsor real.
- Slots vacíos para futuras marcas.

### Responsive
- Mobile-first en componentes críticos (Header, MainPost, HomeBody).
- Grilla de posts se adapta a 1 columna en mobile.
- Portada modal ocupa toda la pantalla en todos los tamaños.

---

## Notas Técnicas

### Imágenes
- Se usa `Image` de `astro:assets` en componentes.
- `heroImage` en frontmatter usa helper `image()` de Astro.
- `passthroughImageService` en config (sin optimización Cloudflare en dev).

### Build
- `pnpm dev` — servidor de desarrollo
- `pnpm build` — build estático con adapter Cloudflare
- `pnpm preview` — preview del build

### Branches
- `main` — versión estable con modal
- `feature/hero-animation` — versión experimental con animación GSAP

---

## TODO / Mejoras Futuras

- [ ] Implementar animación GSAP en branch `feature/hero-animation`
- [ ] Logo SVG real de Kanaimé (reemplazar texto tipográfico)
- [ ] Paginación de posts cuando haya más de 10
- [ ] Buscador de posts
- [ ] Posts relacionados al final de cada artículo
- [ ] Botones de compartir en redes sociales
- [ ] Newsletter / suscripción
- [ ] Comentarios (Disqus, Giscus, etc.)
- [ ] Página de autor individual con bio y foto
- [ ] Modo oscuro (dark mode)
- [ ] Optimización de imágenes con Cloudflare Images en producción
- [ ] JSON-LD para SEO avanzado
- [ ] Open Graph dinámico por post
