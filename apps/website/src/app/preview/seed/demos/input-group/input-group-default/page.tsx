import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/seed/ui/input-group";
import { Mail } from "lucide-react";

export default function InputGroupDefaultDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup className="max-w-[384px]">
        <InputGroupInput placeholder="Enter your email" />
        <InputGroupAddon align="inline-start">
          <Mail />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
