import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Check, Copy, Phone } from "lucide-react";
import { WhatsAppIcon } from "./BrandIcons";
import { openExternal } from "@/lib/openExternal";
import { BOOKING_NOTE, business, hasPhone, hasWhatsApp, telHref } from "@/config/business";
import { NOT_CONFIGURED } from "./ContactButtons";
import PlacePicker from "./PlacePicker";
import { prefillFor } from "./RouteCard";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { addDaysISO, buildInquiryMessage, fullSchema, TRIP_TYPES, todayISO, type InquiryValues, type TripType } from "@/lib/inquiry";
import { useInquiry } from "@/lib/inquiryContext";
import { routes } from "@/data/routes";

type Errors = Partial<Record<keyof InquiryValues, string>>;

const empty: InquiryValues = {
  tripType: "oneway",
  pickup: business.city,
  destination: "",
  date: "",
  time: "",
  passengers: "",
  name: "",
  phone: "",
  notes: "",
};

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const groups: { label: string; items: typeof routes }[] = [
  { label: "From Kolhapur", items: routes.filter((r) => r.kind === "intercity" && r.from === business.city) },
  { label: "To Kolhapur", items: routes.filter((r) => r.kind === "intercity" && r.to === business.city) },
  { label: "Other routes", items: routes.filter((r) => (r.kind === "intercity" || r.kind === "outstation") && r.from !== business.city && r.to !== business.city) },
  { label: "Local taxi", items: routes.filter((r) => r.kind === "local") },
  { label: "Darshan & sightseeing", items: routes.filter((r) => r.kind === "darshan") },
];

