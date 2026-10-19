import * as React from "react";
import { createPortal } from "react-dom";
import IconCheckmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconCheckmarkCircleFill";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";

import { Icon } from "@/components/ui/icon";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 동작(줄 세우기 · 시간 · 멈춤 · 사라짐)은 SEED 의 스낵바(@seed-design/react-snackbar)를 그대로 옮겼다.
// Base UI 의 Toast 는 여러 개를 쌓아 보여 주는 부품이라 '한 번에 하나, 새것이 앞의 것을 밀어낸다'는 이 모양과 맞지 않는다.

type SnackbarStrategy = "immediate" | "queued";

export interface CreateSnackbarOptions {
  /** 보여 주는 시간(ms) @default 4000 */
  timeout?: number;
  /** 사라지는 움직임을 기다렸다가 치우는 시간(ms) @default 200 */
  removeDelay?: number;
  /** 닫히고 치워진 뒤에 부른다 */
  onClose?: () => void;
  /** 스낵바로 그릴 것 */
  render: () => React.ReactNode;
  /** 이 스낵바만 다르게 줄 세울 때 — 안 주면 SnackbarProvider 의 값 */
  strategy?: SnackbarStrategy;
}

// inactive(없음) → active(보이는 중, 시간이 간다) ⇄ persist(올려 두어 멈춤) → dismissing(사라지는 중) → inactive
type SnackbarState = "inactive" | "active" | "persist" | "dismissing";

interface ReducerState {
  state: SnackbarState;
  queue: CreateSnackbarOptions[];
  currentSnackbar: CreateSnackbarOptions | null;
}

type ReducerAction =
  | { type: "PUSH"; option: CreateSnackbarOptions; strategy: SnackbarStrategy }
  | { type: "ACTIVATE_NEXT" }
  | { type: "PAUSE"; pauseOnInteraction: boolean }
  | { type: "RESUME" }
  | { type: "DISMISS" }
  | { type: "REMOVE" };

const initialState: ReducerState = {
  state: "inactive",
  queue: [],
  currentSnackbar: null,
};

function reducer(s: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case "PUSH": {
      const { option, strategy } = action;
      if (strategy === "immediate") {
        // 바로 바꾼다 — 떠 있는 것을 내리고, 기다리던 것들은 버리고 새것만 남긴다.
        switch (s.state) {
          case "inactive":
            return { state: "active", currentSnackbar: option, queue: [] };
          case "dismissing":
            return { ...s, queue: [option] };
          default:
            return { ...s, state: "dismissing", queue: [option] };
        }
      }
      if (s.state === "inactive")
        return { state: "active", currentSnackbar: option, queue: [] };
      return { ...s, queue: [...s.queue, option] };
    }
    case "ACTIVATE_NEXT": {
      if (s.state !== "inactive" || s.queue.length === 0) return s;
      const [first, ...rest] = s.queue;
      return { state: "active", currentSnackbar: first!, queue: rest };
    }
    case "PAUSE":
      return action.pauseOnInteraction && s.state === "active"
        ? { ...s, state: "persist" }
        : s;
    case "RESUME":
      return s.state === "persist" ? { ...s, state: "active" } : s;
    case "DISMISS":
      return s.state === "active" || s.state === "persist"
        ? { ...s, state: "dismissing" }
        : s;
    case "REMOVE":
      return { ...s, state: "inactive", currentSnackbar: null };
    default:
      return s;
  }
}

