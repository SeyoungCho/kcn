import type {
  AttachmentDisplayFieldProps,
  AttachmentDisplayProps,
  AttachmentFieldProps,
  AttachmentInputItemProps,
  AttachmentInputProps,
} from "@repo/seed/ui/attachment-field";

export type MDXAttachmentFieldProps = {
  /** Label above the field. */
  label?: AttachmentFieldProps["label"];
  /** Weight of the label.
   * @default "medium"
   */
  labelWeight?: AttachmentFieldProps["labelWeight"];
  /** Secondary text next to the label (such as "Optional"). */
  indicator?: AttachmentFieldProps["indicator"];
  /** Helper text below the field. Hidden visually while an error message shows. */
  description?: AttachmentFieldProps["description"];
  /** Error text below the field. Shown only when `invalid` is set. */
  errorMessage?: AttachmentFieldProps["errorMessage"];
  /** Shows the required mark next to the label. */
  showRequiredIndicator?: AttachmentFieldProps["showRequiredIndicator"];
  /** Accepted file types — MIME types (`"image/png"`, `"image/*"`) or extensions (`".pdf"`). When every type is an image, items render as thumbnails. */
  accept?: AttachmentFieldProps["accept"];
  /** Maximum number of files. The picker turns off once it is full.
   * @default 1
   */
  maxFiles?: AttachmentFieldProps["maxFiles"];
  /** Maximum file size in bytes.
   * @default Infinity
   */
  maxFileSize?: AttachmentFieldProps["maxFileSize"];
  /** Minimum file size in bytes.
   * @default 0
   */
  minFileSize?: AttachmentFieldProps["minFileSize"];
  /** Extra per-file check. Return an array of error codes to reject the file, or `null` to accept it. */
  validate?: AttachmentFieldProps["validate"];
  /** Accepted entries (controlled). */
  acceptedFileEntries?: AttachmentFieldProps["acceptedFileEntries"];
  /** Initial entries (uncontrolled). */
  defaultAcceptedFileEntries?: AttachmentFieldProps["defaultAcceptedFileEntries"];
  /** Called whenever the entry list changes. */
  onAcceptedFileEntriesChange?: AttachmentFieldProps["onAcceptedFileEntriesChange"];
  /** Called with newly accepted entries. Start the upload here and report progress with `updateFileEntryStatus` — the field never uploads by itself. */
  onFileAccept?: AttachmentFieldProps["onFileAccept"];
  /** Called with the files that failed `accept`, size, count, or `validate` checks. */
  onFileReject?: AttachmentFieldProps["onFileReject"];
  /** Stops the browser from opening files dropped outside the dropzone.
   * @default true
   */
  preventDocumentDrop?: AttachmentFieldProps["preventDocumentDrop"];
  /** Name of the hidden file input. Accepted files are submitted with the form. */
  name?: AttachmentFieldProps["name"];
  /** @default false */
  invalid?: AttachmentFieldProps["invalid"];
  /** @default false */
  disabled?: AttachmentFieldProps["disabled"];
  /** Blocks picking and removing files; the value is still submitted.
   * @default false
   */
  readOnly?: AttachmentFieldProps["readOnly"];
  /** @default false */
  required?: AttachmentFieldProps["required"];
  /** Props for the hidden `<input type="file">`. */
  inputProps?: AttachmentFieldProps["inputProps"];
  /** Props for the outer `Field`. Set `--attachment-input-extend-x` in `style` to let the item list scroll out to the page edge. */
  rootProps?: AttachmentFieldProps["rootProps"];
};

