import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@repo/seed/ui/input-group";
import { Button } from "@repo/seed/ui/button";

export default function InputGroupTextareaDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupTextarea placeholder="Write a title and description" />
          <InputGroupAddon align="block-start">
            <InputGroupText>Description</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Write a message" />
          <InputGroupAddon align="block-end">
            <Button variant="neutralSolid" size="sm" className="ml-auto">
              Submit
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
