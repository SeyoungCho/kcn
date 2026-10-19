import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 사용자가 올린 사진을 정해진 비율 · 둥근 모서리 틀에 맞춰 보여 준다. 사진을 못 읽으면(읽는 중 · 실패) fallback 이 보인다.
// 틀 위에 배지 · 아이콘 · 개수 · 좋아요 버튼을 얹을 때는 ImageFrameFloater 로 자리를 잡는다.

type LoadingStatus = "loading" | "loaded" | "error";

/** 사진을 읽는 상태 — 이미 읽혀 있던 사진(캐시)은 그리자마자 알아챈다. */
function useImageLoadingStatus(
  src: string | undefined,
  srcSet: string | undefined,
) {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = React.useState<LoadingStatus>("loading");

  React.useLayoutEffect(() => {
    if (!src && !srcSet) {
      setStatus("error");
      return;
    }
    const image = imageRef.current;
    if (image?.complete)
      setStatus(
        image.naturalWidth > 0 && image.naturalHeight > 0 ? "loaded" : "error",
      );
    else setStatus("loading");
  }, [src, srcSet]);

  return { imageRef, status, setStatus };
}

// 모서리 토큰('r2') 또는 CSS 값
const toRadius = (radius: string | number) => {
  if (typeof radius === "number") return `${radius}px`;
  return /^r\d/.test(radius) || radius === "full"
    ? `var(--radius-${radius})`
    : radius;
};

const imageFrameVariants = cva(
  [
    // 틀 안의 판 — 바깥의 비율 상자를 다 덮는다
    `absolute inset-0 isolate flex size-full items-center justify-center
    overflow-hidden rounded-[inherit]`,
  ],
  {
    variants: {
      /** 사진 둘레의 가는 선 — 흰 바탕 위의 흰 사진도 모양이 드러나게 */
      stroke: {
        true: `after:pointer-events-none after:absolute after:inset-0
        after:rounded-[inherit] after:inset-ring
        after:inset-ring-stroke-neutral-subtle after:content-['']`,
        false: "",
      },
    },
    defaultVariants: { stroke: false },
  },
);

export interface ImageFrameProps
  extends
    Omit<React.ComponentProps<"div">, "children" | "onLoad" | "onError">,
    VariantProps<typeof imageFrameVariants>,
    Pick<
      React.ImgHTMLAttributes<HTMLImageElement>,
      | "loading"
      | "decoding"
      | "crossOrigin"
      | "referrerPolicy"
      | "sizes"
      | "srcSet"
      | "onLoad"
      | "onError"
    > {
  src: string;
  alt: string;
  /** 폭 ÷ 높이 — 기본 4/3 */
  ratio?: number;
  /** 모서리 — 토큰('r2', 기본) 또는 CSS 값 */
  borderRadius?: string | number;
  /** 사진을 읽는 중이거나 못 읽었을 때 보이는 것(주로 ContentPlaceholder) */
  fallback?: React.ReactNode;
  /** 사진 위에 얹을 것 — ImageFrameFloater 로 자리를 잡는다 */
  children?: React.ReactNode;
}

