import type { ContentPlaceholderProps } from "@repo/seed/ui/content-placeholder";

export type MDXContentPlaceholderProps = {
  /** Preset illustration from SEED (`"default"` is the Karrot logo). Without it, a picture icon is shown. */
  type?: ContentPlaceholderProps["type"];
  /** A custom illustration element (`svg`, `img`) that replaces the preset. */
  children?: ContentPlaceholderProps["children"];
};

export type MDXContentPlaceholderPropsKO = {
  /** SEED 의 프리셋 그림(`"default"` 는 당근 로고). 안 주면 사진 아이콘이 보여요. */
  type?: ContentPlaceholderProps["type"];
  /** 프리셋 대신 놓을 그림 요소(`svg` · `img`). */
  children?: ContentPlaceholderProps["children"];
};
