"use client";

import * as React from "react";
import {
  AttachmentField,
  AttachmentInput,
} from "@repo/seed/ui/attachment-field";
import type { AttachmentInputFileEntry } from "@repo/seed/ui/attachment-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

const sampleFile = (name: string, size: number) =>
  new File([new Uint8Array(size)], name, { type: "application/pdf" });

export default function AttachmentFieldStatusDemo() {
  const t = usePreviewDictionary().demos.attachmentField;
  const [entries] = React.useState<AttachmentInputFileEntry[]>(() => [
    {
      id: "uploading",
      file: sampleFile(t.statuses.files.uploading, 1_240_000),
      status: "uploading",
      progress: 40,
    },
    {
      id: "error",
      file: sampleFile(t.statuses.files.error, 380_000),
      status: "error",
    },
    {
      id: "success",
      file: sampleFile(t.statuses.files.success, 2_600_000),
      status: "success",
    },
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[600px]">
        <AttachmentField
          labels={{
            selectFile: t.labels.selectFile,
            dropFile: t.labels.dropFile,
            retry: t.labels.retry,
            removeFile: t.labels.removeFile,
          }}
          label={t.statuses.label}
          description={t.statuses.description}
          maxFiles={5}
          defaultAcceptedFileEntries={entries}
        >
          <AttachmentInput
            onRetry={(entry, { updateFileEntryStatus }) => {
              updateFileEntryStatus(entry.id, { status: "uploading" });
              setTimeout(
                () => updateFileEntryStatus(entry.id, { status: "success" }),
                1200,
              );
            }}
          />
        </AttachmentField>
      </div>
    </div>
  );
}
