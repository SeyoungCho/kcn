import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/seed/ui/input-group";
import { Button } from "@repo/seed/ui/button";
import { Mail } from "lucide-react";

export default function InputGroupDefaultDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup className="max-w-[384px]">
        <InputGroupInput placeholder="Enter your email" />
        <InputGroupAddon align="inline-start">
          <Mail />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button variant="neutralOutline" size="sm">
            제출하기
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
