import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { TripType } from "@/lib/inquiry";

export interface Prefill {
  pickup?: string;
  destination?: string;
  tripType?: TripType;
  nonce: number;
}

interface Ctx {
  prefill: Prefill | null;
  startInquiry: (p: Omit<Prefill, "nonce">) => void;
}

const InquiryContext = createContext<Ctx>({ prefill: null, startInquiry: () => undefined });

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const startInquiry = useCallback((p: Omit<Prefill, "nonce">) => {
    setPrefill({ ...p, nonce: Date.now() });
    // Scroll after state has been applied so the form shows the selected route.
    window.setTimeout(() => {
      const el = document.getElementById("book");
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        const first = el.querySelector<HTMLElement>("input, select");
        first?.focus({ preventScroll: true });
      }
    }, 50);
  }, []);
  const value = useMemo(() => ({ prefill, startInquiry }), [prefill, startInquiry]);
  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export const useInquiry = () => useContext(InquiryContext);