interface SnackbarContextValue {
  state: SnackbarState;
  visible: boolean;
  queue: CreateSnackbarOptions[];
  currentSnackbar: CreateSnackbarOptions | null;
  create: (options: CreateSnackbarOptions) => void;
  dismiss: () => void;
  pause: () => void;
  resume: () => void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | null>(null);

const useSnackbarContext = () => {
  const context = React.useContext(SnackbarContext);
  if (!context)
    throw new Error("스낵바는 SnackbarProvider 안에서만 쓸 수 있습니다.");
  return context;
};

export interface SnackbarProviderProps {
  children?: React.ReactNode;
  /** 마우스를 올리거나 키보드 초점이 가면 시간을 멈출지 @default true */
  pauseOnInteraction?: boolean;
  /** 떠 있는 동안 새것이 오면 — 'immediate' 는 바로 바꾸고, 'queued' 는 앞의 것이 끝나길 기다린다 @default "immediate" */
  strategy?: SnackbarStrategy;
}

function SnackbarProvider({
  children,
  pauseOnInteraction = true,
  strategy = "immediate",
}: SnackbarProviderProps) {
  const [{ state, queue, currentSnackbar }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );
  const visibleDuration = currentSnackbar?.timeout ?? 4000;
  const removeDelay = currentSnackbar?.removeDelay ?? 200;
  const visible = state === "active" || state === "persist";

  React.useEffect(() => {
    if (state === "inactive") {
      if (queue.length >= 1) dispatch({ type: "ACTIVATE_NEXT" });
      return undefined;
    }
    if (state === "active") {
      // 멈췄다(persist) 돌아오면 시간을 처음부터 다시 잰다.
      const timeout = setTimeout(
        () => dispatch({ type: "DISMISS" }),
        visibleDuration,
      );
      return () => clearTimeout(timeout);
    }
    if (state === "dismissing") {
      const timeout = setTimeout(() => {
        currentSnackbar?.onClose?.();
        dispatch({ type: "REMOVE" });
      }, removeDelay);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [state, queue.length, currentSnackbar, visibleDuration, removeDelay]);

  const events = React.useMemo(
    () => ({
      create: (option: CreateSnackbarOptions) =>
        dispatch({
          type: "PUSH",
          option,
          strategy: option.strategy ?? strategy,
        }),
      dismiss: () => dispatch({ type: "DISMISS" }),
      pause: () => dispatch({ type: "PAUSE", pauseOnInteraction }),
      resume: () => dispatch({ type: "RESUME" }),
    }),
    [strategy, pauseOnInteraction],
  );

  const value = React.useMemo(
    () => ({ state, visible, queue, currentSnackbar, ...events }),
    [state, visible, queue, currentSnackbar, events],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          data-slot="snackbar-region"
          role="region"
          aria-live="polite"
          tabIndex={-1}
          className={cn(
            "fixed z-2147483647 flex flex-col items-center p-x2",
            `right-[env(safe-area-inset-right,0px)]
            bottom-[calc(env(safe-area-inset-bottom,0px)+var(--snackbar-region-offset,0px))]
            left-[env(safe-area-inset-left,0px)]`,
            "transition-[bottom] duration-d4 ease-easing",
            // 비어 있을 때는 뒤의 화면을 누를 수 있게 비켜 준다.
            !currentSnackbar && "pointer-events-none",
          )}
        >
          {currentSnackbar?.render()}
        </div>,
        document.body,
      )}
    </SnackbarContext.Provider>
  );
}

/** 스낵바를 띄우고 내린다 — `create({ timeout, render: () => <Snackbar … /> })`. */
function useSnackbarAdapter() {
  const { visible, create, dismiss } = useSnackbarContext();
  return React.useMemo(
    () => ({
      visible,
      create: (options: CreateSnackbarOptions) =>
        create({
          timeout: options.timeout ?? 4000,
          removeDelay: options.removeDelay ?? 200,
          onClose: options.onClose,
          render: options.render,
          strategy: options.strategy,
        }),
      dismiss,
    }),
    [visible, create, dismiss],
  );
}

function SnackbarActionButton({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { dismiss } = useSnackbarContext();
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <button
      ref={scaleFeedbackRef}
      type="button"
      data-slot="snackbar-action-button"
      className={cn(
        scaleFeedbackClassName,
        `relative box-border inline-flex shrink-0 cursor-pointer items-center
        justify-center border-none bg-transparent text-t4 font-bold
        text-fg-brand normal-case no-underline antialiased`,
        `[transition:var(--feedback-scale-transition)]
        pressed:scale-(--feedback-scale)`,
        // 글자보다 넓은 누르는 자리(높이 44px) — 초점 링도 여기에 그린다.
        `after:absolute after:inset-x-[calc(-1*var(--dimension-x2))]
        after:top-1/2 after:min-h-11 after:transform-[translateY(-50%)]
        after:bg-transparent after:content-['']`,
        `after:outline-(length:--dimension-x0_5)
        after:-outline-offset-(--dimension-x0_5) after:outline-transparent
        after:outline-solid`,
        "after:transition-[outline-color] after:duration-d3 after:ease-easing",
        `focus:outline-none focused:after:rounded-r1
        focused:after:outline-stroke-focus-ring`,
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        // 스낵바의 것(올리면 멈춤 등)으로 번지지 않게 하고, 초점을 놓아 멈춤이 풀리게 한 뒤 닫는다.
        event.stopPropagation();
        event.currentTarget.blur();
        dismiss();
      }}
      {...props}
    />
  );
}

export interface SnackbarProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** @default "default" */
  variant?: "default" | "positive" | "critical";
  /** 보여 줄 글 */
  message: string;
  /** 버튼의 글 — 주면 오른쪽에 버튼이 생긴다 */
  actionLabel?: string;
  /** 버튼을 누르면 부른다(누르면 스낵바는 닫힌다) */
  onAction?: () => void;
}

