import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@repo/seed/ui/input-group";

export default function InputGroupTextareaDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <InputGroup className="max-w-sm">
        <InputGroupTextarea placeholder="Write a message" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Maximum 500 characters</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
