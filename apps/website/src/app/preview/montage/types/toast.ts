import type { ToastData, ToasterProps, toast } from "@repo/montage/ui/toast";

type ToastAddOptions = Parameters<typeof toast.add>[0];

export type MDXToasterProps = {
  /** How many toasts stay visible.
   * @default 3
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
  /** 한 번에 보이는 토스트 수예요.
   * @default 3
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
  /** Message, or the heading when a description is given. */
  title?: ToastAddOptions["title"];
  /** Secondary text under the title. */
  description?: ToastAddOptions["description"];
  /** Draws a colored icon on the left.
   * @remarks `"success" | "warning" | "error"`
   */
  type?: ToastAddOptions["type"];
  /** Auto-close delay in ms; `0` keeps it open. Defaults to the toaster's `timeout`. */
  timeout?: ToastAddOptions["timeout"];
  /** `high` announces the toast to screen readers immediately; use it for errors.
   * @default "low"
   */
  priority?: ToastAddOptions["priority"];
  /** Props for the text action button. Set `children` and `onClick`. */
  actionProps?: ToastAddOptions["actionProps"];
  /** `icon` replaces the type icon (e.g. an image or avatar); `closeButton` adds a close button. */
  data?: ToastData;
  /** Called when the toast starts closing. */
  onClose?: ToastAddOptions["onClose"];
  /** Called after the exit animation. */
  onRemove?: ToastAddOptions["onRemove"];
};

export type MDXToastPropsKO = {
  /** 알림 문구예요. 설명이 있으면 제목이 돼요. */
  title?: ToastAddOptions["title"];
  /** 제목 아래의 보조 문구예요. */
  description?: ToastAddOptions["description"];
  /** 왼쪽에 색 아이콘을 그려요.
   * @remarks `"success" | "warning" | "error"`
   */
  type?: ToastAddOptions["type"];
  /** 저절로 닫히기까지의 시간(ms)이에요. `0` 이면 열어 둬요. 없으면 토스터의 `timeout` 을 써요. */
  timeout?: ToastAddOptions["timeout"];
  /** `high` 면 스크린 리더가 바로 읽어요. 오류에 써요.
   * @default "low"
   */
  priority?: ToastAddOptions["priority"];
  /** 글자 액션 버튼의 props 예요. `children` 과 `onClick` 을 넣어요. */
  actionProps?: ToastAddOptions["actionProps"];
  /** `icon` 은 type 아이콘 대신 둘 요소(그림 · 아바타 등), `closeButton` 은 닫기 버튼을 더해요. */
  data?: ToastData;
  /** 닫히기 시작할 때 불려요. */
  onClose?: ToastAddOptions["onClose"];
  /** 나가는 움직임이 끝난 뒤 불려요. */
  onRemove?: ToastAddOptions["onRemove"];
};
