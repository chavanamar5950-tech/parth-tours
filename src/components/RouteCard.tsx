import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import Img from "./Img";
import { WhatsAppLink } from "./ContactButtons";
import { hasPhone, telHref } from "@/config/business";
import { routeMessage } from "@/lib/whatsapp";
import { useInquiry } from "@/lib/inquiryContext";
import type { RouteItem } from "@/data/routes";
import type { TripType } from "@/lib/inquiry";

export const tripTypeFor = (kind: RouteItem["kind"]): TripType => (kind === "local" ? "local" : kind === "darshan" ? "darshan" : "oneway");

export function prefillFor(r: RouteItem) {
  if (r.kind === "local") return { pickup: r.from, destination: "", tripType: "local" as TripType };
  if (r.kind === "darshan") return { pickup: r.from, destination: `${r.to} Darshan`, tripType: "darshan" as TripType };
  if (r.kind === "outstation") return { pickup: r.from, destination: "", tripType: "oneway" as TripType };
  return { pickup: r.from, destination: r.to, tripType: "oneway" as TripType };
}

function Band({ r }: { r: RouteItem }) {
  if (r.image) {
    return <Img base={r.image} alt={`${r.title}: representative photo`} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" className="w-full object-cover" />;
  }
  return (
    <div className="flex aspect-[2.7] w-full flex-col items-center justify-center gap-2 bg-navy px-4 text-white" aria-hidden="true">
      <div className="flex w-full max-w-[260px] items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-px flex-1 border-t-2 border-dashed border-gold/70" />
        <MapPin className="h-5 w-5 text-gold-light" />
      </div>
      <div className="flex w-full max-w-[260px] justify-between font-display text-sm text-navy-100">
        <span>{r.from}</span>
        <span>{r.kind === "darshan" ? `${r.to} Darshan` : r.to}</span>
      </div>
    </div>
  );
}

export default function RouteCard({ r }: { r: RouteItem }) {
  const { startInquiry } = useInquiry();
  return (
    <article className="card flex flex-col overflow-hidden transition motion-safe:hover:-translate-y-1 hover:shadow-lift">
      <Band r={r} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-navy">
          <Link to={`/routes/${r.slug}`} className="hover:underline">
            {r.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] text-ink-soft">{r.blurb}</p>
        <p className="mt-3 text-sm font-semibold text-gold-dark">Enquire for fare</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button type="button" className="btn btn-navy btn-sm" onClick={() => startInquiry(prefillFor(r))}>
            Enquire About This Route
          </button>
          <WhatsAppLink message={routeMessage(r.from, r.to, r.kind)} className="btn btn-wa btn-sm">
            Book on WhatsApp
          </WhatsAppLink>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4">
          <Link to={`/routes/${r.slug}`} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy hover:underline">
            Route details <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {hasPhone && (
            <a href={telHref} className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-navy hover:underline">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call to enquire
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