const PREFIX_ICON = {
  positive: { svg: <IconCheckmarkCircleFill />, color: "var(--fg-positive)" },
  critical: {
    svg: <IconExclamationmarkCircleFill />,
    color: "var(--fg-critical)",
  },
};

function Snackbar({
  variant = "default",
  message,
  actionLabel,
  onAction,
  className,
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
  ...props
}: SnackbarProps) {
  const { state, visible, dismiss, pause, resume } = useSnackbarContext();
  const prefix = variant === "default" ? null : PREFIX_ICON[variant];
  return (
    <div
      data-slot="snackbar"
      data-variant={variant}
      data-open={visible ? "" : undefined}
      role="status"
      aria-atomic="true"
      // 사라지는 중인 것은 화면 낭독기가 다시 읽지 않게 숨긴다.
      aria-hidden={state === "dismissing" ? true : undefined}
      tabIndex={0}
      className={cn(
        `pointer-events-auto relative box-border flex min-h-11 w-full max-w-116
        items-center rounded-r2 bg-bg-neutral-solid p-x2.5`,
        `data-open:animate-[seed-enter_var(--motion-duration-d3)_var(--motion-ease-enter)]
        [--seed-enter-opacity:0] [--seed-enter-scale:0.8]`,
        `not-data-open:animate-[seed-exit_var(--motion-duration-d2)_var(--motion-ease-exit)_forwards]
        [--seed-exit-opacity:0] [--seed-exit-scale:0.8]`,
        "transition-[outline-color] duration-d3 ease-easing",
        `outline-(length:--dimension-x0_5) outline-offset-(--dimension-x0_5)
        outline-transparent outline-solid focused:outline-stroke-focus-ring`,
        className,
      )}
      onFocus={(event) => {
        onFocus?.(event);
        // 키보드로 온 초점일 때만 멈춘다(마우스로 누른 것은 올려 둔 것으로 이미 멈춰 있다).
        if (event.target.matches(":focus-visible")) pause();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        resume();
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        pause();
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        resume();
      }}
      {...props}
    >
      {prefix ? (
        <Icon
          svg={prefix.svg}
          size={24}
          color={prefix.color}
          data-slot="snackbar-prefix-icon"
          className="pr-x0.5"
        />
      ) : null}
      <div
        data-slot="snackbar-content"
        className="flex grow items-center justify-between gap-x2.5 px-x1.5"
      >
        <span
          data-slot="snackbar-message"
          className="m-0 text-t4 font-regular text-fg-on-neutral-solid"
        >
          {message}
        </span>
        {actionLabel ? (
          <SnackbarActionButton onClick={onAction}>
            {actionLabel}
          </SnackbarActionButton>
        ) : null}
      </div>
      <button
        type="button"
        data-slot="snackbar-close-button"
        className="sr-only"
        onClick={dismiss}
      >
        닫기
      </button>
    </div>
  );
}

export { Snackbar, SnackbarProvider, useSnackbarAdapter };
