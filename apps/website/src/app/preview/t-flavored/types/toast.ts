import type { ToastData, ToasterProps, toast } from "@repo/t-flavored/ui/toast";

type ToastAddOptions = Parameters<typeof toast.add>[0];

export type MDXToasterProps = {
  /** Where toasts appear. A toast can override it with `data.position`.
   * @default "bottom"
   */
  position?: ToasterProps["position"];
  /** How many toasts stay visible.
   * @default 1
   */
  limit?: ToasterProps["limit"];
  /** Default auto-close delay in ms.
   * @default 3000
   */
  timeout?: ToasterProps["timeout"];
  /** Manager the toaster listens to. Defaults to the exported `toast`. */
  toastManager?: ToasterProps["toastManager"];
};

export type MDXToasterPropsKO = {
  /** 토스트가 뜨는 자리예요. 토스트마다 `data.position` 으로 바꿀 수 있어요.
   * @default "bottom"
   */
  position?: ToasterProps["position"];
  /** 한 번에 보이는 토스트 수예요.
   * @default 1
   */
  limit?: ToasterProps["limit"];
  /** 저절로 닫히기까지의 기본 시간(ms)이에요.
   * @default 3000
   */
  timeout?: ToasterProps["timeout"];
  /** 토스터가 따르는 관리자예요. 기본은 내보낸 `toast` 예요. */
  toastManager?: ToasterProps["toastManager"];
};

export type MDXToastProps = {
  /** Message text. */
  title?: ToastAddOptions["title"];
  description?: ToastAddOptions["description"];
  /** Draws a colored icon: `success` · `error` · `warning` · `info` · `loading`. */
  type?: ToastAddOptions["type"];
  /** Auto-close delay in ms. Defaults to the toaster's `timeout`. */
  timeout?: ToastAddOptions["timeout"];
  /** `high` announces the toast to screen readers immediately.
   * @default "low"
   */
  priority?: ToastAddOptions["priority"];
  /** Props for the action button. Set `children` and `onClick`. */
  actionProps?: ToastAddOptions["actionProps"];
  /** `{ position: "top" | "bottom" }` overrides the toaster's position for this toast. */
  data?: ToastData;
  /** Called when the toast starts closing. */
  onClose?: ToastAddOptions["onClose"];
  /** Called after the exit animation. */
  onRemove?: ToastAddOptions["onRemove"];
};

export type MDXToastPropsKO = {
  /** 알림 문구예요. */
  title?: ToastAddOptions["title"];
  description?: ToastAddOptions["description"];
  /** 색 아이콘을 그려요: `success` · `error` · `warning` · `info` · `loading`. */
  type?: ToastAddOptions["type"];
  /** 저절로 닫히기까지의 시간(ms)이에요. 없으면 토스터의 `timeout` 을 써요. */
  timeout?: ToastAddOptions["timeout"];
  /** `high` 면 스크린 리더가 바로 읽어요.
   * @default "low"
   */
  priority?: ToastAddOptions["priority"];
  /** 액션 버튼의 props 예요. `children` 과 `onClick` 을 넣어요. */
  actionProps?: ToastAddOptions["actionProps"];
  /** `{ position: "top" | "bottom" }` 으로 이 토스트만 다른 자리에 띄워요. */
  data?: ToastData;
  /** 닫히기 시작할 때 불려요. */
  onClose?: ToastAddOptions["onClose"];
  /** 나가는 움직임이 끝난 뒤 불려요. */
  onRemove?: ToastAddOptions["onRemove"];
};
