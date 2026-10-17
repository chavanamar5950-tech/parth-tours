/** Official Parth Tours and Travels logo (transparent PNG/WebP, 1222x1190 source). */
export function BrandLogo({ className = "h-14 w-auto", alt = "Parth Tours and Travels" }: { className?: string; alt?: string }) {
  return (
    <img
      src="/images/logo-320.webp"
      srcSet="/images/logo-320.webp 320w, /images/logo-640.webp 640w"
      sizes="(min-width: 640px) 160px, 96px"
      width={320}
      height={312}
      alt={alt}
      className={className}
      decoding="async"
    />
  );
}
