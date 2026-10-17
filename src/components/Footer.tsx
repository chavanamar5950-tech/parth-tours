import { Link } from "react-router-dom";
import { BrandLogo } from "./Logo";
import { GoogleIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Phone } from "lucide-react";
import { buildWhatsAppUrl, generalMessage } from "@/lib/whatsapp";
import { business, hasEmail, hasGoogleReviews, hasPhone, hasWhatsApp, mailHref, phoneDisplay, telHref } from "@/config/business";
import { popularRoutes } from "@/data/routes";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-900 pb-24 text-navy-100 sm:pb-0">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3 shadow-card">
            <BrandLogo className="h-28 w-auto" />
          </div>
          <p className="mt-4 text-sm">Taxi, outstation and darshan tour services from {business.city}, {business.region}. Fares and availability are confirmed when you enquire.</p>
          <ul className="mt-5 flex gap-3" aria-label="Social and messaging links">
            {hasWhatsApp && (
              <li>
                <a href={buildWhatsAppUrl(generalMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </li>
            )}
            {hasPhone && (
              <li>
                <a href={telHref} aria-label={`Call ${phoneDisplay}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-navy-900">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            )}
            {hasGoogleReviews && (
              <li>
                <a href={business.social.googleReviews} target="_blank" rel="noopener noreferrer" aria-label="Read our reviews on Google (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:bg-gold-light">
                  <GoogleIcon className="h-5 w-5" />
                </a>
              </li>
            )}
            {business.social.instagram && (
              <li>
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#C13584]">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </li>
            )}
          </ul>
        </div>
        <nav aria-label="Footer: quick links">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider !text-gold-light">Quick links</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {[["Home", "/"], ["Services", "/#services"], ["Routes", "/#routes"], ["Tour Packages", "/#darshan"], ["Our Fleet", "/#fleet"], ["About Us", "/#about"], ["Contact", "/#contact"], ["Privacy", "/privacy"]].map(([l, to]) => (
              <li key={to}><Link to={to} className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer: services and routes">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider !text-gold-light">Services &amp; routes</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li><Link to="/#local" className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">Kolhapur Local Taxi</Link></li>
            <li><Link to="/#darshan" className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">Darshan &amp; Sightseeing</Link></li>
            <li><Link to="/#coastal" className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">Coastal &amp; Outstation</Link></li>
            {popularRoutes.slice(0, 4).map((r) => (
              <li key={r.slug}><Link to={`/routes/${r.slug}`} className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">{r.title}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider !text-gold-light">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {hasPhone && <li><a href={telHref} className="inline-flex items-center gap-2 font-semibold text-white hover:underline"><Phone className="h-4 w-4" aria-hidden="true" />{phoneDisplay}</a></li>}
            {hasPhone && <li><a href={telHref} className="hover:text-white hover:underline">Tap to call</a></li>}
            {hasWhatsApp && <li><a href={buildWhatsAppUrl(generalMessage)} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">WhatsApp enquiry</a></li>}
            {hasEmail && <li><a href={mailHref} className="break-all hover:text-white hover:underline">{business.email}</a></li>}
            <li>{business.address || `${business.city}, ${business.region}, ${business.country}`}</li>
            {!hasPhone && !hasWhatsApp && !hasEmail && <li>Contact details coming soon.</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>&copy; {year} {business.name}. All rights reserved.</p>
          <p>Enquiries are not bookings until confirmed by {business.shortName}.</p>
        </div>
      </div>
    </footer>
  );
}
