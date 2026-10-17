import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./BrandIcons";
import type { ReactNode } from "react";
import { hasPhone, telHref } from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const NOT_CONFIGURED = "Booking contact details are being set up. Please check back soon.";

interface WAProps {
  message: string;
  children: ReactNode;
  className?: string;
  icon?: boolean;
}

/** WhatsApp link. Renders a clearly disabled control (never a broken link) if no number is configured. */
export function WhatsAppLink({ message, children, className = "btn btn-wa", icon = true }: WAProps) {
  const href = buildWhatsAppUrl(message);
  const content = (
    <>
      {icon && <WhatsAppIcon className="h-5 w-5 shrink-0" />}
      <span>{children}</span>
    </>
  );
  if (!href) {
    return (
      <span role="link" aria-disabled="true" title={NOT_CONFIGURED} className={`${className} cursor-not-allowed opacity-60`}>
        {content}
        <span className="sr-only"> (unavailable: {NOT_CONFIGURED})</span>
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}

interface CallProps {
  children?: ReactNode;
  className?: string;
}

/** Call link. Renders nothing when no phone number is configured. */
export function CallLink({ children = "Call us", className = "btn btn-outline" }: CallProps) {
  if (!hasPhone) return null;
  return (
    <a href={telHref} className={className}>
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
