import { Link } from "react-router-dom";
import Img from "./Img";
import { fleet, fleetGroup } from "@/data/fleet";
import { faqs, services, steps, whyUs } from "@/data/content";
import { GoogleIcon } from "./BrandIcons";
import { business, hasGoogleReviews, hasReviews } from "@/config/business";

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <span className="eyebrow">Services</span>
        <h2 id="services-title" className="h2">Travel services from {business.city}</h2>
        <p className="lead">From a ride across town to a long outstation journey, tell us what you need and we will confirm what we can offer.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a key={s.id} href={s.href} className="card group p-6 transition motion-safe:hover:-translate-y-1 hover:shadow-lift">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold-light">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-[15px] text-ink-soft">{s.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Fleet() {
  return (
    <section id="fleet" className="section bg-white" aria-labelledby="fleet-title">
      <div className="wrap">
        <span className="eyebrow">Our fleet</span>
        <h2 id="fleet-title" className="h2">Vehicles for different journeys</h2>
        <p className="lead">A look at the kind of vehicles we use. Tell us your group size and trip, and we will confirm the right vehicle and its availability for your date.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((v) => (
            <figure key={v.id} className="card overflow-hidden">
              <Img base={v.image} alt={v.alt} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" className="w-full object-cover" />
              <figcaption className="p-5">
                <p className="font-display text-xl font-semibold text-navy">{v.label}</p>
                {v.model && <p className="text-sm font-semibold text-gold-dark">{v.model}</p>}
                <p className="mt-1 text-sm text-ink-soft">Suited to: {v.suits}</p>
                {v.details.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {v.details.map((d) => (
                      <li key={d} className="rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-dark">{d}</li>
                    ))}
                  </ul>
                )}
              </figcaption>
            </figure>
          ))}
          <figure className="card overflow-hidden sm:col-span-2 lg:col-span-2">
            <Img base={fleetGroup.image} alt={fleetGroup.alt} sizes="(min-width: 1024px) 780px, 92vw" className="w-full object-cover max-h-[460px]" />
            <figcaption className="p-5">
              <p className="font-display text-xl font-semibold text-navy">Group travel</p>
              <p className="mt-1 text-sm text-ink-soft">Travelling with a larger group? Ask us about vehicle options.</p>
            </figcaption>
          </figure>
        </div>
        <p className="mt-6 text-sm text-ink-soft">Photos are for illustration. Seating, features and availability are confirmed when you book.</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">About us</span>
            <h2 id="about-title" className="h2">Why choose {business.name}</h2>
            <p className="lead">
              {business.name} is a taxi and travel service in {business.city}, {business.region}. We help customers travel locally, between cities and on darshan and sightseeing tours, and we keep the booking conversation direct and simple.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {whyUs.map((w) => (
              <li key={w.title} className="card p-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-dark">
                  <w.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">{w.title}</h3>
                <p className="mt-1.5 text-[15px] text-ink-soft">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section bg-navy-900 text-white" aria-labelledby="process-title">
      <div className="wrap">
        <span className="eyebrow !text-gold-light">How it works</span>
        <h2 id="process-title" className="h2 !text-white">How to book your journey</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-semibold text-navy-900" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-4 font-display text-lg font-semibold !text-white">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-navy-100">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-navy-100">
          Sending an enquiry is not a confirmed booking. Fare, vehicle and availability are agreed with you first.
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="h2">Frequently asked questions</h2>
          <p className="lead">Cannot find your answer? <Link to="/#contact" className="font-semibold text-navy underline">Contact us</Link> and we will help.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group p-0 open:shadow-lift">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-xl text-gold-dark transition group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-[15px] text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  if (!hasReviews && !hasGoogleReviews) return null;
  return (
    <section id="reviews" className="section bg-white" aria-labelledby="reviews-title">
      <div className="wrap">
        <span className="eyebrow">Reviews</span>
        <h2 id="reviews-title" className="h2">What customers say</h2>
        {hasReviews && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {business.reviews.map((r) => (
              <blockquote key={r.name + r.text.slice(0, 12)} className="card p-6">
                <p className="text-ink">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 text-sm font-semibold text-navy">{r.name}{r.source ? `, ${r.source}` : ""}</footer>
              </blockquote>
            ))}
          </div>
        )}
        {hasGoogleReviews && (
          <div className="card mt-10 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-navy/10 bg-white shadow-card">
                <GoogleIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-navy">Read our reviews on Google</p>
                <p className="text-sm text-ink-soft">See what our customers say, and share your own experience after your journey.</p>
              </div>
            </div>
            <a href={business.social.googleReviews} target="_blank" rel="noopener noreferrer" className="btn btn-navy shrink-0">
              See Google reviews
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
