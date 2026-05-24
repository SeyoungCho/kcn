import { Button } from "@repo/seed/ui/button";

export default function ButtonStatesDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <Button data-hover>Hover</Button>
        <Button data-active>Pressed</Button>
        <Button data-loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button data-disabled variant="neutralOutline">
          Data disabled
        </Button>
        <Button data-focus-visible variant="brandOutline">
          Focus visible
        </Button>
      </div>
    </div>
  );
}
