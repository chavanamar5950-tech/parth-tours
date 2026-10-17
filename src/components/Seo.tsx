import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { business } from "@/config/business";
import { routes } from "@/data/routes";
import { getPageMeta, getBusinessJsonLd, getBreadcrumbJsonLd } from "@/seo/meta";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps <title>, description, robots, canonical and JSON-LD in sync on client-side navigation. */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getPageMeta(pathname, business, routes);
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[name="robots"]', "name", "robots", meta.noindex ? "noindex" : "index, follow");

    // Canonical origin: configured siteUrl, or whatever the static build already put in the page.
    const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let origin = business.siteUrl.replace(/\/$/, "");
    if (!origin && existing?.href) {
      try {
        origin = new URL(existing.href).origin;
      } catch {
        origin = "";
      }
    }
    if (origin && !meta.noindex) {
      const href = origin + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
      const link = existing ?? document.head.appendChild(Object.assign(document.createElement("link"), { rel: "canonical" }));
      link.href = href;
      setMeta('meta[property="og:url"]', "property", "og:url", href);
    } else if (meta.noindex && existing) {
      existing.remove();
    }

    document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    const blocks = [getBusinessJsonLd(business, origin || undefined), getBreadcrumbJsonLd(pathname, business, routes, origin || undefined)].filter(Boolean);
    blocks.forEach((b) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo-ld", "");
      s.text = JSON.stringify(b);
      document.head.appendChild(s);
    });
  }, [pathname]);

  return null;
}
