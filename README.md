# Parth Tours and Travels: website

React + TypeScript + Vite + Tailwind CSS. Taxi, outstation and darshan tour website for Parth Tours and Travels, Kolhapur.
Bookings are **enquiries sent through WhatsApp** (no backend, no database, no stored customer data).

## Run locally

```bash
npm install
npm run dev        # http://localhost:8080
npm run typecheck  # TypeScript
npm run lint       # ESLint
npm run build      # production build + SEO pages + sitemap
npm run preview    # serve the production build
```

## Before going live: fill in the client's details

Edit **`src/config/business.json`** (the only place contact details live). Leave a value as `""` until the client confirms it; the site hides or disables whatever is empty.

| Field | Format |
| --- | --- |
| `phone` | e.g. `+91 98XXXXXXXX` |
| `whatsapp` | digits with country code, e.g. `9198XXXXXXXX` |
| `email`, `address`, `mapsUrl`, `hours` | as confirmed by the client |
| `siteUrl` | live domain, no trailing slash, e.g. `https://www.parthtours.in` |
| `social.instagram / facebook / googleReviews` | full URLs, e.g. `https://www.instagram.com/<handle>`. The Instagram icon appears in the footer and contact card as soon as this is set. |
| `reviews` | `[{ "name": "...", "text": "...", "source": "Google" }]` only when the client supplies genuine reviews. The reviews section stays hidden while this is empty. |

You can also set `VITE_WHATSAPP` and `VITE_PHONE` in `.env.local` (see `.env.example`) or in Vercel environment variables. **The enquiry form cannot send anything until a WhatsApp number is set.**

Until `whatsapp` is set, every WhatsApp button shows as disabled with a clear message. No broken links are generated.

## Where things are

- `src/data/routes.json`: every route, the single source for cards, filters, route pages, sitemap (27 entries)
- `src/data/fleet.ts`: fleet gallery. Add `details: ["7 seats", "AC"]` only once the client confirms them
- `src/data/content.ts`: services, why-us, booking steps, FAQ
- `src/lib/whatsapp.ts`, `src/lib/inquiry.ts`: WhatsApp link and message building, form validation
- `public/images/`: optimised WebP photos (`src/data/images.ts` lists their sizes)
- `scripts/postbuild.mjs`: after `vite build`, writes per-route HTML with its own title, description, canonical, Open Graph and JSON-LD, plus `sitemap.xml`, `robots.txt` and `404.html`

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New, Project**, import the repository. Framework preset: **Vite** (build command `npm run build`, output directory `dist`).
3. Deploy. The sitemap uses `siteUrl` from `business.json`, or Vercel's production URL if that is empty.
4. Add the custom domain in Project Settings, then put it in `siteUrl` and redeploy.

`vercel.json` sets clean URLs and security and cache headers.

## Notes

- The photos come from the client's supplied PDF. Vehicle number plates are visible in them; blur them if the client prefers.
- Destination photos (Kolhapur, Ratnagiri/Ganpatipule, Malvan, Sindhudurg, Narsobachi Wadi) were reused from the original project; confirm usage rights. There are no photos for Pune, Mumbai, Goa or Belgaum, so those cards use a neutral route graphic.
- The Goa route pages use two original illustrations (`public/images/dest-goa-*.webp`, `dest-goa-darshan-*.webp`) because no Goa photos were supplied. To use real photos, replace those files (same names and widths 480/800/1200).
- The logo is a simple placeholder monogram. Replace `public/favicon.svg`, `src/components/Logo.tsx` and `public/og-image.jpg` when the client has a real logo.

## Going live checklist (Vercel)

1. Push the project to GitHub and import it in Vercel (framework: Vite, build `npm run build`, output `dist`).
2. Run locally first: `npm install && npm run typecheck && npm run build`.
3. Edit `src/config/business.json` (the only place for business details):
   - `phone` / `whatsapp`: set to the owner's number (`+91 98605 76408` / `919860576408`). Drives every call and WhatsApp button.
   - `siteUrl`: your live domain, e.g. `https://www.yourdomain.in` (sitemap, canonical, social previews).
   - `social.googleReviews`: paste the Google Business "write a review"/reviews link. A Reviews section with the Google logo then appears, and links show in Contact and the footer.
   - `social.instagram`, `email`, `address`, `mapsUrl`, `hours`: fill in when confirmed. Empty values are hidden automatically.
   - `reviews`: add only genuine customer reviews (`{ "name", "text", "source" }`).
4. Add the custom domain in Vercel, then submit `/sitemap.xml` in Google Search Console.
5. Test on a phone: tap Call, tap WhatsApp, send an enquiry from the form.
