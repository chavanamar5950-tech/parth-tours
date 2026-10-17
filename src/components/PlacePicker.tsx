import { useEffect, useRef, useState } from "react";
import { business } from "@/config/business";
import { allPlaces } from "@/data/routes";

const OTHER = "__other";

export const PLACE_OPTIONS: string[] = Array.from(new Set([business.city, ...allPlaces, "Outstation"])).sort((a, b) =>
  a === business.city ? -1 : b === business.city ? 1 : a === "Outstation" ? 1 : b === "Outstation" ? -1 : a.localeCompare(b)
);

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  invalid?: Record<string, unknown>;
}

/** A select of known places plus an "Other place" option that reveals a text box. Works well on phones. */
export default function PlacePicker({ id, label, value, onChange, error }: Props) {
  const inList = PLACE_OPTIONS.includes(value);
  const [other, setOther] = useState(value !== "" && !inList);
  const inputRef = useRef<HTMLInputElement>(null);

  // If a route card pre-fills a known place from outside, show it in the select again.
  useEffect(() => {
    if (PLACE_OPTIONS.includes(value) && document.activeElement !== inputRef.current) setOther(false);
    if (value !== "" && !PLACE_OPTIONS.includes(value)) setOther(true);
  }, [value]);

  const showText = other;
  const aria = error ? { "aria-invalid": true, "aria-describedby": `${id}-err` } : {};

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="field"
        value={showText ? OTHER : value}
        onChange={(e) => {
          const v = e.target.value;
          if (v === OTHER) {
            setOther(true);
            onChange("");
            window.setTimeout(() => inputRef.current?.focus(), 0);
          } else {
            setOther(false);
            onChange(v);
          }
        }}
        {...aria}
      >
        <option value="">Select a place</option>
        {PLACE_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
        <option value={OTHER}>Other place (type it)</option>
      </select>
      {showText && (
        <input
          ref={inputRef}
          aria-label={`${label}: type the place name`}
          className="field mt-2"
          placeholder="Type the place name"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...aria}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="err" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