export type MDXAttachmentFieldPropsKO = {
  /** 칸 위의 이름표. */
  label?: AttachmentFieldProps["label"];
  /** 이름표의 굵기.
   * @default "medium"
   */
  labelWeight?: AttachmentFieldProps["labelWeight"];
  /** 이름표 옆의 보조 글('선택' 같은 것). */
  indicator?: AttachmentFieldProps["indicator"];
  /** 칸 아래의 도움말. 오류 메시지가 보이는 동안에는 화면에서 감춰요. */
  description?: AttachmentFieldProps["description"];
  /** 칸 아래의 오류 메시지. `invalid` 일 때만 보여요. */
  errorMessage?: AttachmentFieldProps["errorMessage"];
  /** 이름표 옆에 필수 표시를 보여 줘요. */
  showRequiredIndicator?: AttachmentFieldProps["showRequiredIndicator"];
  /** 받을 종류 — MIME(`"image/png"` · `"image/*"`) 또는 확장자(`".pdf"`). 모두 그림이면 항목을 썸네일로 그려요. */
  accept?: AttachmentFieldProps["accept"];
  /** 최대 개수. 다 차면 고르는 버튼이 꺼져요.
   * @default 1
   */
  maxFiles?: AttachmentFieldProps["maxFiles"];
  /** 최대 크기(바이트).
   * @default Infinity
   */
  maxFileSize?: AttachmentFieldProps["maxFileSize"];
  /** 최소 크기(바이트).
   * @default 0
   */
  minFileSize?: AttachmentFieldProps["minFileSize"];
  /** 파일마다 더 따질 것. 못 받는 까닭(코드)의 배열이나 `null` 을 돌려줘요. */
  validate?: AttachmentFieldProps["validate"];
  /** 받은 항목(제어). */
  acceptedFileEntries?: AttachmentFieldProps["acceptedFileEntries"];
  /** 처음 항목(비제어). */
  defaultAcceptedFileEntries?: AttachmentFieldProps["defaultAcceptedFileEntries"];
  /** 항목 목록이 바뀔 때마다 불려요. */
  onAcceptedFileEntriesChange?: AttachmentFieldProps["onAcceptedFileEntriesChange"];
  /** 새로 받은 항목. 여기서 올리기를 시작하고 `updateFileEntryStatus` 로 상태를 넘겨요 — 부품이 직접 올리지는 않아요. */
  onFileAccept?: AttachmentFieldProps["onFileAccept"];
  /** 종류 · 크기 · 개수 · `validate` 에 걸려 받지 않은 파일. */
  onFileReject?: AttachmentFieldProps["onFileReject"];
  /** 끌어 놓을 칸 밖에 파일을 떨어뜨렸을 때 브라우저가 그 파일을 여는 것을 막아요.
   * @default true
   */
  preventDocumentDrop?: AttachmentFieldProps["preventDocumentDrop"];
  /** 숨은 파일 input 의 이름. 받은 파일이 폼으로 함께 가요. */
  name?: AttachmentFieldProps["name"];
  /** @default false */
  invalid?: AttachmentFieldProps["invalid"];
  /** @default false */
  disabled?: AttachmentFieldProps["disabled"];
  /** 고르기 · 지우기를 막아요. 값은 폼으로 보내요.
   * @default false
   */
  readOnly?: AttachmentFieldProps["readOnly"];
  /** @default false */
  required?: AttachmentFieldProps["required"];
  /** 숨은 `<input type="file">` 에 붙는 props. */
  inputProps?: AttachmentFieldProps["inputProps"];
  /** 바깥 `Field` 에 붙는 props. `style` 로 `--attachment-input-extend-x` 를 주면 항목 목록이 화면 끝까지 밀려요. */
  rootProps?: AttachmentFieldProps["rootProps"];
};

export type MDXAttachmentInputProps = {
  /** Render the items yourself — `(context) => …` receives `acceptedFileEntries` and the helpers. Defaults to one `AttachmentInputItem` per entry. */
  children?: AttachmentInputProps["children"];
  /** Called when the retry button of a failed item is pressed. When set, failed items show a retry button. */
  onRetry?: AttachmentInputProps["onRetry"];
};

export type MDXAttachmentInputPropsKO = {
  /** 항목을 직접 그릴 때 — `(context) => …` 가 `acceptedFileEntries` 와 도우미를 받아요. 안 주면 항목마다 `AttachmentInputItem` 을 그려요. */
  children?: AttachmentInputProps["children"];
  /** 실패한 항목의 재시도 버튼을 눌렀을 때 불려요. 주면 실패한 항목에 재시도 버튼이 나와요. */
  onRetry?: AttachmentInputProps["onRetry"];
};

