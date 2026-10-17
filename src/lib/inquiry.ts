import { z } from "zod";
import { business } from "@/config/business";

export const TRIP_TYPES = [
  { value: "oneway", label: "One-way" },
  { value: "roundtrip", label: "Round-trip" },
  { value: "local", label: "Local" },
  { value: "darshan", label: "Darshan / Sightseeing" },
] as const;

export type TripType = (typeof TRIP_TYPES)[number]["value"];

export function normalizeIndianMobile(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const todayISO = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const optionalDate = z
  .string()
  .trim()
  .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Please enter a valid date.")
  .refine((v) => v === "" || new Date(v + "T00:00:00") >= today(), "The journey date cannot be in the past.");

export const fullSchema = z
  .object({
    tripType: z.enum(["oneway", "roundtrip", "local", "darshan"]),
    pickup: z.string().trim().min(2, "Please enter your pickup city or area.").max(80, "That is too long."),
    destination: z.string().trim().max(80, "That is too long."),
    date: optionalDate,
    time: z.string().trim(),
    passengers: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^\d+$/.test(v) && +v >= 1 && +v <= 60), "Enter a number of passengers between 1 and 60."),
    name: z.string().trim().min(2, "Please enter your name.").max(60, "That name is too long."),
    phone: z
      .string()
      .trim()
      .refine((v) => v === "" || /^[6-9]\d{9}$/.test(normalizeIndianMobile(v)), "Enter a valid 10-digit mobile number, or leave this blank."),
    notes: z.string().trim().max(500, "Please keep this under 500 characters."),
  })
  .superRefine((v, ctx) => {
    if (v.tripType !== "local" && v.destination.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["destination"], message: "Please enter your destination." });
    }
  });

export type InquiryValues = z.infer<typeof fullSchema>;

export const compactSchema = z
  .object({
    tripType: z.enum(["oneway", "roundtrip", "local", "darshan"]),
    pickup: z.string().trim().min(2, "Please choose or enter a pickup city.").max(80),
    destination: z.string().trim().max(80),
    date: optionalDate,
  })
  .superRefine((v, ctx) => {
    if (v.tripType !== "local" && v.destination.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["destination"], message: "Please choose or enter a destination." });
    }
  });

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(t: string): string {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h)) return t;
  const suffix = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function buildInquiryMessage(v: Partial<InquiryValues>): string {
  const label = TRIP_TYPES.find((t) => t.value === v.tripType)?.label;
  const from = v.pickup?.trim() || "";
  const to = v.destination?.trim() || "";
  let intro: string;
  if (v.tripType === "local") {
    intro = `I would like to enquire about a local taxi in ${from || business.city}. Please share the available vehicles, fare details and booking details.`;
  } else if (v.tripType === "darshan") {
    intro = /darshan$/i.test(to)
      ? `I would like to enquire about the ${from || business.city} to ${to} tour. Please share the itinerary, fare, available vehicles and booking details.`
      : `I would like to enquire about a Darshan / sightseeing tour${from ? ` from ${from}` : ""}${to ? ` to ${to}` : ""}. Please share the itinerary, fare, available vehicles and booking details.`;
  } else if (from && to) {
    intro = `I would like to enquire about a taxi from ${from} to ${to}. Please share the fare, available vehicles, and booking details.`;
  } else {
    intro = `I would like to enquire about a taxi booking. Please share the fare, available vehicles, and booking details.`;
  }
  const lines = [`Hello ${business.name}, ${intro}`, ""];
  if (label) lines.push(`Trip type: ${label}`);
  if (v.date) lines.push(`Journey date: ${formatDate(v.date)}`);
  if (v.time) lines.push(`Pickup time: ${formatTime(v.time)}`);
  if (v.passengers) lines.push(`Passengers: ${v.passengers}`);
  if (v.name) lines.push(`Name: ${v.name}`);
  if (v.phone) lines.push(`Contact number: ${normalizeIndianMobile(v.phone)}`);
  if (v.notes) lines.push(`Additional requirements: ${v.notes}`);
  return lines.join("\n").trim();
}

export function addDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
