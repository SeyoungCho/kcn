import { Button } from "@repo/seed/ui/button";

/**
 * Demo: a seed `Button` with an inline-SVG icon as one of its children.
 *
 * This file exists because the simple `<Preview component="Button">Text</Preview>`
 * API only supports plain-text children — anything richer (icons, multiple
 * components, nested layouts) needs to live in a real React file so JSX
 * composition is unrestricted.
 *
 * Reference it from MDX as:
 * ```mdx
 * <Preview registry="seed" demo="button-with-icon" />
 * ```
 *
 * To add another demo, create
 *   apps/website/src/app/preview/seed/demos/<slug>/page.tsx
 * and reference it with `<Preview registry="seed" demo="<slug>" />`.
 */
export default function ButtonWithIconDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Button>
        <HeartIcon />
        Like
      </Button>

      <Button variant="outline">
        <HeartIcon />
        Like
      </Button>

      <Button variant="destructive" size="lg">
        <TrashIcon />
        Delete
      </Button>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
