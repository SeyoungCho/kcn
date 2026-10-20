import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Avatar 에 montage 의 모양을 입혔다.
//   size — sm · default · lg · xl · 2xl (24 · 32 · 40 · 48 · 56px). sm · default · lg 는 shadcn 과 같은 크기다.
//   variant — default 는 사람(동그라미, 사진을 꽉 채운다), logo 는 회사 · 기관(둥근 네모, 로고가 다 보이게 담는다).
//   ::before 는 둘레의 가는 선, ::after 는 누름 막이다. 둘 다 사진 위에 얹는다.
// render 로 <button> · <a> 를 그리면 누를 수 있는 아바타가 된다 — 둘레 8px 까지 옅은 막이 깔리고 초점 링도 그 둘레에 그린다.
// 글자 · 아이콘(AvatarFallback 의 자식)은 지름의 2/3 크기다. 맞는 글자 눈금이 없어 값으로 적는다.
const avatarVariants = cva(
  `group/avatar relative isolate inline-flex shrink-0 items-center
  justify-center bg-bg-neutral-primary align-middle leading-none outline-none
  select-none before:pointer-events-none before:absolute before:inset-0
  before:z-1 before:rounded-[inherit] before:inset-ring
  before:inset-ring-line-neutral-tertiary after:pointer-events-none
  after:absolute after:-inset-2 after:z-1 after:bg-fg-neutral-primary
  after:opacity-0 after:transition-opacity after:duration-150
  focus-visible:outline-2 focus-visible:outline-offset-8
  focus-visible:outline-ring focus-visible:outline-solid
  disabled:pointer-events-none aria-expanded:after:opacity-12
  [&:is(button,a)]:cursor-pointer [&:is(button,a)]:hover:after:opacity-5
  [&:is(button,a)]:active:after:opacity-12`,
  {
    variants: {
      variant: {
        default: "rounded-full after:rounded-full",
        logo: `rounded-(--avatar-radius)
        after:rounded-[calc(var(--avatar-radius)+8px)]`,
      },
      size: {
        sm: "size-6 text-[16px] [--avatar-radius:var(--radius-8)]",
        default: "size-8 text-[21.4px] [--avatar-radius:var(--radius-10)]",
        lg: "size-10 text-[26.7px] [--avatar-radius:var(--radius-12)]",
        xl: "size-12 text-[32px] [--avatar-radius:var(--radius-14)]",
        "2xl": "size-14 text-[37.4px] [--avatar-radius:var(--radius-16)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants>;

function Avatar({
  className,
  variant = "default",
  size = "default",
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-variant={variant}
      data-size={size}
      className={cn(avatarVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        `size-full rounded-[inherit] object-cover
        group-data-[variant=logo]/avatar:object-contain`,
        className,
      )}
      {...props}
    />
  );
}

// 자식이 없으면 사람(logo 는 건물) 실루엣을 그린다.
// 실루엣은 회색 면을 그 모양대로 비우고 아바타 바탕에 흰빛을 28% 섞은 색으로 칠한 것이라, 한 색(color-mix)으로 칠한다.
function AvatarFallback({
  className,
  children,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        `flex size-full items-center justify-center overflow-hidden
        rounded-[inherit] bg-surface-neutral-strong text-white
        [&_svg:not([class*='size-'])]:size-2/3`,
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg
          data-slot="avatar-placeholder"
          aria-hidden
          viewBox="-6 -6 36 36"
          className="size-full
            fill-[color-mix(in_srgb,var(--bg-neutral-primary),white_28%)]"
        >
          <g className="group-data-[variant=logo]/avatar:hidden">
            <circle cx="12" cy="7.25" r="4.4" />
            <path d="M12 13.6c-4.95 0-8.9 2-8.9 5.4v.6c0 1 .8 1.8 1.8 1.8h14.2c1 0 1.8-.8 1.8-1.8V19c0-3.4-3.95-5.4-8.9-5.4Z" />
          </g>
          <path
            className="hidden group-data-[variant=logo]/avatar:block"
            fillRule="evenodd"
            d="M6.4 2h5.8c2.2 0 3.2 0 3.2 3.2v4.1l3.3.5c2.9.5 2.9 1.1 2.9 4.4v3.6c0 4.2 0 4.2-4.2 4.2H6.6c-4.2 0-4.2 0-4.2-4.2V6c0-4 0-4 4-4Zm.6 4.1a.9.9 0 0 0 0 1.8h4a.9.9 0 0 0 0-1.8H7Zm0 4a.9.9 0 0 0 0 1.8h4a.9.9 0 0 0 0-1.8H7Z"
          />
        </svg>
      )}
    </AvatarPrimitive.Fallback>
  );
}

// 오른쪽 위의 알림 점. 점의 가운데가 아바타의 둘레 위에 오고(동그라미는 45° 자리), 바탕색 테두리로 아바타와 떼어 놓는다.
// 둘레 자리는 지름에 비례하는 값을 px 로 반올림해 적는다 — 점이 픽셀 사이에 걸려 흐려지지 않게.
// 점의 크기는 아바타 크기를 따른다.
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        `absolute top-[round(14.65%,1px)] right-[round(14.65%,1px)] z-2 size-1
        translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-brand-primary
        ring-[0.5px] ring-bg-neutral-primary group-data-[size=2xl]/avatar:size-2
        group-data-[size=2xl]/avatar:ring-1 group-data-[size=lg]/avatar:size-1.5
        group-data-[size=lg]/avatar:ring-1 group-data-[size=xl]/avatar:size-1.5
        group-data-[size=xl]/avatar:ring-1
        group-data-[variant=logo]/avatar:top-[round(7.33%_+_0.59px,1px)]
        group-data-[variant=logo]/avatar:right-[round(7.33%_+_0.59px,1px)]`,
        className,
      )}
      {...props}
    />
  );
}

// 겹쳐 놓은 아바타 묶음. 앞의 아바타가 뒤의 것을 덮도록 자식을 거꾸로 그리고 flex-row-reverse 로 다시 뒤집는다.
// 아바타마다 바탕색 테두리를 둘러 겹친 자리를 떼어 놓는다. 겹치는 폭은 sm 아바타끼리면 좁다.
function AvatarGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        `group/avatar-group flex w-fit flex-row-reverse items-center justify-end
        *:data-[slot=avatar]:ring-[1.5px]
        *:data-[slot=avatar]:ring-bg-neutral-primary
        *:data-[slot=avatar]:not-last:-ms-2
        has-[>[data-size=sm]]:*:data-[slot=avatar]:not-last:-ms-1.5`,
        className,
      )}
      {...props}
    >
      {React.Children.toArray(children).reverse()}
    </div>
  );
}

// 묶음 뒤에 붙는 글자("외 3명" 같은 남은 수).
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(
        `ms-2.5 shrink-0 text-label1 font-medium text-fg-neutral-secondary
        group-has-[>[data-size=sm]]/avatar-group:ms-2`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
  avatarVariants,
  type AvatarProps,
};
