import type { AlertProps } from "@repo/montage/ui/alert";

export type MDXAlertProps = {
  /** Status. Tints the background and colors the icon.
   * @default "default"
   */
  variant?: AlertProps["variant"];
};

export type MDXAlertPropsKO = {
  /** 상태. 바탕을 옅게 물들이고 아이콘에 색을 입혀요.
   * @default "default"
   */
  variant?: AlertProps["variant"];
};
