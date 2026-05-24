import { Button } from "@repo/seed/ui/button";
import { Book } from "lucide-react";

const sizes = [
  ["xs", "xs"],
  ["sm", "sm"],
  ["md", "md"],
  ["lg", "lg"],
] as const;

export default function ButtonSizesDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col flex-wrap items-center justify-center gap-3">
        <div
          className="flex flex-row flex-wrap items-center justify-center gap-3"
        >
          {sizes.map(([size, label]) => (
            <Button key={size} size={size}>
              {label}
            </Button>
          ))}
        </div>

        <div
          className="flex flex-row flex-wrap items-center justify-center gap-3"
        >
          {sizes.map(([size]) => (
            <Button
              key={`${size}-icon`}
              aria-label={`${size} icon button`}
              layout="iconOnly"
              size={size}
            >
              <Book />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
