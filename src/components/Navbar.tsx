import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "./Logo";
import { business, hasPhone, phoneDisplay, telHref } from "@/config/business";

const links = [
  { to: "/", label: "Home" },
  { to: "/#services", label: "Services" },
  { to: "/#routes", label: "Routes" },
  { to: "/#darshan", label: "Tour Packages" },
  { to: "/#fleet", label: "Our Fleet" },
  { to: "/#about", label: "About Us" },
  { to: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // On a route page the enquiry form is on the same page, so keep the visitor there.
  const bookTo = pathname.startsWith("/routes/") ? { pathname, hash: "#book" } : "/#book";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="wrap flex h-[88px] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)} aria-label={`${business.name} home`}>
          <BrandLogo className="h-[76px] w-auto" alt="" />
          <span className="sr-only">{business.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink hover:bg-navy-50 hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {hasPhone && (
            <>
              <a href={telHref} className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-semibold text-navy hover:bg-navy-50 xl:flex">
                <Phone className="h-4 w-4" aria-hidden="true" /> {phoneDisplay}
              </a>
              <a href={telHref} aria-label={`Call ${phoneDisplay}`} className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-navy hover:bg-navy-50 xl:hidden">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </a>
            </>
          )}
          <Link to={bookTo} className="btn btn-gold btn-sm hidden sm:inline-flex">
            Book Your Ride
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-navy hover:bg-navy-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-navy/10 bg-ivory lg:hidden">
          <ul className="wrap py-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center border-b border-navy/5 text-base font-medium text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link to={bookTo} onClick={() => setOpen(false)} className="btn btn-gold w-full">
                Book Your Ride
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
