import { Button } from "@repo/seed/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/seed/ui/input-group";
import { Search } from "lucide-react";

export default function InputGroupButtonDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup className="max-w-sm">
        <InputGroupInput placeholder="Search documentation" />
        <InputGroupAddon align="inline-end">
          <Button aria-label="Search" layout="iconOnly" size="xs">
            <Search />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
