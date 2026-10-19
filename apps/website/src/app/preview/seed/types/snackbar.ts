import type {
  CreateSnackbarOptions,
  SnackbarProps,
  SnackbarProviderProps,
} from "@repo/seed/ui/snackbar";

export type MDXSnackbarProps = {
  /** Visual style. `positive` and `critical` add a leading status icon.
   * @default "default"
   */
  variant?: SnackbarProps["variant"];
  /** Text to show. */
  message: SnackbarProps["message"];
  /** Label of the action button. When set, a button appears on the right. */
  actionLabel?: SnackbarProps["actionLabel"];
  /** Called when the action button is pressed. The snackbar closes afterwards. */
  onAction?: SnackbarProps["onAction"];
};

export type MDXSnackbarPropsKO = {
  /** 모양. `positive` · `critical` 은 앞에 상태 아이콘을 붙여요.
   * @default "default"
   */
  variant?: SnackbarProps["variant"];
  /** 보여 줄 글. */
  message: SnackbarProps["message"];
  /** 버튼의 글. 주면 오른쪽에 버튼이 생겨요. */
  actionLabel?: SnackbarProps["actionLabel"];
  /** 버튼을 누르면 불려요. 누르면 스낵바는 닫혀요. */
  onAction?: SnackbarProps["onAction"];
};

export type MDXSnackbarProviderProps = {
  /** Pauses the timer while the pointer is over the snackbar or it has keyboard focus.
   * @default true
   */
  pauseOnInteraction?: SnackbarProviderProps["pauseOnInteraction"];
  /** What happens when a new snackbar arrives while one is showing: `immediate` replaces it, `queued` waits for it to finish.
   * @default "immediate"
   */
  strategy?: SnackbarProviderProps["strategy"];
};

export type MDXSnackbarProviderPropsKO = {
  /** 마우스를 올리거나 키보드 초점이 가면 시간을 멈출지.
   * @default true
   */
  pauseOnInteraction?: SnackbarProviderProps["pauseOnInteraction"];
  /** 떠 있는 동안 새것이 오면 — `immediate` 는 바로 바꾸고, `queued` 는 앞의 것이 끝나길 기다려요.
   * @default "immediate"
   */
  strategy?: SnackbarProviderProps["strategy"];
};

export type MDXCreateSnackbarOptions = {
  /** Renders the snackbar, usually `() => <Snackbar … />`. */
  render: CreateSnackbarOptions["render"];
  /** How long the snackbar stays visible, in ms.
   * @default 4000
   */
  timeout?: CreateSnackbarOptions["timeout"];
  /** How long to wait for the exit animation before removing it, in ms.
   * @default 200
   */
  removeDelay?: CreateSnackbarOptions["removeDelay"];
  /** Called after the snackbar has closed and been removed. */
  onClose?: CreateSnackbarOptions["onClose"];
  /** Overrides the provider's `strategy` for this snackbar only. */
  strategy?: CreateSnackbarOptions["strategy"];
};

export type MDXCreateSnackbarOptionsKO = {
  /** 스낵바로 그릴 것. 보통 `() => <Snackbar … />`. */
  render: CreateSnackbarOptions["render"];
  /** 보여 주는 시간(ms).
   * @default 4000
   */
  timeout?: CreateSnackbarOptions["timeout"];
  /** 사라지는 움직임을 기다렸다가 치우는 시간(ms).
   * @default 200
   */
  removeDelay?: CreateSnackbarOptions["removeDelay"];
  /** 닫히고 치워진 뒤에 불려요. */
  onClose?: CreateSnackbarOptions["onClose"];
  /** 이 스낵바만 다르게 줄 세울 때. 안 주면 `SnackbarProvider` 의 값. */
  strategy?: CreateSnackbarOptions["strategy"];
};
