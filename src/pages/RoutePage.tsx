import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import ContactSection from "@/components/ContactSection";
import Img from "@/components/Img";
import { CallLink, WhatsAppLink } from "@/components/ContactButtons";
import { prefillFor } from "@/components/RouteCard";
import { business } from "@/config/business";
import { relatedRoutes, routeBySlug } from "@/data/routes";
import { routeMessage } from "@/lib/whatsapp";
import NotFound from "./NotFound";

export default function RoutePage() {
  const { slug = "" } = useParams();
  const r = routeBySlug(slug);
  if (!r) return <NotFound />;
  const related = relatedRoutes(r.slug);
  const heading =
    r.kind === "local" ? `${business.city} Local Taxi Service` : r.kind === "darshan" ? `${r.title} Tour` : r.kind === "outstation" ? `${business.city} Outstation Taxi` : `${r.title} Taxi Service`;

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="wrap py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-navy-100">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li><Link to="/#routes" className="hover:underline">Routes</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="font-semibold text-white">{r.title}</li>
            </ol>
          </nav>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="text-3xl font-semibold !text-white sm:text-5xl">{heading}</h1>
              <p className="mt-4 max-w-2xl text-lg text-navy-100">{r.blurb}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppLink message={routeMessage(r.from, r.to, r.kind)}>Book on WhatsApp</WhatsAppLink>
                <a href="#book" className="btn btn-gold">Enquire for fare</a>
                <CallLink className="btn btn-ghost-light">Call now</CallLink>
              </div>
            </div>
            {r.image && (
              <Img base={r.image} eager sizes="(min-width: 1024px) 380px, 92vw" alt={`${r.title}: representative photo`} className="w-full rounded-2xl object-cover shadow-lift" />
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rp-info">
        <div className="wrap grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 id="rp-info" className="h2">About this journey</h2>
            {r.about && <p className="lead">{r.about}</p>}
            <p className="mt-4 max-w-2xl text-ink-soft">
              We do not publish fixed fares, travel times or schedules for this route. Fare, vehicle and availability depend on your date, group size and trip type, and are confirmed by {business.name} when you enquire.
            </p>
            <h3 className="mt-8 font-display text-xl font-semibold text-navy">What to tell us when you enquire</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-soft">
              <li>Your pickup point and destination</li>
              <li>Journey date and pickup time</li>
              <li>One-way or round trip</li>
              <li>Number of passengers and luggage</li>
            </ul>
          </div>
          {related.length > 0 && (
            <aside aria-labelledby="rp-related" className="card h-fit p-6">
              <h2 id="rp-related" className="font-display text-xl font-semibold text-navy">Related routes</h2>
              <ul className="mt-3 divide-y divide-navy/10">
                {related.map((x) => (
                  <li key={x.slug}>
                    <Link to={`/routes/${x.slug}`} className="flex min-h-[48px] items-center justify-between gap-2 text-navy hover:underline">
                      {x.title} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </section>

      <ContactSection initial={prefillFor(r)} heading={`Enquire about ${r.title}`} />
    </>
  );
}