export type MDXAttachmentInputItemProps = {
  /** The entry to render (`{ id, file, status, progress? }`). */
  fileEntry: AttachmentInputItemProps["fileEntry"];
  /** When set, a failed (`error`) item shows a retry button. */
  onRetry?: AttachmentInputItemProps["onRetry"];
};

export type MDXAttachmentInputItemPropsKO = {
  /** 그릴 항목(`{ id, file, status, progress? }`). */
  fileEntry: AttachmentInputItemProps["fileEntry"];
  /** 주면 실패(`error`)한 항목에 재시도 버튼이 나와요. */
  onRetry?: AttachmentInputItemProps["onRetry"];
};

export type MDXAttachmentDisplayFieldProps = Pick<
  AttachmentDisplayFieldProps,
  | "label"
  | "labelWeight"
  | "indicator"
  | "description"
  | "errorMessage"
  | "showRequiredIndicator"
> & {
  /** Entries (controlled). Each entry is `{ id, thumbnailUrl, status }`. */
  entries?: AttachmentDisplayFieldProps["entries"];
  /** Initial entries (uncontrolled). */
  defaultEntries?: AttachmentDisplayFieldProps["defaultEntries"];
  /** Called whenever the entry list changes. */
  onEntriesChange?: AttachmentDisplayFieldProps["onEntriesChange"];
  /** Maximum number of entries. The trigger turns off once it is full.
   * @default 1
   */
  maxEntries?: AttachmentDisplayFieldProps["maxEntries"];
  /** @default false */
  invalid?: AttachmentDisplayFieldProps["invalid"];
  /** @default false */
  disabled?: AttachmentDisplayFieldProps["disabled"];
  /** @default false */
  readOnly?: AttachmentDisplayFieldProps["readOnly"];
};

export type MDXAttachmentDisplayFieldPropsKO = Pick<
  AttachmentDisplayFieldProps,
  | "label"
  | "labelWeight"
  | "indicator"
  | "description"
  | "errorMessage"
  | "showRequiredIndicator"
> & {
  /** 항목(제어). 항목 하나는 `{ id, thumbnailUrl, status }` 예요. */
  entries?: AttachmentDisplayFieldProps["entries"];
  /** 처음 항목(비제어). */
  defaultEntries?: AttachmentDisplayFieldProps["defaultEntries"];
  /** 항목 목록이 바뀔 때마다 불려요. */
  onEntriesChange?: AttachmentDisplayFieldProps["onEntriesChange"];
  /** 최대 개수. 다 차면 고르는 버튼이 꺼져요.
   * @default 1
   */
  maxEntries?: AttachmentDisplayFieldProps["maxEntries"];
  /** @default false */
  invalid?: AttachmentDisplayFieldProps["invalid"];
  /** @default false */
  disabled?: AttachmentDisplayFieldProps["disabled"];
  /** @default false */
  readOnly?: AttachmentDisplayFieldProps["readOnly"];
};

export type MDXAttachmentDisplayProps = {
  /** Called when the trigger is pressed. Open your own picker, then add what was picked with `addEntries` (entries past `maxEntries` are dropped). */
  onTriggerClick: AttachmentDisplayProps["onTriggerClick"];
  /** Render the items yourself — `(context) => …`. Defaults to one `AttachmentDisplayItem` per entry. */
  children?: AttachmentDisplayProps["children"];
  /** Called when the retry button of a failed item is pressed. */
  onRetry?: AttachmentDisplayProps["onRetry"];
};

export type MDXAttachmentDisplayPropsKO = {
  /** 누르는 칸을 눌렀을 때 불려요. 바깥의 고르는 창을 열고, 고른 것을 `addEntries` 로 넣어요(`maxEntries` 를 넘는 것은 버려요). */
  onTriggerClick: AttachmentDisplayProps["onTriggerClick"];
  /** 항목을 직접 그릴 때 — `(context) => …`. 안 주면 항목마다 `AttachmentDisplayItem` 을 그려요. */
  children?: AttachmentDisplayProps["children"];
  /** 실패한 항목의 재시도 버튼을 눌렀을 때 불려요. */
  onRetry?: AttachmentDisplayProps["onRetry"];
};
