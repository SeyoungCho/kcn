import { Button } from "@repo/seed/ui/button";
import { Heart, PlusCircle, Trash } from "lucide-react";

export default function ButtonWithIconDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Button>
        <Heart />
        Like
      </Button>

      <Button variant="neutralOutline">
        <PlusCircle />
        Add
      </Button>

      <Button variant="criticalSolid">
        <Trash />
        Delete
      </Button>
    </div>
  );
}
