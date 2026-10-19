import * as React from "react";
import IconArrowClockwiseCircularFill from "@karrotmarket/react-monochrome-icon/IconArrowClockwiseCircularFill";
import IconArrowUpBracketDownFill from "@karrotmarket/react-monochrome-icon/IconArrowUpBracketDownFill";
import IconCameraFill from "@karrotmarket/react-monochrome-icon/IconCameraFill";
import IconExclamationmarkCircleFill from "@karrotmarket/react-monochrome-icon/IconExclamationmarkCircleFill";
import IconPaperclipFill from "@karrotmarket/react-monochrome-icon/IconPaperclipFill";
import IconXmarkFill from "@karrotmarket/react-monochrome-icon/IconXmarkFill";
import { cva } from "class-variance-authority";

import { ActionButton } from "@/components/ui/action-button";
import { PrefixIcon } from "@/components/ui/affix-icon";
import {
  Field,
  FieldDescription,
  FieldErrorMessage,
  FieldFooter,
  FieldHeader,
  FieldIndicatorText,
  FieldLabel,
  FieldRequiredIndicator,
  useFieldContext,
  useMergedRef,
} from "@/components/ui/field";
import type { FieldLabelProps } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { useScaleFeedback } from "@/lib/use-scale-feedback";
import { cn } from "@/lib/utils";

// 첨부 칸 — 파일을 골라(또는 끌어다 놓아) 항목으로 쌓는다. 항목마다 상태(pending · uploading · success · error)가 있다.
// 올리기는 부품이 하지 않는다: 새로 받은 파일은 onFileAccept 로 알리고, 바깥이 updateFileEntryStatus 로 상태를 넘긴다.
//   AttachmentField        — <input type="file"> 로 고르는 칸(AttachmentInput · AttachmentDropzone 을 안에 놓는다)
//   AttachmentDisplayField — 고르는 창을 바깥(앱의 사진 고르기 등)이 열고, 고른 것(썸네일 주소)을 addEntries 로 넣는 칸

/** 칸 안의 버튼 · 안내 글 — AttachmentField · AttachmentDisplayField 의 labels 로 바꾼다 */
export interface AttachmentFieldLabels {
  /** 고르는 버튼의 글 · 이름 */
  selectFile: string;
  /** 끌어 놓는 칸의 안내 글 */
  dropFile: string;
  /** 올리기에 실패한 항목의 다시 하기 버튼 */
  retry: string;
  /** 항목 지우기 버튼의 이름 */
  removeFile: string;
}

const DEFAULT_LABELS: AttachmentFieldLabels = {
  selectFile: "파일 선택",
  dropFile: "또는 여기로 드래그해서 업로드",
  retry: "재시도",
  removeFile: "파일 제거",
};

const AttachmentLabelsContext =
  React.createContext<AttachmentFieldLabels>(DEFAULT_LABELS);

const useAttachmentLabels = () => React.useContext(AttachmentLabelsContext);

export type AttachmentStatusDetails =
  | { status: "pending" }
  | { status: "uploading"; progress?: number }
  | { status: "success" }
  | { status: "error" };

export type AttachmentInputFileStatusDetails = AttachmentStatusDetails;
export type AttachmentInputFileEntry = {
  id: string;
  file: File;
} & AttachmentStatusDetails;
export type AttachmentDisplayItemStatusDetails = AttachmentStatusDetails;
export type AttachmentDisplayItemEntry = {
  id: string;
  thumbnailUrl: string;
} & AttachmentStatusDetails;

/** 받지 않은 까닭 — validate 로 고유한 코드를 더할 수 있다 */
export type AttachmentFileError =
  | "FILE_TOO_LARGE"
  | "FILE_TOO_SMALL"
  | "TOO_MANY_FILES"
  | "INVALID_TYPE"
  | (string & {});

export interface AttachmentFileRejection {
  file: File;
  errors: AttachmentFileError[];
}

type UpdateStatus = (id: string, details: AttachmentStatusDetails) => void;

const flag = (on: boolean | undefined) => (on ? ("" as const) : undefined);

/** 1536 → '1.5 KB' */
function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  return `${Number.parseFloat((bytes / 1024 ** exponent).toFixed(1))} ${units[exponent]}`;
}

// ── 파일 종류 ──────────────────────────────────────────────────────────────────

const IMAGE_EXTENSIONS = new Set([
  "apng",
  "avif",
  "bmp",
  "gif",
  "heic",
  "heics",
  "heif",
  "heifs",
  "ico",
  "jfif",
  "jp2",
  "jpe",
  "jpeg",
  "jpg",
  "jxl",
  "png",
  "svg",
  "svgz",
  "tif",
  "tiff",
  "webp",
]);

const toPatterns = (accept: string | string[]) =>
  (Array.isArray(accept) ? accept : accept.split(","))
    .map((pattern) => pattern.trim())
    .filter(Boolean);

const isImagePattern = (pattern: string) =>
  pattern.startsWith("image/") ||
  (pattern.startsWith(".") &&
    IMAGE_EXTENSIONS.has(pattern.slice(1).toLowerCase()));

/** 받는 종류가 모두 그림이면 'image' — 항목을 썸네일 칸으로 그린다. */
const getAcceptType = (accept: string | string[] | undefined) =>
  accept && toPatterns(accept).every(isImagePattern) ? "image" : undefined;

const matchesAccept = (file: File, accept: string | string[] | undefined) =>
  !accept ||
  toPatterns(accept).some((pattern) => {
    if (pattern.startsWith("."))
      return file.name.toLowerCase().endsWith(pattern.toLowerCase());
    if (pattern.includes("*"))
      return file.type.startsWith(`${pattern.split("/")[0]}/`);
    return file.type === pattern;
  });

// ── 항목 목록(값) ─────────────────────────────────────────────────────────────

/** 항목 목록 — 바깥이 쥐면(entries) 그것을, 아니면 안에서 쥔다. 한 박자 안에 여러 번 고쳐도 앞의 고침 위에 쌓인다. */
function useEntries<T>(
  value: T[] | undefined,
  defaultValue: T[] | undefined,
  onChange: ((next: T[]) => void) | undefined,
) {
  const [inner, setInner] = React.useState<T[]>(defaultValue ?? []);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const latest = React.useRef(current);
  latest.current = current;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const update = React.useCallback(
    (updater: (previous: T[]) => T[]) => {
      const next = updater(latest.current);
      if (next === latest.current) return;
      latest.current = next;
      if (!controlled) setInner(next);
      onChangeRef.current?.(next);
    },
    [controlled],
  );
  return [current, update] as const;
}

