import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";

export default function InputGroupVariantsDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupInput placeholder="Outline input group" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Outline</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup variant="underline">
          <InputGroupInput placeholder="Underline input group" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Underline</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
