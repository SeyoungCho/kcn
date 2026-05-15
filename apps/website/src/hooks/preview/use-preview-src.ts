"use client";

import { type ReactNode, useEffect, useState } from "react";
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
 */
export function usePreviewSrc({
  children,
  component,
  demo,
  props,
  registry,
}: UsePreviewSrcOptions) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (demo) {
      setSrc(`/preview/${registry}/demos/${demo}`);
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
    const qs = search.toString();
    setSrc(`/preview/${registry}/${component}${qs ? `?${qs}` : ""}`);
  }, [children, component, demo, props, registry]);

  return src;
}