export default function InquiryForm({ initial }: { initial?: { pickup?: string; destination?: string; tripType?: TripType } }) {
  const uid = useId();
  const { prefill } = useInquiry();
  const [values, setValues] = useState<InquiryValues>({ ...empty, ...initial });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent" | "unconfigured">("idle");
  const [waUrl, setWaUrl] = useState("");
  const [routePick, setRoutePick] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prefill) return;
    setValues((v) => ({
      ...v,
      pickup: prefill.pickup ?? v.pickup,
      destination: prefill.destination ?? v.destination,
      tripType: prefill.tripType ?? v.tripType,
    }));
    setRoutePick("");
    setErrors({});
    setStatus("idle");
  }, [prefill]);

  const set = <K extends keyof InquiryValues>(key: K, value: InquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const id = (n: string) => `${uid}-${n}`;
  const isLocal = values.tripType === "local";
  const message = useMemo(() => buildInquiryMessage(values), [values]);

  const pickRoute = (slug: string) => {
    setRoutePick(slug);
    const r = routes.find((x) => x.slug === slug);
    if (!r) return;
    const p = prefillFor(r);
    setValues((v) => ({ ...v, pickup: p.pickup, destination: p.destination, tripType: p.tripType }));
    setErrors({});
    setStatus("idle");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = fullSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof InquiryValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      const firstKey = Object.keys(next)[0];
      if (firstKey) document.getElementById(id(firstKey))?.focus();
      return;
    }
    setErrors({});
    const url = buildWhatsAppUrl(buildInquiryMessage(parsed.data));
    if (!url) {
      setStatus("unconfigured");
      return;
    }
    setWaUrl(url);
    setStatus("sent");
    openExternal(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const invalid = (k: keyof InquiryValues) => (errors[k] ? { "aria-invalid": true, "aria-describedby": id(k) + "-err" } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-7" aria-labelledby={id("title")}>
      <h3 id={id("title")} className="font-display text-2xl font-semibold text-navy">
        Booking enquiry
      </h3>
      <p className="mt-1 text-sm text-ink-soft">Takes under a minute. Your details go straight into a WhatsApp message to us.</p>

      <div className="mt-5">
        <Field id={id("route")} label="Step 1: Pick a route (or fill in your own below)">
          <select id={id("route")} className="field" value={routePick} onChange={(e) => pickRoute(e.target.value)}>
            <option value="">Choose a route...</option>
            {groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.items.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="label">Trip type</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TRIP_TYPES.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input type="radio" name={id("tripType")} value={t.value} checked={values.tripType === t.value} onChange={() => set("tripType", t.value)} className="peer sr-only" />
              <span className="flex min-h-[48px] items-center justify-center rounded-xl border border-navy/20 bg-white px-2 text-center text-sm font-medium text-ink transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-gold">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <PlacePicker id={id("pickup")} label={isLocal ? "Pickup area" : "From"} value={values.pickup} onChange={(v) => set("pickup", v)} error={errors.pickup} />
        {!isLocal && <PlacePicker id={id("destination")} label="To" value={values.destination} onChange={(v) => set("destination", v)} error={errors.destination} />}

        <div className="sm:col-span-2">
          <Field id={id("date")} label="Journey date" error={errors.date}>
            <input id={id("date")} name="date" type="date" min={todayISO()} className="field" value={values.date} onChange={(e) => set("date", e.target.value)} {...invalid("date")} />
          </Field>
          <div className="mt-2 flex gap-2">
            <button type="button" className="min-h-[40px] rounded-full border border-navy/20 bg-white px-4 text-sm font-medium text-navy hover:border-navy" onClick={() => set("date", todayISO())}>
              Today
            </button>
            <button type="button" className="min-h-[40px] rounded-full border border-navy/20 bg-white px-4 text-sm font-medium text-navy hover:border-navy" onClick={() => set("date", addDaysISO(1))}>
              Tomorrow
            </button>
          </div>
        </div>
        <Field id={id("time")} label="Pickup time (optional)" error={errors.time}>
          <input id={id("time")} name="time" type="time" className="field" value={values.time} onChange={(e) => set("time", e.target.value)} />
        </Field>
        <Field id={id("passengers")} label="Passengers (optional)" error={errors.passengers}>
          <input id={id("passengers")} name="passengers" inputMode="numeric" placeholder="e.g. 4" className="field" value={values.passengers} onChange={(e) => set("passengers", e.target.value.replace(/\D/g, ""))} {...invalid("passengers")} />
        </Field>
        <Field id={id("name")} label="Your name" error={errors.name}>
          <input id={id("name")} name="name" autoComplete="name" className="field" value={values.name} onChange={(e) => set("name", e.target.value)} {...invalid("name")} />
        </Field>
        <Field id={id("phone")} label="Mobile number (optional)" error={errors.phone} hint="We can also see your number on WhatsApp.">
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={values.phone} onChange={(e) => set("phone", e.target.value)} {...invalid("phone")} />
        </Field>
        <div className="sm:col-span-2">
          <Field id={id("notes")} label="Anything else? (optional)" error={errors.notes}>
            <textarea id={id("notes")} name="notes" rows={3} maxLength={500} className="field" placeholder="Luggage, child seat, stops on the way, preferred vehicle..." value={values.notes} onChange={(e) => set("notes", e.target.value)} {...invalid("notes")} />
          </Field>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-navy/10 bg-ivory p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Your message (preview)</p>
        <pre data-testid="message-preview" className="mt-2 whitespace-pre-wrap break-words font-sans text-sm text-ink">{message}</pre>
      </div>

      <button type="submit" className="btn btn-wa mt-5 w-full text-lg">
        <WhatsAppIcon className="h-6 w-6" />
        Send enquiry on WhatsApp
      </button>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={copy} className="btn btn-outline btn-sm">
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Message copied" : "Copy message"}
        </button>
        {hasPhone && (
          <a href={telHref} className="btn btn-outline btn-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Prefer to call?
          </a>
        )}
      </div>
      <p className="mt-3 text-xs text-ink-soft">This opens WhatsApp (an external app or website) with your message ready. Just press send there. {BOOKING_NOTE}</p>

      <div aria-live="polite" className="mt-3">
        {status === "sent" && (
          <p className="rounded-xl bg-gold-50 p-3 text-sm text-ink">
            WhatsApp should now be open with your enquiry. Press send there to reach us. If nothing opened,{" "}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
              open WhatsApp manually
            </a>
            . Your booking is confirmed only after we confirm fare and availability with you.
          </p>
        )}
        {status === "unconfigured" && (
          <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800">
            {NOT_CONFIGURED}
            {import.meta.env.DEV && !hasWhatsApp && (
              <span className="mt-1 block font-mono text-xs">Developer note: set "whatsapp" in src/config/business.json (e.g. 919XXXXXXXXX) or VITE_WHATSAPP in .env.local, then restart.</span>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
