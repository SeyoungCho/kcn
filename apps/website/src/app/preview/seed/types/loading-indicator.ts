import type { LoadingIndicatorProps } from "@repo/seed/ui/loading-indicator";

export type MDXLoadingIndicatorProps = {
  /** Content kept in place but hidden while loading, so the parent's width does not change. */
  children?: LoadingIndicatorProps["children"];
  /** What to draw over the content. Defaults to a `ProgressCircle` whose size and colors come from the parent. */
  indicator?: LoadingIndicatorProps["indicator"];
};

export type MDXLoadingIndicatorPropsKO = {
  /** 처리 중에는 자리는 그대로 두고 안 보이게만 하는 내용(부모의 폭이 바뀌지 않게). */
  children?: LoadingIndicatorProps["children"];
  /** 내용 위에 겹쳐 그릴 것. 기본은 부모가 크기 · 색을 정하는 `ProgressCircle`. */
  indicator?: LoadingIndicatorProps["indicator"];
};
