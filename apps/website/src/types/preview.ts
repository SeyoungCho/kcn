export const PREVIEW_REGISTRIES = ["seed", "montage", "t-flavored"] as const;

export type Registry = (typeof PREVIEW_REGISTRIES)[number];

export function isRegistry(value: string | null): value is Registry {
  return PREVIEW_REGISTRIES.includes(value as Registry);
}
