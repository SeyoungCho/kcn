import type { LayoutProps } from "@repo/seed/ui/layout";

export type MDXLayoutProps = {
  /** How tightly the nested `LayoutContent` is constrained. `"low"`: up to 720px from 768px wide screens. `"medium"`: 720px, then 1040px from 1280px. `"high"`: no limit (dense admin screens with tables).
   * @default "medium"
   */
  density?: LayoutProps["density"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — replaces the rendered element (similar to Radix `asChild`). */
  render?: LayoutProps["render"];
};

export type MDXLayoutPropsKO = {
  /** 안의 `LayoutContent` 폭을 얼마나 묶을지. `"low"`: 768px 이상 화면에서 720px 까지. `"medium"`: 720px, 1280px 부터는 1040px 까지. `"high"`: 묶지 않습니다(표가 많은 관리 화면).
   * @default "medium"
   */
  density?: LayoutProps["density"];
  /** Base UI [render](https://base-ui.com/react/handbook/composition) prop — 그려질 요소를 바꿉니다(Radix 의 `asChild` 와 비슷). */
  render?: LayoutProps["render"];
};
