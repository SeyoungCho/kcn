"use client";

import {
  AttachmentField,
  AttachmentInput,
} from "@repo/seed/ui/attachment-field";
import type { AttachmentStatusDetails } from "@repo/seed/ui/attachment-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// Stand-in for a real upload: reports progress, then success.
function simulateUpload(
  id: string,
  update: (id: string, details: AttachmentStatusDetails) => void,
) {
  let progress = 0;
  const timer = setInterval(() => {
    progress += 20;
    if (progress >= 100) {
      clearInterval(timer);
      update(id, { status: "success" });
    } else {
      update(id, { status: "uploading", progress });
    }
  }, 300);
}

export default function AttachmentFieldImagesDemo() {
  const t = usePreviewDictionary().demos.attachmentField;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <AttachmentField
          labels={{
            selectFile: t.labels.selectFile,
            dropFile: t.labels.dropFile,
            retry: t.labels.retry,
            removeFile: t.labels.removeFile,
          }}
          label={t.images.label}
          description={t.images.description}
          accept="image/*"
          maxFiles={5}
          onFileAccept={(entries, { updateFileEntryStatus }) => {
            for (const entry of entries)
              simulateUpload(entry.id, updateFileEntryStatus);
          }}
        >
          <AttachmentInput />
        </AttachmentField>
      </div>
    </div>
  );
}
