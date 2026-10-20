import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

// shadcn Switch 에 t-flavored 의 모양을 입혔다 — 50 × 30 길 위의 흰 손잡이.
// 꺼지면 손잡이가 16px 로 작아져 왼쪽(여백 7px)에, 켜지면 24px 로 커져 오른쪽(여백 3px)으로 간다.
// 크기 · 색은 0.2s 에 바뀌고, 옆으로 가는 것은 스프링(살짝 넘쳤다 돌아온다)을 linear() 로 그린다.
// 누르는 동안 길이 한 단계 진해진다(파랑 700 · 회색 400).
type SwitchProps = SwitchPrimitive.Root.Props;

function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `peer relative inline-flex h-7.5 w-12.5 shrink-0 cursor-pointer
        items-center rounded-full outline-none transition-[background-color]
        duration-200 ease-[ease] focus-visible:ring-3 focus-visible:ring-ring/50
        data-checked:bg-primary data-unchecked:bg-input
        active:data-checked:bg-blue-700 active:data-unchecked:bg-grey-400
        data-disabled:pointer-events-none data-disabled:opacity-30`,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={`pointer-events-none ml-1.75 block size-4 rounded-full
          bg-white transition-[width,height,translate]
          duration-[200ms,200ms,580ms]
          ease-[ease,ease,linear(0,0.113_5.3%,0.338_11%,0.568_16.9%,0.753_22.6%,0.883_28.3%,0.962_34.1%,1.005_39.8%,1.025_51%,1.016_63%,1.006_74%,1)]
          data-checked:size-6 data-checked:translate-x-4`}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, type SwitchProps };