function ImageFrame({
  ratio = 4 / 3,
  borderRadius = "r2",
  stroke,
  src,
  alt,
  fallback,
  loading,
  decoding,
  crossOrigin,
  referrerPolicy,
  sizes,
  srcSet,
  onLoad,
  onError,
  className,
  style,
  children,
  ...props
}: ImageFrameProps) {
  const { imageRef, status, setStatus } = useImageLoadingStatus(src, srcSet);
  const hasSource = Boolean(src || srcSet);
  return (
    <div
      data-slot="image-frame"
      className={cn(
        `relative overflow-hidden rounded-(--image-frame-radius)
        aspect-(--image-frame-ratio)`,
        className,
      )}
      style={
        {
          "--image-frame-ratio": ratio,
          "--image-frame-radius": toRadius(borderRadius),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        data-slot="image-frame-content"
        data-loading-state={status}
        className={imageFrameVariants({ stroke })}
      >
        <img
          ref={imageRef}
          data-slot="image-frame-image"
          data-loading-state={status}
          src={src || undefined}
          srcSet={srcSet || undefined}
          alt={alt}
          loading={loading}
          decoding={decoding}
          crossOrigin={crossOrigin}
          referrerPolicy={referrerPolicy}
          sizes={sizes}
          hidden={status === "error" || (status !== "loaded" && !hasSource)}
          onLoad={(event) => {
            setStatus("loaded");
            onLoad?.(event);
          }}
          onError={(event) => {
            setStatus("error");
            onError?.(event);
          }}
          className="block size-full rounded-[inherit] object-cover
            [[hidden]]:hidden data-[loading-state=error]:hidden
            not-data-[loading-state=loaded]:pointer-events-none"
        />
        {fallback ? (
          <div
            data-slot="image-frame-fallback"
            data-loading-state={status}
            hidden={status === "loaded"}
            className="absolute inset-0 -z-1 size-full
              data-[loading-state=loaded]:hidden"
          >
            {fallback}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

// ── 사진 위에 얹는 것 ──────────────────────────────────────────────────────────

type Placement =
  | "top-start"
  | "top-center"
  | "top-end"
  | "middle-start"
  | "middle-center"
  | "middle-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

// 가장자리에서 --floater-offset-x · y 만큼 들인다. 가운데는 반만큼 되돌려 한가운데에 놓는다.
const floaterVariants = cva("absolute inline-flex", {
  variants: {
    placement: {
      "top-start": "top-(--floater-offset-y) left-(--floater-offset-x)",
      "top-center": `top-(--floater-offset-y)
      left-[calc(50%+var(--floater-offset-x))] -translate-x-1/2`,
      "top-end": "top-(--floater-offset-y) right-(--floater-offset-x)",
      "middle-start": `top-[calc(50%+var(--floater-offset-y))]
      left-(--floater-offset-x) -translate-y-1/2`,
      "middle-center": `top-[calc(50%+var(--floater-offset-y))]
      left-[calc(50%+var(--floater-offset-x))] -translate-1/2`,
      "middle-end": `top-[calc(50%+var(--floater-offset-y))]
      right-(--floater-offset-x) -translate-y-1/2`,
      "bottom-start": "bottom-(--floater-offset-y) left-(--floater-offset-x)",
      "bottom-center": `bottom-(--floater-offset-y)
      left-[calc(50%+var(--floater-offset-x))] -translate-x-1/2`,
      "bottom-end": "bottom-(--floater-offset-y) right-(--floater-offset-x)",
    },
  },
});

// 치수 토큰('x1_5') 또는 CSS 값
const toOffset = (offset: string | number) => {
  if (typeof offset === "number") return `${offset}px`;
  return /^x\d/.test(offset) ? `var(--dimension-${offset})` : offset;
};

export interface ImageFrameFloaterProps extends React.ComponentProps<"div"> {
  placement: Placement;
  /** 가로로 들일 거리 — 치수 토큰(기본 'x1_5') 또는 CSS 값 */
  offsetX?: string | number;
  /** 세로로 들일 거리 — 치수 토큰(기본 'x1_5') 또는 CSS 값 */
  offsetY?: string | number;
  zIndex?: number;
}

function ImageFrameFloater({
  placement,
  offsetX = "x1_5",
  offsetY = "x1_5",
  zIndex,
  className,
  style,
  ...props
}: ImageFrameFloaterProps) {
  return (
    <div
      data-slot="image-frame-floater"
      className={cn(floaterVariants({ placement }), className)}
      style={
        {
          "--floater-offset-x": toOffset(offsetX),
          "--floater-offset-y": toOffset(offsetY),
          zIndex,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

/** 사진 위의 아이콘 — 흰색으로 그린다. */
function ImageFrameIcon({
  svg,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  svg: React.ReactElement;
}) {
  return (
    <span
      data-slot="image-frame-icon"
      className={cn(
        "inline-flex items-center justify-center text-static-white",
        className,
      )}
      {...props}
    >
      <Icon svg={svg} />
    </span>
  );
}

/** 사진 위의 개수 표시('+9' 같은 것). */
function ImageFrameIndicator({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="image-frame-indicator"
      className={cn(
        `box-border inline-flex items-center justify-center rounded-full
        bg-static-black-alpha-800 px-x1.5 py-x0.5 text-t1 font-medium
        text-static-white`,
        className,
      )}
      {...props}
    />
  );
}

// 하트 — 눌렸을 때는 주황 그러데이션으로 채우고, 아닐 때는 반투명 바탕 위에 흰 테두리로 그린다.
// 사진 위에 놓여 밝게 · 어둡게와 상관없다 — 그러데이션 · 그림자 색은 SEED 원본의 값 그대로(SEED 도 어두울 때 같은 값).
const HEART_FILL =
  "M15.5452 10C11.7873 10 9.25 12.9484 9.25 16.6267C9.25 19.8754 11.1219 22.0952 13.1877 23.969C13.7807 24.5069 14.4438 25.0617 15.095 25.6066C15.5434 25.9817 15.9862 26.3522 16.3967 26.7093C17.4501 27.6257 18.4191 28.557 19.1995 29.5994C19.3886 29.8518 19.6856 30.0003 20.001 30C20.3163 29.9997 20.6131 29.8507 20.8016 29.5979C21.5785 28.5562 22.5453 27.6253 23.598 26.7091C24.0105 26.35 24.4568 25.9766 24.9089 25.5984C25.5573 25.0559 26.2176 24.5035 26.807 23.9693C28.8739 22.096 30.75 19.8761 30.75 16.6267C30.75 12.9484 28.2127 10 24.4548 10C22.6365 10 21.1002 11.0545 20 12.4906C18.8998 11.0545 17.3635 10 15.5452 10Z";
const HEART_OUTLINE =
  "M15.5452 12C13.0342 12 11.25 13.905 11.25 16.6267C11.25 18.9912 12.5659 20.7048 14.5314 22.4876C15.1157 23.0176 15.7038 23.5087 16.3148 24.019C16.7646 24.3946 17.2269 24.7807 17.7093 25.2003C18.4947 25.8835 19.2814 26.6141 19.9988 27.4215C20.7144 26.614 21.5001 25.8836 22.2849 25.2005C22.7714 24.7771 23.2368 24.3885 23.6895 24.0105C24.2967 23.5035 24.8813 23.0154 25.4639 22.4874C27.4317 20.704 28.75 18.9906 28.75 16.6267C28.75 13.905 26.9658 12 24.4548 12C23.069 12 21.747 12.8325 20.8919 14.5189C20.7215 14.8549 20.3768 15.0667 20 15.0667C19.6233 15.0667 19.2785 14.8549 19.1081 14.5189C18.2531 12.8325 16.931 12 15.5452 12ZM9.25 16.6267C9.25 12.9484 11.7873 10 15.5452 10C17.3146 10 18.8683 10.8364 20 12.2306C21.1317 10.8364 22.6854 10 24.4548 10C28.2127 10 30.75 12.9484 30.75 16.6267C30.75 19.8761 28.8739 22.096 26.807 23.9693C26.2176 24.5035 25.5573 25.0559 24.9089 25.5984C24.4568 25.9766 24.0105 26.35 23.598 26.7091C22.5453 27.6253 21.5785 28.5562 20.8016 29.5979C20.6131 29.8507 20.3163 29.9997 20.001 30C19.6856 30.0003 19.3886 29.8518 19.1995 29.5994C18.4191 28.557 17.4501 27.6257 16.3967 26.7093C15.9862 26.3522 15.5434 25.9817 15.095 25.6066C14.4438 25.0617 13.7807 24.5069 13.1877 23.969C11.1219 22.0952 9.25 19.8754 9.25 16.6267Z";

const HEART_ICON = "pointer-events-none absolute inset-0 m-auto size-x6";

function HeartFill() {
  const gradientId = `image-frame-heart-${React.useId().replace(/:/g, "")}`;
  return (
    <svg
      data-slot="image-frame-reaction-icon"
      viewBox="8 9 24 24"
      fill="none"
      aria-hidden="true"
      className={HEART_ICON}
    >
      <path d={HEART_FILL} fill={`url(#${gradientId})`} />
      <defs>
        <linearGradient
          id={gradientId}
          x1="7"
          y1="8.5"
          x2="26.0974"
          y2="10.5391"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9A56" />
          <stop offset="1" stopColor="#FF6600" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeartLine() {
  return (
    <svg
      data-slot="image-frame-reaction-icon"
      viewBox="8 9 24 24"
      fill="none"
      aria-hidden="true"
      className={cn(
        HEART_ICON,
        "text-static-white drop-shadow-[0px_2px_2px_#00000026]",
      )}
    >
      <path d={HEART_FILL} className="fill-static-black-alpha-600" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={HEART_OUTLINE}
        fill="currentColor"
      />
    </svg>
  );
}

export type ImageFrameReactionButtonProps = Omit<
  TogglePrimitive.Props<string>,
  "children"
>;

/** 사진 위의 좋아요(하트) 버튼 — 켜고 끈다. aria-label 을 준다. */
function ImageFrameReactionButton({
  className,
  ref,
  ...props
}: ImageFrameReactionButtonProps) {
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>(ref);
  return (
    <TogglePrimitive
      ref={scaleFeedbackRef}
      data-slot="image-frame-reaction-button"
      render={(renderProps, state) => (
        <button {...renderProps}>
          {state.pressed ? <HeartFill /> : <HeartLine />}
        </button>
      )}
      className={cn(
        scaleFeedbackClassName,
        `relative box-border inline-flex size-x6 cursor-pointer items-center
        justify-center border-none bg-transparent p-0`,
        `pressed:scale-(--feedback-scale)
        [transition:var(--feedback-scale-transition)] focus:outline-none`,
        // 초점 링은 누르는 영역(40px)만큼 넓혀 그린다
        `before:absolute
        before:inset-[calc((var(--dimension-x10)-var(--dimension-x6))/2*-1)]
        before:content-['']`,
        `before:outline-solid before:outline-(length:--dimension-x0_5)
        before:-outline-offset-(--dimension-x0_5) before:outline-transparent`,
        "before:[transition:outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        "focused:before:rounded-r1 focused:before:outline-stroke-focus-ring",
        className,
      )}
      {...props}
    />
  );
}

export {
  ImageFrame,
  ImageFrameFloater,
  ImageFrameIcon,
  ImageFrameIndicator,
  ImageFrameReactionButton,
  imageFrameVariants,
};
