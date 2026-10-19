import type * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// 동그라미로 자르는 마스크 — SEED 와 같은 그림을 써야 가장자리의 픽셀까지 같다(rounded-full 만으로는 다르게 그려진다).
const CIRCLE_MASK =
  'url(\'data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="white"/></svg>\')';

// 둘째 겹(빈 그림)은 배지 자리를 파내는 SEED 의 마스크다. 배지는 옮기지 않았지만 겹의 수가 같아야 가장자리 픽셀이 원본과 같게 그려진다.
const EMPTY_MASK = "url('data:image/svg+xml;utf8,<svg />')";

const MASKED =
  "[mask-image:var(--avatar-mask)] mask-[100%_100%,0px_0px] mask-position-[0_0,0px_0px] mask-no-repeat mask-subtract transform-[translateZ(0)]";

const avatarVariants = cva(
  [
    `relative isolate box-border inline-flex items-center justify-center
    rounded-full align-top`,
    // 둘레의 가는 선 — 사진 위에 얹는다
    `after:pointer-events-none after:absolute after:inset-0 after:rounded-full
    after:inset-ring after:inset-ring-stroke-neutral-subtle after:content-['']`,
    `after:[mask-image:var(--avatar-mask)] after:mask-[100%_100%,0px_0px]
    after:mask-position-[0_0,0px_0px] after:mask-no-repeat after:mask-subtract
    after:transform-[translateZ(0)]`,
  ],
  {
    variants: {
      size: {
        20: "size-5",
        24: "size-6",
        36: "size-9",
        42: "size-10.5",
        48: "size-12",
        56: "size-14",
        64: "size-16",
        80: "size-20",
        96: "size-24",
        108: "size-27",
      },
    },
    defaultVariants: { size: 48 },
  },
);

type AvatarSize = 20 | 24 | 36 | 42 | 48 | 56 | 64 | 80 | 96 | 108;

export interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  /** 지름(px) — 숫자로도 글자('42')로도 준다 */
  size?: AvatarSize | `${AvatarSize}`;
  src?: string;
  alt?: string;
  /** 사진이 없거나 아직 못 읽었을 때 보이는 것 */
  fallback?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}

function Avatar({
  className,
  style,
  size = 48,
  src,
  alt,
  fallback,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        avatarVariants({ size: Number(size) as AvatarSize }),
        className,
      )}
      style={
        {
          "--avatar-mask": `${CIRCLE_MASK}, ${EMPTY_MASK}`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          `absolute inset-0 -z-1 flex size-full items-center justify-center
          overflow-hidden rounded-full object-cover`,
          MASKED,
        )}
      >
        {fallback}
      </AvatarPrimitive.Fallback>
      {src ? (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          src={src}
          alt={alt}
          className={cn("block size-full overflow-hidden object-cover", MASKED)}
        />
      ) : null}
    </AvatarPrimitive.Root>
  );
}

export { Avatar, avatarVariants };
