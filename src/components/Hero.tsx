import { Link } from "react-router-dom";
import Img from "./Img";
import { CallLink, WhatsAppLink } from "./ContactButtons";
import { business, phoneDisplay } from "@/config/business";
import { generalMessage } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white" aria-labelledby="hero-title">
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="wrap relative grid gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow !text-gold-light">{business.city}, {business.region}</p>
          <h1 id="hero-title" className="!text-white text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
            Your Journey, Our Priority.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-100">
            Comfortable taxi services, outstation travel, and memorable sightseeing journeys from Kolhapur to destinations across Maharashtra, Goa, and beyond.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#book" className="btn btn-gold">Book Your Ride</Link>
            <WhatsAppLink message={generalMessage}>Chat on WhatsApp</WhatsAppLink>
            <Link to="/#routes" className="btn btn-ghost-light">Explore Our Routes</Link>
            <CallLink className="btn btn-ghost-light">Call {phoneDisplay}</CallLink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none lg:justify-self-end lg:w-[400px]">
          <div className="absolute -inset-3 rounded-[28px] border border-gold/50" aria-hidden="true" />
          <Img
            base="hero-main"
            eager
            sizes="(min-width: 1024px) 400px, 90vw"
            alt="White Toyota Innova Crysta ready for a journey"
            className="relative w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}
