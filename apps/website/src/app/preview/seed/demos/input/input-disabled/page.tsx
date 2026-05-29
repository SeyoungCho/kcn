import { Input } from "@repo/seed/ui/input";

export default function InputDisabledDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Input disabled placeholder="내용을 입력하세요..." />
      <Input disabled variant="underline" placeholder="내용을 입력하세요..." />
    </div>
  );
}
