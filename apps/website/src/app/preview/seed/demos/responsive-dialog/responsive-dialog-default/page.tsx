"use client";

import { ActionButton } from "@repo/seed/ui/action-button";
import {
  ResponsiveDialogAction,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogRoot,
  ResponsiveDialogTrigger,
} from "@repo/seed/ui/responsive-dialog";
import { usePreviewDictionary } from "@/components/preview/preview-dictionary-provider";

export default function ResponsiveDialogDefaultDemo() {
  const t = usePreviewDictionary().demos.responsiveDialog;

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <ResponsiveDialogRoot>
        <ResponsiveDialogTrigger
          render={<ActionButton variant="neutralWeak" />}
        >
          {t.open}
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent
          title={t.title}
          description={t.description}
          showHandle
        >
          <ResponsiveDialogBody>
            <p className="m-0 text-t5 text-fg-neutral">{t.body}</p>
          </ResponsiveDialogBody>
          <ResponsiveDialogFooter>
            <div className="flex gap-x2">
              <ResponsiveDialogAction variant="neutralWeak" className="flex-1">
                {t.cancel}
              </ResponsiveDialogAction>
              <ResponsiveDialogAction className="flex-1">
                {t.confirm}
              </ResponsiveDialogAction>
            </div>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialogRoot>
    </div>
  );
}
