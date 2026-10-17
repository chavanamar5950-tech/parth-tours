// Plain JS on purpose: imported by the app AND by scripts/postbuild.mjs (Node).

export const STATIC_PATHS = ["/", "/privacy"];

export function routePath(slug) {
  return `/routes/${slug}`;
}

export function getPageMeta(path, business, routes) {
  const name = business.name;
  const loc = business.city;
  if (path === "/" || path === "") {
    return {
      title: `${name}, ${loc} | Taxi, Outstation Cabs & Darshan Tours`,
      description: `Taxi service in ${loc}: outstation cabs to Pune, Mumbai, Goa, Belgaum and Ratnagiri, local taxi and darshan tours. Enquire on WhatsApp or call.`,
      noindex: false,
    };
  }
  if (path === "/privacy") {
    return {
      title: `Privacy | ${name}`,
      description: `How ${name} handles the details you send through this website.`,
      noindex: false,
    };
  }
  const m = path.match(/^\/routes\/([^/]+)\/?$/);
  if (m) {
    const r = routes.find((x) => x.slug === m[1]);
    if (r) {
      let title;
      if (r.kind === "local") title = `${loc} Local Taxi Service | ${name}`;
      else if (r.kind === "darshan") title = `${r.title} Tour | ${name}`;
      else if (r.kind === "outstation") title = `${loc} Outstation Taxi | ${name}`;
      else title = `${r.title} Taxi | ${name}`;
      return {
        title,
        description: `${r.blurb} Ask ${name}, ${loc} for the fare and availability.`.slice(0, 300),
        noindex: false,
      };
    }
  }
  return { title: `Page not found | ${name}`, description: "This page could not be found.", noindex: true };
}

export function getBusinessJsonLd(business, origin) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: business.name,
    description: `Taxi, outstation and darshan tour services from ${business.city}, ${business.region}, ${business.country}.`,
    areaServed: ["Kolhapur", "Pune", "Mumbai", "Goa", "Belgaum", "Sangli", "Ratnagiri", "Sindhudurg"],
  };
  if (origin) ld.url = origin;
  const digits = (business.phone || "").replace(/\D/g, "");
  if (digits.length >= 10) ld.telephone = "+" + (digits.length === 10 ? "91" + digits : digits);
  if (business.email) ld.email = business.email;
  if (business.address) {
    ld.address = {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: "IN",
    };
  }
  const same = [business.social?.instagram, business.social?.facebook, business.social?.googleReviews].filter(Boolean);
  if (same.length) ld.sameAs = same;
  return ld;
}

export function getBreadcrumbJsonLd(path, business, routes, origin) {
  const m = path.match(/^\/routes\/([^/]+)\/?$/);
  if (!m || !origin) return null;
  const r = routes.find((x) => x.slug === m[1]);
  if (!r) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin + "/" },
      { "@type": "ListItem", position: 2, name: "Routes", item: origin + "/#routes" },
      { "@type": "ListItem", position: 3, name: r.title, item: origin + routePath(r.slug) },
    ],
  };
}
