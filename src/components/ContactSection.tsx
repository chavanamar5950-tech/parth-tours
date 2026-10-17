import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { GoogleIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import InquiryForm from "./InquiryForm";
import { CallLink, WhatsAppLink } from "./ContactButtons";
import { BOOKING_NOTE, business, hasEmail, hasGoogleReviews, hasPhone, hasWhatsApp, mailHref, phoneDisplay, telHref, whatsappDigits } from "@/config/business";
import { generalMessage } from "@/lib/whatsapp";
import type { TripType } from "@/lib/inquiry";

export default function ContactSection({ initial, heading = "Book your journey" }: { initial?: { pickup?: string; destination?: string; tripType?: TripType }; heading?: string }) {
  const nothing = !hasPhone && !hasWhatsApp && !hasEmail;
  return (
    <section id="contact" className="section bg-white" aria-labelledby="contact-title">
      <div className="wrap">
        <span className="eyebrow">Contact</span>
        <h2 id="contact-title" className="h2">{heading}</h2>
        <p className="lead">Send your trip details and we will come back with fare, vehicle and availability.</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card h-fit p-6 sm:p-7">
            <h3 className="font-display text-2xl font-semibold text-navy">{business.name}</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              {hasPhone && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Phone</span><a href={telHref} className="font-semibold text-navy hover:underline">{phoneDisplay}</a></span>
                </li>
              )}
              {hasWhatsApp && (
                <li className="flex gap-3">
                  <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-wa" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">WhatsApp</span><WhatsAppLink message={generalMessage} className="font-semibold text-navy hover:underline" icon={false}>Chat on WhatsApp (+{whatsappDigits})</WhatsAppLink></span>
                </li>
              )}
              {business.social.instagram && (
                <li className="flex gap-3">
                  <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#C13584]" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Instagram</span><a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:underline">Follow us on Instagram<span className="sr-only"> (opens in a new tab)</span></a></span>
                </li>
              )}
              {hasGoogleReviews && (
                <li className="flex gap-3">
                  <GoogleIcon className="mt-0.5 h-5 w-5 shrink-0" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Google reviews</span><a href={business.social.googleReviews} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:underline">Read our reviews<span className="sr-only"> (opens in a new tab)</span></a></span>
                </li>
              )}
              {hasEmail && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Email</span><a href={mailHref} className="break-all font-semibold text-navy hover:underline">{business.email}</a></span>
                </li>
              )}
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Location</span>
                  {business.address ? <span className="text-ink">{business.address}</span> : <span className="text-ink">{business.city}, {business.region}. Contact us for pickup and meeting arrangements.</span>}
                  {business.mapsUrl && (
                    <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-navy underline">View on Google Maps</a>
                  )}
                </span>
              </li>
              {business.hours && (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                  <span><span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft">Hours</span>{business.hours}</span>
                </li>
              )}
            </ul>
            {(hasPhone || hasWhatsApp) && (
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                <CallLink className="btn btn-navy btn-sm">Call now</CallLink>
                <WhatsAppLink message={generalMessage} className="btn btn-wa btn-sm">WhatsApp us</WhatsAppLink>
              </div>
            )}
            {nothing && <p className="mt-5 rounded-xl bg-gold-50 p-3 text-sm text-ink">Phone and WhatsApp details are being set up. Please check back soon.</p>}
            <p className="mt-6 border-t border-navy/10 pt-4 text-sm text-ink-soft">{BOOKING_NOTE}</p>
          </div>
          <div id="book" className="scroll-mt-24">
            <InquiryForm initial={initial} />
          </div>
        </div>
      </div>
    </section>
  );
}