// ── 공통 모양 ─────────────────────────────────────────────────────────────────

// 항목 오른쪽 위의 지우기 버튼 자리를 동그랗게 파낸다(항목의 테두리 · 사진 · 덮개가 같은 마스크를 쓴다).
const ITEM_MASK = `linear-gradient(black, black), url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="white"/></svg>')`;
const MASKED = cn(
  "[mask-image:var(--attachment-item-mask)] mask-no-repeat mask-subtract transform-[translateZ(0)]",
  "[mask-size:100%_100%,var(--remove-button-mask-size)_var(--remove-button-mask-size)]",
  "mask-[0_0,right_calc(0px-var(--remove-button-mask-offset))_top_calc(0px-var(--remove-button-mask-offset))]",
);

// 칸을 바깥 여백까지 늘이는 거리(--attachment-input-extend-x) — 목록이 화면 끝까지 밀리게 할 때 틀에 준다.
const INPUT_ROOT =
  "relative flex flex-col gap-x2 -mx-(--attachment-input-extend-x,0px)";
const CONTAINER =
  "-mt-x1 flex gap-x2 overflow-x-auto pt-x1 px-(--attachment-input-extend-x,0px)";
const ITEM_GROUP = "m-0 flex list-none gap-x2 p-0";

const TRIGGER = cn(
  "box-border flex size-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-x1 rounded-r3 border-none bg-transparent p-0 [font:inherit]",
  "inset-ring inset-ring-stroke-neutral-weak",
  "not-data-disabled:pressed:scale-(--feedback-scale) not-data-disabled:engaged:bg-bg-transparent-pressed data-disabled:cursor-not-allowed",
  "[transition:background-color_0.2s,var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
  "outline-solid outline-(length:--dimension-x0_5) -outline-offset-(--dimension-x0_5) outline-transparent focused:outline-stroke-focus-ring",
);
const TRIGGER_ICON =
  "shrink-0 [--icon-color:var(--fg-neutral-subtle)] [--icon-size:var(--dimension-x6)] data-disabled:[--icon-color:var(--fg-disabled)]";

const itemVariants = cva(
  [
    "relative isolate flex h-20 items-center justify-center gap-x2.5 rounded-r3",
    `[--remove-button-mask-offset:var(--dimension-x1_5)]
    [--remove-button-mask-size:var(--dimension-x6)]`,
    `outline-solid outline-(length:--dimension-x0_5)
    outline-offset-(--dimension-x0_5) outline-transparent
    focused:outline-stroke-focus-ring`,
    `before:pointer-events-none before:absolute before:inset-0
    before:rounded-[inherit] before:content-['']`,
    // 테두리(::before)도 같은 마스크로 파낸다
    `before:[mask-image:var(--attachment-item-mask)] before:mask-no-repeat
    before:mask-subtract before:transform-[translateZ(0)]`,
    "before:[mask-size:100%_100%,var(--remove-button-mask-size)_var(--remove-button-mask-size)]",
    "before:mask-[0_0,right_calc(0px-var(--remove-button-mask-offset))_top_calc(0px-var(--remove-button-mask-offset))]",
  ],
  {
    variants: {
      type: {
        general: `w-40 px-x4 [transition:var(--feedback-scale-transition)]
        before:inset-ring before:inset-ring-stroke-neutral-weak`,
        image: `w-20 [transition:opacity_0.2s,var(--feedback-scale-transition)]
        before:z-1 before:inset-ring before:inset-ring-stroke-neutral-subtle
        data-readonly:opacity-50`,
      },
    },
    defaultVariants: { type: "general" },
  },
);

type ItemType = "general" | "image";

const ACTION_BUTTON: Record<ItemType, string> = {
  general: "text-fg-neutral-subtle [--icon-color:var(--fg-neutral-subtle)]",
  image: "text-static-white [--icon-color:var(--palette-static-white)]",
};

/** 덮개(올리는 중 · 실패) — 상태가 맞을 때만 그린다. */
function AttachmentItemBackdrop({
  type,
  children,
}: {
  type: ItemType;
  children: React.ReactNode;
}) {
  return (
    <div
      data-slot="attachment-item-backdrop"
      className={cn(
        `absolute inset-0 flex flex-col items-center justify-center
        rounded-[inherit]`,
        MASKED,
        type === "image" && "bg-bg-overlay",
      )}
    >
      {children}
    </div>
  );
}

