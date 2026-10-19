"use client";

import * as React from "react";
import {
  AttachmentDisplay,
  AttachmentDisplayField,
} from "@repo/seed/ui/attachment-field";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

// Sample thumbnails — in an app these come from the native photo picker.
const COLORS = ["#ff6f0f", "#2a9d8f", "#4361ee", "#e9c46a", "#9d4edd"];
const thumbnail = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="${color}"/><circle cx="80" cy="70" r="28" fill="white" fill-opacity="0.6"/></svg>`,
  )}`;

export default function AttachmentFieldDisplayDemo() {
  const t = usePreviewDictionary().demos.attachmentField;
  const countRef = React.useRef(0);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <AttachmentDisplayField
          label={t.display.label}
          description={t.display.description}
          maxEntries={4}
        >
          <AttachmentDisplay
            onTriggerClick={({ addEntries, updateEntryStatus }) => {
              const index = countRef.current++;
              const id = `photo-${index}`;
              addEntries([
                {
                  id,
                  thumbnailUrl: thumbnail(COLORS[index % COLORS.length]!),
                  status: "uploading",
                },
              ]);
              setTimeout(
                () => updateEntryStatus(id, { status: "success" }),
                1200,
              );
            }}
          />
        </AttachmentDisplayField>
      </div>
    </div>
  );
}
