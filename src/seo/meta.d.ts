export const STATIC_PATHS: string[];
export function routePath(slug: string): string;
export interface PageMeta { title: string; description: string; noindex: boolean }
export function getPageMeta(path: string, business: unknown, routes: unknown[]): PageMeta;
export function getBusinessJsonLd(business: unknown, origin?: string): Record<string, unknown>;
export function getBreadcrumbJsonLd(path: string, business: unknown, routes: unknown[], origin?: string): Record<string, unknown> | null;
