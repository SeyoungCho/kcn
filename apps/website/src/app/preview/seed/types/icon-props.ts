import type { AffixIconProps } from "@repo/seed/ui/affix-icon";
import type { IconProps } from "@repo/seed/ui/icon";

export type MDXIconProps = {
  /** The icon to draw, passed as an element such as `<IconXmarkLine />`. `Icon` renders that element itself — it adds no wrapper. */
  svg: IconProps["svg"];
  /** A dimension token (`"x4"`), `"full"` (fills the parent), or a number in px. Falls back to the size the parent component sets through `--icon-size`. */
  size?: IconProps["size"];
  /** Any CSS color. Falls back to the parent's `--icon-color`, then the current text color. */
  color?: IconProps["color"];
};

export type MDXIconPropsKO = {
  /** 그릴 아이콘 — `<IconXmarkLine />` 처럼 요소로 줍니다. `Icon` 은 그 요소를 그대로 그리고 감싸는 요소를 만들지 않습니다. */
  svg: IconProps["svg"];
  /** 치수 토큰(`"x4"`), `"full"`(부모만큼), 또는 px 숫자. 주지 않으면 부모 부품이 `--icon-size` 로 정한 크기를 씁니다. */
  size?: IconProps["size"];
  /** CSS 색 값. 주지 않으면 부모의 `--icon-color`, 그것도 없으면 글자 색을 씁니다. */
  color?: IconProps["color"];
};

export type MDXAffixIconProps = {
  /** The icon to draw, passed as an element such as `<IconPlusLine />`. Size, color, and spacing come from the parent component (`--prefix-icon-*` / `--suffix-icon-*`). */
  svg: AffixIconProps["svg"];
};

export type MDXAffixIconPropsKO = {
  /** 그릴 아이콘 — `<IconPlusLine />` 처럼 요소로 줍니다. 크기 · 색 · 여백은 부모 부품이 정합니다(`--prefix-icon-*` / `--suffix-icon-*`). */
  svg: AffixIconProps["svg"];
};
