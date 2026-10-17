import { Compass, Landmark, MapPinned, Route, Waves, Car, MessageCircle, CalendarCheck, PhoneCall, Handshake, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  { id: "intercity", title: "Intercity & Outstation Taxi", text: "One-way and round-trip taxis between Kolhapur, Pune, Mumbai, Goa, Belgaum and more.", href: "#routes", icon: Route },
  { id: "local", title: "Kolhapur Local Taxi", text: "A taxi within Kolhapur. Tell us your pickup points, duration and passengers.", href: "#local", icon: MapPinned },
  { id: "darshan", title: "Darshan & Sightseeing Tours", text: "Karvir, Datta, Kokan and Goa Darshan tours starting from Kolhapur.", href: "#darshan", icon: Landmark },
  { id: "coastal", title: "Coastal & Special Journeys", text: "Ratnagiri, Malvan and Sindhudurg, Goa and Kokan journeys from Kolhapur.", href: "#coastal", icon: Waves },
];

export const whyUs = [
  { icon: Car, title: "Local and outstation travel", text: "One company for city rides, intercity journeys and darshan tours." },
  { icon: Compass, title: "Many destination choices", text: "Routes across Maharashtra, Goa and Karnataka, with custom outstation trips on request." },
  { icon: Handshake, title: "Vehicles for different journeys", text: "Sedans and larger MPVs, chosen to suit your group and your trip." },
  { icon: MessageCircle, title: "Direct communication", text: "Talk to us on WhatsApp or call to confirm fare, availability and pickup details." },
];

export const steps = [
  { icon: Route, title: "Choose your route", text: "Pick a route from the list or tell us where you want to go." },
  { icon: MessageCircle, title: "Send an enquiry", text: "Share the date, pickup point and number of passengers on WhatsApp or by call." },
  { icon: CalendarCheck, title: "Get fare and availability", text: "We reply with the fare, the vehicle options and whether we can take your trip." },
  { icon: PhoneCall, title: "Confirm your booking", text: "Once you agree the details with us, your journey is confirmed." },
];

export const faqs = [
  { q: "How do I book a taxi?", a: "Use the enquiry form, tap a WhatsApp button, or call us. Tell us your pickup point, destination, date and the number of passengers. We reply with the fare and vehicle options." },
  { q: "Does sending the form confirm my booking?", a: "No. The form opens WhatsApp with your details filled in. Your booking is only confirmed once Parth Tours and Travels confirms the fare, vehicle and availability with you." },
  { q: "What will the fare be?", a: "Fares are not listed on this website because they depend on the route, date, vehicle and trip type. Ask for a quote and we will share the fare before you confirm." },
  { q: "Can I travel to a place that is not listed?", a: "Possibly. Choose \"Kolhapur to Outstation\" or write your destination in the form. We will tell you whether we can take that trip." },
  { q: "Do you offer round trips and local rides?", a: "You can enquire about one-way, round-trip, local and darshan or sightseeing journeys. Pick the trip type in the form." },
  { q: "What do the Darshan tours include?", a: "The places visited, timings and inclusions are agreed with you when you enquire. Tell us what you would like to see and we will confirm what is possible." },
  { q: "Can I choose my vehicle?", a: "You can tell us the kind of vehicle you prefer. Availability depends on the date and is confirmed when you enquire." },
  { q: "How do I change or cancel a trip?", a: "Please contact us as early as you can. Ask about the change and cancellation terms when you confirm your booking." },
];
