import { Button } from "@repo/seed/ui/button";

const variants = [
  ["brandSolid", "Brand solid"],
  ["neutralSolid", "Neutral solid"],
  ["neutralWeak", "Neutral weak"],
  ["criticalSolid", "Critical solid"],
  ["brandOutline", "Brand outline"],
  ["neutralOutline", "Neutral outline"],
  ["ghost", "Ghost"],
] as const;

export default function ButtonVariantsDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div
        className="grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {variants.map(([variant, label]) => (
          <Button key={variant} variant={variant}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
