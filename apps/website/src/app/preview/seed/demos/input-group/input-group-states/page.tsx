import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@repo/seed/ui/input-group";

export default function InputGroupStatesDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-[384px] flex-col gap-3">
        <InputGroup>
          <InputGroupInput data-invalid placeholder="Invalid input group" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Invalid</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput disabled placeholder="Disabled input group" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Disabled</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupInput readOnly placeholder="Read only input group" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Read only</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
