/**
 * Fleet gallery. Photos come from the client's supplied PDF.
 * Add seating, AC, luggage etc. to `details` only after the client confirms them.
 */
export interface FleetItem {
  id: string;
  label: string;
  model?: string;
  image: string; // base name in /public/images
  alt: string;
  details: string[];
  suits: string;
}

export const fleet: FleetItem[] = [
  { id: "crysta", label: "Premium MPV", model: "Toyota Innova Crysta", image: "fleet-crysta", alt: "White Toyota Innova Crysta, front view", details: [], suits: "Family trips and longer journeys" },
  { id: "ertiga", label: "Family MPV", model: "Maruti Suzuki Ertiga", image: "fleet-ertiga", alt: "White Maruti Suzuki Ertiga, front view", details: [], suits: "Group and family travel" },
  { id: "kia", label: "Compact SUV-style", model: "Kia", image: "fleet-kia", alt: "White Kia vehicle, front view", details: [], suits: "Comfortable everyday journeys" },
  { id: "dzire", label: "Sedan", model: "Maruti Suzuki Dzire", image: "fleet-dzire", alt: "White Maruti Suzuki Dzire sedan, front view", details: [], suits: "City rides and small groups" },
];

export const fleetGroup = { image: "fleet-group", alt: "Two Toyota Innova vehicles parked side by side" };
