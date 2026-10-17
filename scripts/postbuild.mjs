// Runs after `vite build`. Pure Node, no extra dependencies.
// - writes dist/routes/<slug>/index.html with page-specific <title>, description, canonical, Open Graph and JSON-LD
// - writes dist/privacy/index.html and dist/404.html (noindex)
// - writes dist/sitemap.xml and dist/robots.txt
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getPageMeta, getBusinessJsonLd, getBreadcrumbJsonLd } from "../src/seo/meta.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
if (!existsSync(join(dist, "index.html"))) {
  console.error("dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const business = JSON.parse(readFileSync(join(root, "src/config/business.json"), "utf8"));
const routes = JSON.parse(readFileSync(join(root, "src/data/routes.json"), "utf8"));
const template = readFileSync(join(dist, "index.html"), "utf8");

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const origin = (business.siteUrl || process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : "")).replace(/\/$/, "");
if (!origin) console.warn("[postbuild] No siteUrl configured: canonical URLs and sitemap.xml are skipped. Set siteUrl in src/config/business.json.");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (p) => (origin ? origin + p : p);

function seoBlock(path, meta) {
  const url = abs(path === "/" ? "/" : path);
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? "noindex" : "index, follow"}" />`,
  ];
  if (origin && !meta.noindex) lines.push(`<link rel="canonical" href="${esc(url)}" />`, `<meta property="og:url" content="${esc(url)}" />`);
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(abs("/og-image.jpg"))}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`
  );
  if (!meta.noindex) {
    const blocks = [getBusinessJsonLd(business, origin || undefined), getBreadcrumbJsonLd(path, business, routes, origin || undefined)].filter(Boolean);
    for (const b of blocks) lines.push(`<script type="application/ld+json" data-seo-ld>${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`);
  }
  return lines.join("\n    ");
}

function render(path, meta) {
  return template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${seoBlock(path, meta)}\n    <!--seo:end-->`);
}

function write(file, html) {
  const full = join(dist, file);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

const urls = ["/"];
write("index.html", render("/", getPageMeta("/", business, routes)));
write("privacy/index.html", render("/privacy", getPageMeta("/privacy", business, routes)));
urls.push("/privacy");
for (const r of routes) {
  const path = `/routes/${r.slug}`;
  write(`routes/${r.slug}/index.html`, render(path, getPageMeta(path, business, routes)));
  urls.push(path);
}
write("404.html", render("/404", getPageMeta("/404", business, routes)));

if (origin) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${esc(origin + (u === "/" ? "/" : u))}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`;
  write("sitemap.xml", xml);
}
write("robots.txt", `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`);

console.log(`[postbuild] ${urls.length} pages written${origin ? `, sitemap for ${origin}` : ", no sitemap (siteUrl not set)"}.`);
