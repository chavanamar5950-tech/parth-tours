import RouteCard from "./RouteCard";
import Img from "./Img";
import { coastalFeatured, darshanRoutes, localRoutes } from "@/data/routes";
import { WhatsAppLink } from "./ContactButtons";
import { routeMessage } from "@/lib/whatsapp";
import { useInquiry } from "@/lib/inquiryContext";
import { prefillFor } from "./RouteCard";

export function LocalSection() {
  const { startInquiry } = useInquiry();
  const r = localRoutes[0];
  return (
    <section id="local" className="section" aria-labelledby="local-title">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Local taxi</span>
          <h2 id="local-title" className="h2">Kolhapur Local Taxi</h2>
          <p className="lead">Need to get around Kolhapur? Contact us to discuss your local transportation requirements, pickup points, how long you need the taxi, and which vehicle is available.</p>
          <ul className="mt-5 space-y-2 text-ink-soft">
            <li>Tell us your pickup points and timings</li>
            <li>Share the number of passengers and luggage</li>
            <li>We confirm vehicle availability and the fare</li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" className="btn btn-navy" onClick={() => startInquiry(prefillFor(r))}>Enquire About Local Taxi</button>
            <WhatsAppLink message={routeMessage(r.from, r.to, r.kind)}>Book on WhatsApp</WhatsAppLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Img base="dest-palace" sizes="(min-width: 1024px) 280px, 45vw" alt="New Palace, Kolhapur" className="w-full rounded-2xl object-cover shadow-card" />
          <Img base="dest-rankala" sizes="(min-width: 1024px) 280px, 45vw" alt="Rankala Lake at sunset, Kolhapur" className="mt-8 w-full rounded-2xl object-cover shadow-card" />
        </div>
      </div>
    </section>
  );
}

export function DarshanSection() {
  return (
    <section id="darshan" className="section bg-white" aria-labelledby="darshan-title">
      <div className="wrap">
        <span className="eyebrow">Tour packages</span>
        <h2 id="darshan-title" className="h2">Darshan &amp; Sightseeing Tours</h2>
        <p className="lead">Religious and sightseeing journeys starting from Kolhapur. The places visited, timings and what is included are confirmed with you when you enquire.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {darshanRoutes.map((r) => (
            <RouteCard key={r.slug} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoastalSection() {
  return (
    <section id="coastal" className="section" aria-labelledby="coastal-title">
      <div className="wrap">
        <span className="eyebrow">Coast &amp; Konkan</span>
        <h2 id="coastal-title" className="h2">Coastal &amp; Outstation Journeys</h2>
        <p className="lead">Journeys from Kolhapur towards the Konkan coast and Goa. These are the same routes listed above, grouped here for travellers planning a coastal trip.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coastalFeatured.map((r) => (
            <RouteCard key={r.slug} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
