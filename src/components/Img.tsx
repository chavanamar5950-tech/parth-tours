import { imageManifest } from "@/data/images";

interface Props {
  base: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}

/** Responsive WebP image with explicit aspect ratio so the layout never jumps. */
export default function Img({ base, alt, sizes, className = "", eager = false }: Props) {
  const m = imageManifest[base];
  if (!m) return null;
  const srcSet = m.widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(", ");
  const fallbackW = m.widths[Math.min(1, m.widths.length - 1)];
  const extra = eager ? ({ fetchpriority: "high" } as Record<string, string>) : {};
  return (
    <img
      src={`/images/${base}-${fallbackW}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ aspectRatio: String(m.ratio) }}
      className={className}
      {...extra}
    />
  );
}
