import type {
  ImageFrameFloaterProps,
  ImageFrameProps,
  ImageFrameReactionButtonProps,
} from "@repo/seed/ui/image-frame";

export type MDXImageFrameProps = Pick<
  ImageFrameProps,
  "loading" | "srcSet" | "sizes" | "onLoad" | "onError"
> & {
  /** Image URL. */
  src: ImageFrameProps["src"];
  /** Alternative text for the image. */
  alt: ImageFrameProps["alt"];
  /** Width ÷ height.
   * @default 4 / 3
   */
  ratio?: ImageFrameProps["ratio"];
  /** Corner radius — a radius token (`"r2"`, `"full"`) or a CSS value.
   * @default "r2"
   */
  borderRadius?: ImageFrameProps["borderRadius"];
  /** Draws a thin line around the image so white images keep their shape on white backgrounds.
   * @default false
   */
  stroke?: ImageFrameProps["stroke"];
  /** Shown while the image is loading or when it fails (usually `ContentPlaceholder`). */
  fallback?: ImageFrameProps["fallback"];
  /** Content laid over the image — position it with `ImageFrameFloater`. */
  children?: ImageFrameProps["children"];
};

export type MDXImageFramePropsKO = Pick<
  ImageFrameProps,
  "loading" | "srcSet" | "sizes" | "onLoad" | "onError"
> & {
  /** 사진 주소. */
  src: ImageFrameProps["src"];
  /** 사진의 대체 글. */
  alt: ImageFrameProps["alt"];
  /** 폭 ÷ 높이.
   * @default 4 / 3
   */
  ratio?: ImageFrameProps["ratio"];
  /** 모서리 — 모서리 토큰(`"r2"`, `"full"`) 또는 CSS 값.
   * @default "r2"
   */
  borderRadius?: ImageFrameProps["borderRadius"];
  /** 사진 둘레에 가는 선을 그어, 흰 바탕 위의 흰 사진도 모양이 드러나게 합니다.
   * @default false
   */
  stroke?: ImageFrameProps["stroke"];
  /** 사진을 읽는 중이거나 못 읽었을 때 보이는 것(주로 `ContentPlaceholder`). */
  fallback?: ImageFrameProps["fallback"];
  /** 사진 위에 얹을 것 — `ImageFrameFloater` 로 자리를 잡습니다. */
  children?: ImageFrameProps["children"];
};

export type MDXImageFrameFloaterProps = {
  /** Where to place the content over the image. */
  placement: ImageFrameFloaterProps["placement"];
  /** Horizontal inset — a dimension token (`"x1_5"`) or a CSS value.
   * @default "x1_5"
   */
  offsetX?: ImageFrameFloaterProps["offsetX"];
  /** Vertical inset — a dimension token (`"x1_5"`) or a CSS value.
   * @default "x1_5"
   */
  offsetY?: ImageFrameFloaterProps["offsetY"];
  /** Stacking order among floaters. */
  zIndex?: ImageFrameFloaterProps["zIndex"];
};

export type MDXImageFrameFloaterPropsKO = {
  /** 사진 위의 어디에 놓을지. */
  placement: ImageFrameFloaterProps["placement"];
  /** 가로로 들일 거리 — 치수 토큰(`"x1_5"`) 또는 CSS 값.
   * @default "x1_5"
   */
  offsetX?: ImageFrameFloaterProps["offsetX"];
  /** 세로로 들일 거리 — 치수 토큰(`"x1_5"`) 또는 CSS 값.
   * @default "x1_5"
   */
  offsetY?: ImageFrameFloaterProps["offsetY"];
  /** 얹은 것들 사이의 쌓임 순서. */
  zIndex?: ImageFrameFloaterProps["zIndex"];
};

export type MDXImageFrameReactionButtonProps = Pick<
  ImageFrameReactionButtonProps,
  "pressed" | "defaultPressed" | "onPressedChange" | "disabled"
> & {
  /** Accessible name — the button has no visible text. */
  "aria-label": string;
};

export type MDXImageFrameReactionButtonPropsKO = Pick<
  ImageFrameReactionButtonProps,
  "pressed" | "defaultPressed" | "onPressedChange" | "disabled"
> & {
  /** 읽어 주는 이름 — 버튼에 보이는 글자가 없습니다. */
  "aria-label": string;
};
