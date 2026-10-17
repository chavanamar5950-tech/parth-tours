import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./BrandIcons";
import { hasPhone, hasWhatsApp, telHref } from "@/config/business";
import { buildWhatsAppUrl, generalMessage } from "@/lib/whatsapp";

export default function FloatingContact() {
  if (!hasPhone && !hasWhatsApp) return null;
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {hasPhone && (
        <a href={telHref} aria-label="Call us" className="flex h-14 items-center justify-center gap-2 rounded-full bg-navy px-4 font-semibold text-white shadow-lift transition hover:bg-navy-800 max-sm:w-14 max-sm:px-0">
          <Phone className="h-6 w-6" aria-hidden="true" />
          <span className="hidden sm:inline">Call</span>
        </a>
      )}
      {hasWhatsApp && (
        <a href={buildWhatsAppUrl(generalMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" className="flex h-14 items-center justify-center gap-2 rounded-full bg-wa px-4 font-semibold text-white shadow-lift transition hover:bg-wa-dark">
          <WhatsAppIcon className="h-7 w-7" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      )}
    </div>
  );
}
