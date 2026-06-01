import { Input } from "@repo/seed/ui/input";

export default function InputDisabledDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Input disabled placeholder="placeholder text" />
      <Input disabled variant="underline" placeholder="placeholder text" />
    </div>
  );
}
