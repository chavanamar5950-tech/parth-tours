import raw from "./business.json";

export interface Review {
  name: string;
  text: string;
  source?: string;
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsUrl: string;
  hours: string;
  siteUrl: string;
  social: { instagram: string; facebook: string; googleReviews: string };
  reviews: Review[];
}

const base = raw as unknown as BusinessConfig;

// Numbers can also come from environment variables (.env.local or Vercel project settings),
// so they can be set without editing code: VITE_WHATSAPP, VITE_PHONE.
export const business: BusinessConfig = {
  ...base,
  whatsapp: base.whatsapp || (import.meta.env.VITE_WHATSAPP as string | undefined) || "",
  phone: base.phone || (import.meta.env.VITE_PHONE as string | undefined) || "",
};

const digits = (value: string) => (value || "").replace(/\D/g, "");

/** WhatsApp number as digits with country code, or "" if not configured / invalid. */
export const whatsappDigits = (() => {
  const d = digits(business.whatsapp);
  return /^\d{11,15}$/.test(d) ? d : "";
})();

/** Phone number as digits with country code, or "" if not configured / invalid. */
export const phoneDigits = (() => {
  let d = digits(business.phone);
  if (d.length === 10) d = "91" + d;
  return /^\d{11,15}$/.test(d) ? d : "";
})();

export const hasWhatsApp = whatsappDigits !== "";
export const hasPhone = phoneDigits !== "";
export const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email);
export const telHref = hasPhone ? `tel:+${phoneDigits}` : "";
export const mailHref = hasEmail ? `mailto:${business.email}` : "";

/** Human-friendly display of the phone number: uses the client's own formatting. */
export const phoneDisplay = business.phone.trim();

export const hasGoogleReviews = /^https?:\/\//.test(business.social.googleReviews);
export const hasReviews = Array.isArray(business.reviews) && business.reviews.length > 0;

export const BOOKING_NOTE =
  "Fares, vehicle availability and booking are confirmed by Parth Tours and Travels after you enquire. Sending an enquiry does not confirm a booking.";
