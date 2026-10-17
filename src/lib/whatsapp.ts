import { whatsappDigits } from "@/config/business";
import { business } from "@/config/business";

/** Builds a properly encoded wa.me link, or "" when no valid WhatsApp number is configured. */
export function buildWhatsAppUrl(message: string): string {
  if (!whatsappDigits) return "";
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function routeMessage(from: string, to: string, kind?: string): string {
  const name = business.name;
  if (kind === "local") {
    return `Hello ${name}, I would like to enquire about a local taxi in ${business.city}. Please share the available vehicles, fare details and booking details.`;
  }
  if (kind === "darshan") {
    return `Hello ${name}, I would like to enquire about the ${from} to ${to} Darshan tour. Please share the itinerary, fare, available vehicles and booking details.`;
  }
  if (kind === "outstation" || !to) {
    return `Hello ${name}, I would like to enquire about an outstation taxi from ${from || business.city}. Please share the fare, available vehicles and booking details.`;
  }
  return `Hello ${name}, I would like to enquire about a taxi from ${from} to ${to}. Please share the fare, available vehicles, and booking details.`;
}

export const generalMessage = `Hello ${business.name}, I would like to enquire about a taxi booking. Please share the fare, available vehicles, and booking details.`;
