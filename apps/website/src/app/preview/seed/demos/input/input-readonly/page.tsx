import { Input } from "@repo/seed/ui/input";

export default function InputReadOnlyDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 p-8">
      <Input readOnly placeholder="내용을 입력하세요..." />
      <Input readOnly variant="underline" placeholder="내용을 입력하세요..." />
    </div>
  );
}
