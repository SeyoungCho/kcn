import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";
import { Search } from "lucide-react";

export default function InputGroupSizesDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup size="md">
          <InputGroupInput placeholder="Medium input group" />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText>md</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup size="lg">
          <InputGroupInput placeholder="Large input group" />
          <InputGroupAddon align="inline-start">
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText>lg</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
