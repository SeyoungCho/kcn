"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { type Registry } from "@/types/preview";
import { flattenToText } from "@/utils/preview";

interface UsePreviewSrcOptions {
  children?: ReactNode;
  component?: string;
  demo?: string;
  props?: Record<string, unknown>;
  registry: Registry;
}

/**
 * Builds the iframe URL after mount so MDX children do not cause hydration
 * mismatches between server and client renders.
 *
 * The iframe lives in an isolated `/preview/...` document with no access to the
 * docs site's i18n context, so the active language from the parent route
 * (`[lang]/docs/...`) is forwarded as a `lang` search param. Demo pages read it
 * to localize their static labels.
 */
export function usePreviewSrc({
  children,
  component,
  demo,
  props,
  registry,
}: UsePreviewSrcOptions) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const params = useParams();
  const lang = typeof params.lang === "string" ? params.lang : undefined;

  useEffect(() => {
    if (demo) {
      const qs = lang ? `?lang=${encodeURIComponent(lang)}` : "";
      setSrc(`/preview/${registry}/demos/${demo}${qs}`);
      return;
    }

    if (!component) {
      setSrc(undefined);
      return;
    }

    const childrenText = flattenToText(children).trim();
    const search = new URLSearchParams();
    if (props && Object.keys(props).length > 0) {
      search.set("props", JSON.stringify(props));
    }
    if (childrenText) {
      search.set("children", childrenText);
    }
    if (lang) {
      search.set("lang", lang);
    }
    const qs = search.toString();
    setSrc(`/preview/${registry}/${component}${qs ? `?${qs}` : ""}`);
  }, [children, component, demo, props, registry, lang]);

  return src;
}
