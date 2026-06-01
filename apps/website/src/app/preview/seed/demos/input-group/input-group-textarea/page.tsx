import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@repo/seed/ui/input-group";

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
            <InputGroupText>Maximum 500 characters</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