function AttachmentItemRetryButton({
  type,
  onClick,
}: {
  type: ItemType;
  onClick: () => void;
}) {
  const labels = useAttachmentLabels();
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <button
      ref={scaleFeedbackRef}
      type="button"
      data-slot="attachment-item-retry"
      onClick={onClick}
      className={cn(
        scaleFeedbackClassName,
        `m-0 flex size-full cursor-pointer flex-col items-center justify-center
        gap-x1 rounded-[inherit] border-none bg-transparent p-0 text-center
        font-[inherit]`,
        "text-t2 font-medium [--icon-size:var(--dimension-x6)]",
        `not-data-disabled:pressed:scale-(--feedback-scale)
        [transition:var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]`,
        `outline-solid outline-(length:--dimension-x0_5)
        -outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
        ACTION_BUTTON[type],
      )}
    >
      <Icon svg={<IconArrowClockwiseCircularFill />} />
      {labels.retry}
    </button>
  );
}

function AttachmentItemRemoveButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  const labels = useAttachmentLabels();
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  return (
    <button
      ref={scaleFeedbackRef}
      type="button"
      data-slot="attachment-item-remove"
      aria-label={labels.removeFile}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        scaleFeedbackClassName,
        `absolute -top-x1 -right-x1 m-0 flex size-x5 cursor-pointer items-center
        justify-center rounded-full border-none bg-bg-layer-default p-0`,
        `inset-ring inset-ring-stroke-neutral-weak
        [--icon-color:var(--fg-neutral)] [--icon-size:var(--dimension-x2_5)]`,
        `not-data-disabled:pressed:scale-(--feedback-scale)
        not-data-disabled:engaged:bg-bg-layer-default-pressed`,
        `data-disabled:cursor-not-allowed
        data-disabled:[--icon-color:var(--fg-disabled)]`,
        "[transition:background-color_0.2s,var(--feedback-scale-transition),outline-color_var(--motion-duration-d3)_var(--motion-ease-easing)]",
        `outline-solid outline-(length:--dimension-x0_5)
        -outline-offset-(--dimension-x0_5) outline-transparent
        focused:outline-stroke-focus-ring`,
      )}
    >
      <Icon svg={<IconXmarkFill />} />
    </button>
  );
}

function AttachmentItemProgress({
  type,
  entry,
}: {
  type: ItemType;
  entry: AttachmentStatusDetails;
}) {
  return (
    <ProgressCircle
      size="24"
      tone={type === "image" ? "staticWhite" : "neutral"}
      {...(entry.status === "uploading" &&
        entry.progress !== undefined && { value: entry.progress })}
    />
  );
}

/** 이름이 두 줄을 넘으면 가운데를 줄인다 — 확장자(뒤의 end 글자)는 늘 남긴다. */
function useMiddleTruncate(text: string, end: number, maxLines: number) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = React.useState(text);

  React.useLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return undefined;

    const fit = () => {
      const style = getComputedStyle(parent);
      const width = Math.floor(
        parent.clientWidth -
          (Number.parseFloat(style.paddingLeft) || 0) -
          (Number.parseFloat(style.paddingRight) || 0),
      );
      if (!text || width <= 0) {
        setShown(text);
        return;
      }
      const probe = document.createElement("span");
      probe.style.cssText = [
        "position:absolute",
        "visibility:hidden",
        "pointer-events:none",
        "display:block",
        `width:${width}px`,
        `font:${style.font}`,
        `letter-spacing:${style.letterSpacing}`,
        `line-height:${style.lineHeight}`,
        "word-break:break-all",
        "white-space:nowrap",
      ].join(";");
      probe.textContent = text;
      document.body.append(probe);
      const limit = probe.scrollHeight * maxLines + 1;
      probe.style.whiteSpace = "normal";
      const fits = (candidate: string) => {
        probe.textContent = candidate;
        return probe.scrollHeight <= limit;
      };

      // 가장 많이 남길 수 있는 길이를 반씩 좁혀 찾는다.
      const longest = (max: number, build: (length: number) => string) => {
        let [low, high] = [0, max];
        while (low <= high) {
          const middle = Math.floor((low + high) / 2);
          if (fits(build(middle))) low = middle + 1;
          else high = middle - 1;
        }
        return Math.max(high, 0);
      };

      if (fits(text)) setShown(text);
      else {
        const keep = Math.min(end, text.length);
        const tail = keep > 0 ? text.slice(-keep) : "";
        const head = keep > 0 ? text.slice(0, -keep) : text;
        if (!fits(`…${tail}`)) {
          const length = longest(
            tail.length,
            (count) => `…${count > 0 ? tail.slice(-count) : ""}`,
          );
          setShown(`…${length > 0 ? tail.slice(-length) : ""}`);
        } else {
          const length = longest(
            head.length,
            (count) => `${head.slice(0, count)}…${tail}`,
          );
          setShown(`${head.slice(0, length)}…${tail}`);
        }
      }
      probe.remove();
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [text, end, maxLines]);

  return { ref, shown };
}

function AttachmentItemName({
  name,
  readOnly,
}: {
  name: string;
  readOnly: boolean;
}) {
  const dot = name.lastIndexOf(".");
  const extension = dot > 0 ? name.slice(dot) : "";
  const { ref, shown } = useMiddleTruncate(name, extension.length, 2);
  return (
    <span
      data-slot="attachment-item-name"
      data-readonly={flag(readOnly)}
      className="overflow-hidden text-t2 font-medium break-all text-fg-neutral
        data-readonly:text-fg-disabled"
    >
      <span ref={ref} className="break-all">
        {shown}
      </span>
    </span>
  );
}

function AttachmentLabelsProvider({
  labels,
  children,
}: {
  labels: Partial<AttachmentFieldLabels> | undefined;
  children: React.ReactNode;
}) {
  const { selectFile, dropFile, retry, removeFile } = labels ?? {};
  const value = React.useMemo(
    () => ({
      selectFile: selectFile ?? DEFAULT_LABELS.selectFile,
      dropFile: dropFile ?? DEFAULT_LABELS.dropFile,
      retry: retry ?? DEFAULT_LABELS.retry,
      removeFile: removeFile ?? DEFAULT_LABELS.removeFile,
    }),
    [selectFile, dropFile, retry, removeFile],
  );
  return (
    <AttachmentLabelsContext value={value}>{children}</AttachmentLabelsContext>
  );
}

// ── AttachmentField ───────────────────────────────────────────────────────────

interface AttachmentInputContextValue {
  acceptedFileEntries: AttachmentInputFileEntry[];
  /** 받는 종류가 모두 그림이면 'image' */
  acceptType: "image" | undefined;
  maxFiles: number;
  currentFileEntryCount: number;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  required: boolean;
  /** 파일을 끌어 칸 위에 올려 둔 동안 */
  dragging: boolean;
  openFilePicker: () => void;
  /** 고른 파일을 따져 받는다 — 받은 것은 onFileAccept, 못 받은 것은 onFileReject 로 알린다 */
  setFileEntries: (files: File[]) => void;
  updateFileEntryStatus: UpdateStatus;
  removeFileEntry: (id: string) => void;
  clearFileEntries: () => void;
  reorderFileEntry: (fromIndex: number, toIndex: number) => void;
  /** 고르는 버튼에 붙인다 — 직접 만든 버튼(ActionButton 등)으로 파일 고르기를 열 때 */
  triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref: React.Ref<HTMLButtonElement>;
  } & Record<`data-${string}`, "" | undefined>;
  dropzoneRef: React.RefObject<HTMLDivElement | null>;
  dropzoneProps: React.HTMLAttributes<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  hiddenInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  stateProps: {
    "data-disabled"?: "";
    "data-readonly"?: "";
    "data-invalid"?: "";
    "data-dragging-over"?: "";
  };
}

const AttachmentInputContext =
  React.createContext<AttachmentInputContextValue | null>(null);

function useAttachmentInputContext() {
  const context = React.useContext(AttachmentInputContext);
  if (!context)
    throw new Error(
      "AttachmentInput · AttachmentDropzone · AttachmentInputItem 은 AttachmentField 안에서 쓴다.",
    );
  return context;
}

export interface AttachmentInputOptions {
  /** 받을 종류 — MIME('image/png' · 'image/*') 또는 확장자('.pdf'). 배열이면 쉼표로 잇는다 */
  accept?: string | string[];
  /** 최대 개수 — 기본 1. 다 차면 고르는 버튼이 꺼진다 */
  maxFiles?: number;
  /** 최대 크기(바이트) */
  maxFileSize?: number;
  /** 최소 크기(바이트) */
  minFileSize?: number;
  /** 파일마다 더 따질 것 — 못 받는 까닭(코드)의 배열이나 null 을 돌려준다 */
  validate?: (file: File) => AttachmentFileError[] | null;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  /** 읽기 전용 — 고르기 · 지우기를 막고 값은 폼으로 보낸다 */
  readOnly?: boolean;
  /** 받은 항목 — 주면 바깥이 쥔다 */
  acceptedFileEntries?: AttachmentInputFileEntry[];
  defaultAcceptedFileEntries?: AttachmentInputFileEntry[];
  onAcceptedFileEntriesChange?: (entries: AttachmentInputFileEntry[]) => void;
  /** 새로 받은 항목 — 여기서 올리기를 시작하고 updateFileEntryStatus 로 상태를 넘긴다 */
  onFileAccept?: (
    entries: AttachmentInputFileEntry[],
    helpers: { updateFileEntryStatus: UpdateStatus },
  ) => void;
  onFileReject?: (rejections: AttachmentFileRejection[]) => void;
  /** 끌어 놓을 칸 밖에 파일을 떨어뜨렸을 때 브라우저가 그 파일을 여는 것을 막는다 — 기본 켬 */
  preventDocumentDrop?: boolean;
}

function useAttachmentInput({
  accept,
  maxFiles = 1,
  maxFileSize = Number.POSITIVE_INFINITY,
  minFileSize = 0,
  validate,
  name,
  disabled = false,
  required = false,
  invalid = false,
  readOnly = false,
  acceptedFileEntries: entriesProp,
  defaultAcceptedFileEntries,
  onAcceptedFileEntriesChange,
  onFileAccept,
  onFileReject,
  preventDocumentDrop = true,
}: AttachmentInputOptions): AttachmentInputContextValue {
  const [entries, setEntries] = useEntries(
    entriesProp,
    defaultAcceptedFileEntries,
    onAcceptedFileEntriesChange,
  );
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const dropzoneRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const idCounterRef = React.useRef(0);

  const multiple = maxFiles > 1;
  const triggerDisabled = disabled || readOnly || entries.length >= maxFiles;
  const acceptType = getAcceptType(accept);

  const updateFileEntryStatus = React.useCallback<UpdateStatus>(
    (id, details) =>
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === id ? { ...entry, ...details } : entry,
        ),
      ),
    [setEntries],
  );

  const setFileEntries = (files: File[]) => {
    if (disabled || readOnly) return;
    const accepted: AttachmentInputFileEntry[] = [];
    const rejected: AttachmentFileRejection[] = [];
    for (const file of files) {
      const errors: AttachmentFileError[] = [];
      if (entries.length + accepted.length >= maxFiles)
        errors.push("TOO_MANY_FILES");
      if (!matchesAccept(file, accept)) errors.push("INVALID_TYPE");
      if (file.size > maxFileSize) errors.push("FILE_TOO_LARGE");
      if (file.size < minFileSize) errors.push("FILE_TOO_SMALL");
      errors.push(...(validate?.(file) ?? []));
      if (errors.length > 0) rejected.push({ file, errors });
      else
        accepted.push({
          id: `file-${Date.now()}-${(idCounterRef.current += 1)}`,
          file,
          status: "pending",
        });
    }
    if (accepted.length > 0) {
      const added = multiple ? accepted : accepted.slice(0, 1);
      setEntries((previous) => (multiple ? [...previous, ...added] : added));
      onFileAccept?.(added, { updateFileEntryStatus });
    }
    if (rejected.length > 0) onFileReject?.(rejected);
  };

  const openFilePicker = () => {
    if (triggerDisabled || !inputRef.current) return;
    // 같은 파일을 다시 골라도 change 가 일어나게 비운다
    inputRef.current.value = "";
    inputRef.current.click();
  };

  // 받은 파일을 숨은 input 에도 실어 둔다 — 폼으로 보낼 때 같이 간다.
  React.useEffect(() => {
    const input = inputRef.current;
    if (!input || typeof DataTransfer === "undefined") return;
    const transfer = new DataTransfer();
    for (const entry of entries) transfer.items.add(entry.file);
    input.files = transfer.files;
  }, [entries]);

  React.useEffect(() => {
    if (!preventDocumentDrop || disabled) return undefined;
    const onDragOver = (event: DragEvent) => {
      if (dropzoneRef.current) event.preventDefault();
    };
    const onDrop = (event: DragEvent) => {
      if (
        dropzoneRef.current &&
        !dropzoneRef.current.contains(event.target as Node | null)
      )
        event.preventDefault();
    };
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  }, [preventDocumentDrop, disabled]);

  const stateProps = {
    "data-disabled": flag(triggerDisabled),
    "data-readonly": flag(readOnly),
    "data-invalid": flag(invalid),
    "data-dragging-over": flag(dragging),
  };

  const onDragActive = (event: React.DragEvent<HTMLDivElement>) => {
    if (triggerDisabled) return;
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  return {
    acceptedFileEntries: entries,
    acceptType,
    maxFiles,
    currentFileEntryCount: entries.length,
    disabled,
    readOnly,
    invalid,
    required,
    dragging,
    openFilePicker,
    setFileEntries,
    updateFileEntryStatus,
    removeFileEntry: (id) => {
      if (!readOnly)
        setEntries((previous) => previous.filter((entry) => entry.id !== id));
    },
    clearFileEntries: () => {
      if (!readOnly) setEntries(() => []);
    },
    reorderFileEntry: (fromIndex, toIndex) => {
      if (disabled || readOnly) return;
      setEntries((previous) => {
        if (
          fromIndex < 0 ||
          fromIndex >= previous.length ||
          toIndex < 0 ||
          toIndex >= previous.length
        )
          return previous;
        const next = [...previous];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved!);
        return next;
      });
    },
    triggerProps: {
      ...stateProps,
      ref: triggerRef,
      type: "button",
      disabled: triggerDisabled,
      onClick: openFilePicker,
    },
    dropzoneRef,
    dropzoneProps: {
      onDragOver: onDragActive,
      onDragEnter: onDragActive,
      onDragLeave: (event) => {
        if (triggerDisabled) return;
        event.preventDefault();
        event.stopPropagation();
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setDragging(false);
      },
      onDrop: (event) => {
        if (disabled) return;
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) setFileEntries(Array.from(files));
      },
    },
    inputRef,
    hiddenInputProps: {
      type: "file",
      name,
      accept: Array.isArray(accept) ? accept.join(",") : accept,
      multiple,
      disabled,
      "aria-required": required || undefined,
      // 읽어 주는 기기에는 고르는 버튼 · 끌어 놓을 칸을 쓰게 하고 이 input 은 감춘다.
      "aria-hidden": true,
      tabIndex: -1,
      onChange: (event) => {
        const { files } = event.currentTarget;
        if (files) setFileEntries(Array.from(files));
        event.currentTarget.value = "";
      },
    },
    stateProps,
  };
}

export interface AttachmentFieldProps
  extends
    AttachmentInputOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  label?: React.ReactNode;
  /** 이름표의 굵기 — 기본 medium */
  labelWeight?: FieldLabelProps["weight"];
  /** 이름표 옆의 보조 글('선택' 같은 것) */
  indicator?: React.ReactNode;
  description?: React.ReactNode;
  /** invalid 일 때만 보인다 */
  errorMessage?: React.ReactNode;
  showRequiredIndicator?: boolean;
  /** AttachmentInput · AttachmentDropzone */
  children?: React.ReactNode;
  /** 숨은 <input type="file"> 에 붙는 것 */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /** 틀(Field) 요소 */
  fieldRef?: React.Ref<HTMLDivElement>;
  /** 틀(Field)에 붙는 것 — 칸을 바깥 여백까지 늘이려면 style 로 --attachment-input-extend-x 를 준다 */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;
  /** 숨은 <input type="file"> */
  ref?: React.Ref<HTMLInputElement>;
  /** 칸 안의 버튼 · 안내 글 — 준 것만 바꾼다(기본 한국어) */
  labels?: Partial<AttachmentFieldLabels>;
}

/** 파일을 고르는 칸 — 이름표 · 설명 · 오류까지. 안에 AttachmentInput(누르는 칸) 또는 AttachmentDropzone(끌어 놓는 칸)을 놓는다. */
function AttachmentField({
  label,
  labelWeight,
  indicator,
  description,
  errorMessage,
  showRequiredIndicator,
  children,
  inputProps,
  fieldRef,
  rootProps,
  ref,
  accept,
  maxFiles,
  maxFileSize,
  minFileSize,
  validate,
  name,
  disabled,
  required,
  invalid,
  readOnly,
  acceptedFileEntries,
  defaultAcceptedFileEntries,
  onAcceptedFileEntriesChange,
  onFileAccept,
  onFileReject,
  preventDocumentDrop,
  labels,
  className,
  ...props
}: AttachmentFieldProps) {
  const field = useAttachmentInput({
    accept,
    maxFiles,
    maxFileSize,
    minFileSize,
    validate,
    name,
    disabled,
    required,
    invalid,
    readOnly,
    acceptedFileEntries,
    defaultAcceptedFileEntries,
    onAcceptedFileEntriesChange,
    onFileAccept,
    onFileReject,
    preventDocumentDrop,
  });
  const inputRef = useMergedRef(field.inputRef, ref);
  const showError = !!errorMessage && !!invalid;

  return (
    <AttachmentInputContext value={field}>
      <AttachmentLabelsProvider labels={labels}>
        <Field
          {...rootProps}
          ref={fieldRef}
          required={required}
          disabled={disabled}
          invalid={invalid}
          readOnly={readOnly}
          name={name}
        >
          {label || indicator ? (
            <FieldHeader>
              <FieldLabel weight={labelWeight}>
                {label}
                {showRequiredIndicator ? <FieldRequiredIndicator /> : null}
                {indicator ? (
                  <FieldIndicatorText>{indicator}</FieldIndicatorText>
                ) : null}
              </FieldLabel>
            </FieldHeader>
          ) : null}
          <div
            data-slot="attachment-input"
            {...field.stateProps}
            className={cn(INPUT_ROOT, className)}
            {...props}
          >
            <AttachmentFocusTarget />
            {children}
            <input
              ref={inputRef}
              data-slot="attachment-input-hidden-input"
              {...field.hiddenInputProps}
              {...inputProps}
              className="sr-only"
            />
          </div>
          {description || showError ? (
            <FieldFooter>
              {/* 오류가 보이는 동안 설명은 화면에서만 감춘다(읽어 주는 기기에는 남긴다). */}
              {description ? (
                <FieldDescription className={showError ? "sr-only" : undefined}>
                  {description}
                </FieldDescription>
              ) : null}
              {showError ? (
                <FieldErrorMessage>
                  <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
                  {errorMessage}
                </FieldErrorMessage>
              ) : null}
            </FieldFooter>
          ) : null}
        </Field>
      </AttachmentLabelsProvider>
    </AttachmentInputContext>
  );
}

/** 이름표를 누르면 고르는 버튼에 초점을 준다(파일 고르기 창은 열지 않는다). */
function AttachmentFocusTarget() {
  const field = useFieldContext();
  const { triggerProps } = useAttachmentInputContext();
  const triggerRef =
    triggerProps.ref as React.RefObject<HTMLButtonElement | null>;
  const focusControlRef = field?.focusControlRef;
  React.useEffect(() => {
    if (!focusControlRef) return undefined;
    const focus = () => triggerRef.current?.focus();
    focusControlRef.current = focus;
    return () => {
      if (focusControlRef.current === focus) focusControlRef.current = null;
    };
  }, [focusControlRef, triggerRef]);
  return null;
}

/** 지금 몇 개 / 최대 몇 개 */
function TriggerItemCount({
  current,
  max,
  disabled,
}: {
  current: number;
  max: number;
  disabled: boolean;
}) {
  return (
    <div data-slot="attachment-trigger-count" className="text-t2">
      <span
        data-empty={flag(current === 0)}
        data-disabled={flag(disabled)}
        className="text-t2 font-regular text-fg-neutral
          data-disabled:text-fg-disabled
          [&[data-empty]:not([data-disabled])]:text-fg-neutral-subtle"
      >
        {current}
      </span>
      <span
        data-disabled={flag(disabled)}
        className="text-t2 font-regular text-fg-neutral-subtle
          data-disabled:text-fg-disabled"
      >
        /{max}
      </span>
    </div>
  );
}

type FileEntriesRender = (
  context: AttachmentInputContextValue,
) => React.ReactNode;

export interface AttachmentInputProps {
  /** 항목을 직접 그릴 때 — ({ acceptedFileEntries }) => … . 안 주면 AttachmentInputItem 으로 그린다 */
  children?: FileEntriesRender;
  /** 실패한 항목의 '재시도'를 눌렀을 때. 주면 실패한 항목에 재시도 버튼이 나온다(children 을 줄 때는 항목에 직접 준다) */
  onRetry?: (
    entry: AttachmentInputFileEntry,
    helpers: { updateFileEntryStatus: UpdateStatus },
  ) => void;
  ref?: React.Ref<HTMLDivElement>;
}

function renderFileEntries(
  context: AttachmentInputContextValue,
  children: FileEntriesRender | undefined,
  onRetry: AttachmentInputProps["onRetry"],
) {
  if (children) return children(context);
  return context.acceptedFileEntries.map((entry) => (
    <AttachmentInputItem
      key={entry.id}
      fileEntry={entry}
      {...(onRetry && {
        onRetry: () =>
          onRetry(entry, {
            updateFileEntryStatus: context.updateFileEntryStatus,
          }),
      })}
    />
  ));
}

/** 누르는 칸(80×80, 지금 개수 / 최대 개수) 옆으로 항목을 늘어놓는다. 넘치면 옆으로 민다. */
function AttachmentInput({ children, onRetry, ref }: AttachmentInputProps) {
  const context = useAttachmentInputContext();
  const labels = useAttachmentLabels();
  const { ref: triggerRef, ...triggerProps } = context.triggerProps;
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>(triggerRef);
  const triggerDisabled = !!triggerProps.disabled;
  return (
    <div
      ref={ref}
      data-slot="attachment-input-container"
      {...context.stateProps}
      className={CONTAINER}
    >
      <button
        ref={scaleFeedbackRef}
        data-slot="attachment-input-trigger"
        aria-label={labels.selectFile}
        {...triggerProps}
        className={cn(scaleFeedbackClassName, TRIGGER)}
      >
        <Icon
          svg={
            context.acceptType === "image" ? (
              <IconCameraFill />
            ) : (
              <IconPaperclipFill />
            )
          }
          data-slot="attachment-input-trigger-icon"
          data-disabled={flag(triggerDisabled)}
          className={TRIGGER_ICON}
        />
        <TriggerItemCount
          current={context.currentFileEntryCount}
          max={context.maxFiles}
          disabled={triggerDisabled}
        />
      </button>
      <ul
        data-slot="attachment-input-item-group"
        {...context.stateProps}
        className={ITEM_GROUP}
      >
        {renderFileEntries(context, children, onRetry)}
      </ul>
    </div>
  );
}

export type AttachmentDropzoneProps = Omit<AttachmentInputProps, "ref">;

/** 끌어 놓는 칸(점선 상자, '파일 선택' 버튼) 아래로 항목을 늘어놓는다. */
function AttachmentDropzone({ children, onRetry }: AttachmentDropzoneProps) {
  const context = useAttachmentInputContext();
  const labels = useAttachmentLabels();
  return (
    <>
      <div
        ref={context.dropzoneRef}
        data-slot="attachment-dropzone"
        {...context.stateProps}
        {...context.dropzoneProps}
        className={cn(
          `mx-(--attachment-input-extend-x,0px) flex h-30 flex-col items-center
          justify-center gap-x2 rounded-r3 px-x4`,
          `border border-dashed border-gray-500 [transition:border-color_0.2s]
          data-dragging-over:border-solid
          data-dragging-over:border-stroke-neutral-solid`,
          "data-disabled:cursor-not-allowed",
        )}
      >
        <ActionButton
          variant="neutralWeak"
          size="small"
          layout="withText"
          {...context.triggerProps}
        >
          <PrefixIcon svg={<IconArrowUpBracketDownFill />} />
          {labels.selectFile}
        </ActionButton>
        {/* 칸이 꺼져도 안내 글의 색은 그대로 둔다(SEED 와 같다) */}
        <div
          data-slot="attachment-dropzone-label"
          className="text-center text-t4 leading-(--font-size-t4) font-medium
            text-fg-neutral-subtle"
        >
          {labels.dropFile}
        </div>
      </div>
      <div
        data-slot="attachment-input-container"
        {...context.stateProps}
        className={CONTAINER}
      >
        <ul
          data-slot="attachment-input-item-group"
          {...context.stateProps}
          className={ITEM_GROUP}
        >
          {renderFileEntries(context, children, onRetry)}
        </ul>
      </div>
    </>
  );
}

export interface AttachmentInputItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  "children"
> {
  fileEntry: AttachmentInputFileEntry;
  /** 주면 실패(error)한 항목에 재시도 버튼이 나온다 */
  onRetry?: () => void;
  ref?: React.Ref<HTMLLIElement>;
}

/** 받은 파일 하나 — 그림이면 썸네일(80×80), 아니면 이름 · 크기(160 폭). 오른쪽 위에 지우기 버튼. */
function AttachmentInputItem({
  fileEntry,
  onRetry,
  className,
  style,
  ref,
  ...props
}: AttachmentInputItemProps) {
  const { acceptType, readOnly, stateProps, removeFileEntry } =
    useAttachmentInputContext();
  const type: ItemType = acceptType === "image" ? "image" : "general";
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLLIElement>(ref);

  // 그림이면 파일로 임시 주소를 만들어 썸네일로 쓴다.
  const [imageSrc, setImageSrc] = React.useState<string>();
  React.useEffect(() => {
    if (type !== "image") return undefined;
    const url = URL.createObjectURL(fileEntry.file);
    setImageSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [fileEntry.file, type]);

  const retrying = fileEntry.status === "error" && !!onRetry;
  const overlaid = fileEntry.status === "uploading" || retrying;

  return (
    <li
      ref={scaleFeedbackRef}
      data-slot="attachment-input-item"
      data-status={fileEntry.status}
      {...stateProps}
      className={cn(scaleFeedbackClassName, itemVariants({ type }), className)}
      style={
        { "--attachment-item-mask": ITEM_MASK, ...style } as React.CSSProperties
      }
      {...props}
    >
      {type === "image" ? (
        imageSrc ? (
          <img
            data-slot="attachment-item-image"
            src={imageSrc}
            alt={fileEntry.file.name}
            className={cn("size-full rounded-[inherit] object-cover", MASKED)}
          />
        ) : null
      ) : (
        <>
          <div
            data-slot="attachment-item-thumbnail"
            data-readonly={flag(readOnly)}
            hidden={overlaid}
            className={cn(
              `flex size-x12 shrink-0 items-center justify-center rounded-r2
                bg-bg-neutral-weak [[hidden]]:hidden`,
              `[--icon-color:var(--fg-neutral-subtle)]
                [--icon-size:var(--dimension-x6)]
                data-readonly:[--icon-color:var(--fg-disabled)]`,
            )}
          >
            <Icon svg={<IconPaperclipFill />} />
          </div>
          <div
            data-slot="attachment-item-metadata"
            hidden={overlaid}
            className="flex w-full grow flex-col [[hidden]]:hidden"
          >
            <AttachmentItemName
              name={fileEntry.file.name}
              readOnly={readOnly}
            />
            <span
              data-slot="attachment-item-size"
              data-readonly={flag(readOnly)}
              className="text-t1 font-regular text-fg-neutral-subtle
                data-readonly:text-fg-disabled"
            >
              {formatBytes(fileEntry.file.size)}
            </span>
          </div>
        </>
      )}
      {fileEntry.status === "uploading" ? (
        <AttachmentItemBackdrop type={type}>
          <AttachmentItemProgress type={type} entry={fileEntry} />
        </AttachmentItemBackdrop>
      ) : null}
      {retrying ? (
        <AttachmentItemBackdrop type={type}>
          <AttachmentItemRetryButton type={type} onClick={onRetry} />
        </AttachmentItemBackdrop>
      ) : null}
      <AttachmentItemRemoveButton
        disabled={readOnly}
        onClick={() => removeFileEntry(fileEntry.id)}
      />
    </li>
  );
}

// ── AttachmentDisplayField ────────────────────────────────────────────────────

interface AttachmentDisplayContextValue {
  entries: AttachmentDisplayItemEntry[];
  maxEntries: number;
  currentEntryCount: number;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  /** 바깥(사진 고르기 등)에서 고른 것을 넣는다 — 최대 개수를 넘는 것은 버린다 */
  addEntries: (entries: AttachmentDisplayItemEntry[]) => void;
  updateEntryStatus: UpdateStatus;
  removeEntry: (id: string) => void;
  clearEntries: () => void;
  reorderEntry: (fromIndex: number, toIndex: number) => void;
  stateProps: {
    "data-disabled"?: "";
    "data-readonly"?: "";
    "data-invalid"?: "";
  };
}

const AttachmentDisplayContext =
  React.createContext<AttachmentDisplayContextValue | null>(null);

function useAttachmentDisplayContext() {
  const context = React.useContext(AttachmentDisplayContext);
  if (!context)
    throw new Error(
      "AttachmentDisplay · AttachmentDisplayItem 은 AttachmentDisplayField 안에서 쓴다.",
    );
  return context;
}

export interface AttachmentDisplayFieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** 항목 — 주면 바깥이 쥔다 */
  entries?: AttachmentDisplayItemEntry[];
  defaultEntries?: AttachmentDisplayItemEntry[];
  onEntriesChange?: (entries: AttachmentDisplayItemEntry[]) => void;
  /** 최대 개수 — 기본 1. 다 차면 고르는 버튼이 꺼진다 */
  maxEntries?: number;
  disabled?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  label?: React.ReactNode;
  labelWeight?: FieldLabelProps["weight"];
  indicator?: React.ReactNode;
  description?: React.ReactNode;
  /** invalid 일 때만 보인다 */
  errorMessage?: React.ReactNode;
  showRequiredIndicator?: boolean;
  /** AttachmentDisplay */
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  /** 칸 안의 버튼 · 안내 글 — 준 것만 바꾼다(기본 한국어) */
  labels?: Partial<AttachmentFieldLabels>;
}

/** 바깥이 고른 사진을 보여 주는 칸 — 이름표 · 설명 · 오류까지. 안에 AttachmentDisplay 를 놓는다. */
function AttachmentDisplayField({
  entries: entriesProp,
  defaultEntries,
  onEntriesChange,
  maxEntries = 1,
  disabled = false,
  invalid = false,
  readOnly = false,
  label,
  labelWeight,
  indicator,
  description,
  errorMessage,
  showRequiredIndicator,
  children,
  labels,
  ...props
}: AttachmentDisplayFieldProps) {
  const [entries, setEntries] = useEntries(
    entriesProp,
    defaultEntries,
    onEntriesChange,
  );
  const triggerDisabled = disabled || readOnly || entries.length >= maxEntries;
  const stateProps = {
    "data-disabled": flag(triggerDisabled),
    "data-readonly": flag(readOnly),
    "data-invalid": flag(invalid),
  };

  const updateEntryStatus = React.useCallback<UpdateStatus>(
    // 앞 상태의 progress 같은 값이 남지 않게 상태는 통째로 바꾼다.
    (id, details) =>
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === id
            ? { id: entry.id, thumbnailUrl: entry.thumbnailUrl, ...details }
            : entry,
        ),
      ),
    [setEntries],
  );

  const context: AttachmentDisplayContextValue = {
    entries,
    maxEntries,
    currentEntryCount: entries.length,
    disabled,
    readOnly,
    invalid,
    addEntries: (incoming) => {
      if (disabled || readOnly || incoming.length === 0) return;
      setEntries((previous) =>
        maxEntries > 1
          ? [
              ...previous,
              ...incoming.slice(0, Math.max(maxEntries - previous.length, 0)),
            ]
          : incoming.slice(0, 1),
      );
    },
    updateEntryStatus,
    removeEntry: (id) => {
      if (!readOnly)
        setEntries((previous) => previous.filter((entry) => entry.id !== id));
    },
    clearEntries: () => {
      if (!readOnly) setEntries(() => []);
    },
    reorderEntry: (fromIndex, toIndex) => {
      if (disabled || readOnly || fromIndex === toIndex) return;
      setEntries((previous) => {
        if (
          fromIndex < 0 ||
          fromIndex >= previous.length ||
          toIndex < 0 ||
          toIndex >= previous.length
        )
          return previous;
        const next = [...previous];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved!);
        return next;
      });
    },
    stateProps,
  };
  const showError = !!errorMessage && invalid;

  return (
    <AttachmentDisplayContext value={context}>
      <AttachmentLabelsProvider labels={labels}>
        <Field
          disabled={disabled}
          invalid={invalid}
          readOnly={readOnly}
          {...props}
        >
          {label || indicator ? (
            <FieldHeader>
              <FieldLabel weight={labelWeight}>
                {label}
                {showRequiredIndicator ? <FieldRequiredIndicator /> : null}
                {indicator ? (
                  <FieldIndicatorText>{indicator}</FieldIndicatorText>
                ) : null}
              </FieldLabel>
            </FieldHeader>
          ) : null}
          <div
            data-slot="attachment-input"
            {...stateProps}
            className={INPUT_ROOT}
          >
            {children}
          </div>
          {description || showError ? (
            <FieldFooter>
              {description ? (
                <FieldDescription className={showError ? "sr-only" : undefined}>
                  {description}
                </FieldDescription>
              ) : null}
              {showError ? (
                <FieldErrorMessage>
                  <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
                  {errorMessage}
                </FieldErrorMessage>
              ) : null}
            </FieldFooter>
          ) : null}
        </Field>
      </AttachmentLabelsProvider>
    </AttachmentDisplayContext>
  );
}

type DisplayHelpers = Pick<
  AttachmentDisplayContextValue,
  "addEntries" | "updateEntryStatus"
>;

export interface AttachmentDisplayProps {
  /** 누르는 칸을 눌렀을 때 — 바깥의 고르는 창을 열고, 고른 것을 addEntries 로 넣는다 */
  onTriggerClick: (helpers: DisplayHelpers) => void;
  /** 항목을 직접 그릴 때 — ({ entries }) => … . 안 주면 AttachmentDisplayItem 으로 그린다 */
  children?: (context: AttachmentDisplayContextValue) => React.ReactNode;
  /** 실패한 항목의 '재시도'를 눌렀을 때 */
  onRetry?: (
    entry: AttachmentDisplayItemEntry,
    helpers: Pick<AttachmentDisplayContextValue, "updateEntryStatus">,
  ) => void;
  ref?: React.Ref<HTMLDivElement>;
}

/** 누르는 칸(카메라) 옆으로 사진 항목을 늘어놓는다. */
function AttachmentDisplay({
  onTriggerClick,
  children,
  onRetry,
  ref,
}: AttachmentDisplayProps) {
  const context = useAttachmentDisplayContext();
  const field = useFieldContext();
  const labels = useAttachmentLabels();
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLButtonElement>();
  const triggerDisabled =
    context.disabled ||
    context.readOnly ||
    context.currentEntryCount >= context.maxEntries;
  const { addEntries, updateEntryStatus } = context;

  // 이름표를 누르면 누르는 칸에 초점을 준다.
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const mergedTriggerRef = useMergedRef(triggerRef, scaleFeedbackRef);
  const focusControlRef = field?.focusControlRef;
  React.useEffect(() => {
    if (!focusControlRef) return undefined;
    const focus = () => triggerRef.current?.focus();
    focusControlRef.current = focus;
    return () => {
      if (focusControlRef.current === focus) focusControlRef.current = null;
    };
  }, [focusControlRef]);

  return (
    <div
      ref={ref}
      data-slot="attachment-input-container"
      {...context.stateProps}
      className={CONTAINER}
    >
      <button
        ref={mergedTriggerRef}
        type="button"
        data-slot="attachment-input-trigger"
        aria-label={labels.selectFile}
        aria-describedby={field?.describedBy}
        aria-invalid={context.invalid || undefined}
        disabled={triggerDisabled}
        {...context.stateProps}
        onClick={() => onTriggerClick({ addEntries, updateEntryStatus })}
        className={cn(scaleFeedbackClassName, TRIGGER)}
      >
        <Icon
          svg={<IconCameraFill />}
          data-slot="attachment-input-trigger-icon"
          data-disabled={flag(triggerDisabled)}
          className={TRIGGER_ICON}
        />
        <TriggerItemCount
          current={context.currentEntryCount}
          max={context.maxEntries}
          disabled={triggerDisabled}
        />
      </button>
      <ul
        data-slot="attachment-input-item-group"
        {...context.stateProps}
        className={ITEM_GROUP}
      >
        {children
          ? children(context)
          : context.entries.map((entry) => (
              <AttachmentDisplayItem
                key={entry.id}
                entry={entry}
                {...(onRetry && {
                  onRetry: () => onRetry(entry, { updateEntryStatus }),
                })}
              />
            ))}
      </ul>
    </div>
  );
}

export interface AttachmentDisplayItemProps extends Omit<
  React.LiHTMLAttributes<HTMLLIElement>,
  "children"
> {
  entry: AttachmentDisplayItemEntry;
  /** 주면 실패(error)한 항목에 재시도 버튼이 나온다 */
  onRetry?: () => void;
  ref?: React.Ref<HTMLLIElement>;
}

/** 사진 항목 하나(80×80) — 오른쪽 위에 지우기 버튼. */
function AttachmentDisplayItem({
  entry,
  onRetry,
  className,
  style,
  ref,
  ...props
}: AttachmentDisplayItemProps) {
  const { readOnly, stateProps, removeEntry } = useAttachmentDisplayContext();
  const { scaleFeedbackRef, scaleFeedbackClassName } =
    useScaleFeedback<HTMLLIElement>(ref);
  return (
    <li
      ref={scaleFeedbackRef}
      data-slot="attachment-input-item"
      data-status={entry.status}
      {...stateProps}
      className={cn(
        scaleFeedbackClassName,
        itemVariants({ type: "image" }),
        className,
      )}
      style={
        { "--attachment-item-mask": ITEM_MASK, ...style } as React.CSSProperties
      }
      {...props}
    >
      <img
        data-slot="attachment-item-image"
        src={entry.thumbnailUrl}
        alt=""
        className={cn("size-full rounded-[inherit] object-cover", MASKED)}
      />
      {entry.status === "uploading" ? (
        <AttachmentItemBackdrop type="image">
          <AttachmentItemProgress type="image" entry={entry} />
        </AttachmentItemBackdrop>
      ) : null}
      {entry.status === "error" && onRetry ? (
        <AttachmentItemBackdrop type="image">
          <AttachmentItemRetryButton type="image" onClick={onRetry} />
        </AttachmentItemBackdrop>
      ) : null}
      <AttachmentItemRemoveButton
        disabled={readOnly}
        onClick={() => removeEntry(entry.id)}
      />
    </li>
  );
}

export {
  AttachmentField,
  AttachmentInput,
  AttachmentDropzone,
  AttachmentInputItem,
  AttachmentDisplayField,
  AttachmentDisplay,
  AttachmentDisplayItem,
  useAttachmentInputContext,
  useAttachmentDisplayContext,
  formatBytes,
};
