import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RouteCard, { prefillFor } from "./RouteCard";
import { WhatsAppLink } from "./ContactButtons";
import { FILTERS, popularRoutes, routes, type RouteItem } from "@/data/routes";
import { business } from "@/config/business";
import { routeMessage } from "@/lib/whatsapp";
import { useInquiry } from "@/lib/inquiryContext";

const destLabel = (r: RouteItem) => (r.kind === "darshan" ? `${r.to} Darshan` : r.kind === "local" ? "Local taxi in Kolhapur" : r.to);
const originOptions = Array.from(new Set(routes.map((r) => r.from))).sort((a, b) => (a === business.city ? -1 : b === business.city ? 1 : a.localeCompare(b)));

function Explorer() {
  const { startInquiry } = useInquiry();
  const [chip, setChip] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [toSlug, setToSlug] = useState("");

  const byChip = useMemo(() => routes.filter((r) => (chip === "all" ? true : r.tags.includes(chip)) && (!from || r.from === from)), [chip, from]);
  const results = toSlug ? byChip.filter((r) => r.slug === toSlug) : byChip;
  const toOptions = byChip;

  const reset = () => {
    setChip("all");
    setFrom("");
    setToSlug("");
  };

  return (
    <div className="mt-14" id="all-routes">
      <h3 className="font-display text-2xl font-semibold text-navy">Find your route</h3>
      <p className="mt-2 text-ink-soft">Choose where you start and where you are going. Every route we list is shown below.</p>

      <div className="card mt-5 grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <label htmlFor="rx-from" className="label">Starting city</label>
          <select id="rx-from" className="field" value={from} onChange={(e) => { setFrom(e.target.value); setToSlug(""); }}>
            <option value="">Any starting city</option>
            {originOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rx-to" className="label">Destination</label>
          <select id="rx-to" className="field" value={toSlug} onChange={(e) => setToSlug(e.target.value)}>
            <option value="">Any destination</option>
            {toOptions.map((r) => (
              <option key={r.slug} value={r.slug}>{destLabel(r)}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="group" aria-label="Filter routes" className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={chip === f.id}
            onClick={() => { setChip(f.id); setToSlug(""); }}
            className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition ${chip === f.id ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-ink hover:border-navy"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-ink-soft" aria-live="polite">
        {results.length === 0 ? "No matching route found." : `Showing ${results.length} of ${routes.length} routes`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-3 divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white">
          {results.map((r) => (
            <li key={r.slug} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link to={`/routes/${r.slug}`} className="font-semibold text-navy hover:underline">{r.title}</Link>
                <p className="text-sm text-ink-soft">
                  {r.kind === "local" ? "Local taxi" : r.kind === "darshan" ? "Darshan & sightseeing" : r.kind === "outstation" ? "Custom outstation trip" : "Intercity taxi"} · Request a quote
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => startInquiry(prefillFor(r))}>Enquire</button>
                <WhatsAppLink message={routeMessage(r.from, r.to, r.kind)} className="btn btn-wa btn-sm">WhatsApp</WhatsAppLink>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-3 p-6 text-center">
          <p className="font-display text-xl font-semibold text-navy">We could not find that exact route</p>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">We may still be able to take you there. Tell us about your journey and we will confirm.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button type="button" className="btn btn-navy" onClick={() => startInquiry({ pickup: from || business.city, destination: "", tripType: "oneway" })}>Enquire about a custom journey</button>
            <button type="button" className="btn btn-outline" onClick={reset}>Clear filters</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoutesSection() {
  return (
    <section id="routes" className="section bg-white" aria-labelledby="routes-title">
      <div className="wrap">
        <span className="eyebrow">Routes</span>
        <h2 id="routes-title" className="h2">Popular intercity routes</h2>
        <p className="lead">Taxi journeys between Kolhapur and the cities our customers ask about most. No fixed fares are listed; ask for a quote for your date and vehicle.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularRoutes.map((r) => (
            <RouteCard key={r.slug} r={r} />
          ))}
        </div>
        <Explorer />
      </div>
    </section>
  );
}
