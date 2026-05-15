"use client";

import { type ReactNode, useEffect, useState } from "react";

type Registry = "seed" | "montage" | "t-flavored";

interface UsePreviewSrcOptions {
  children?: ReactNode;
  component?: string;
  demo?: string;
  props?: Record<string, unknown>;
  registry: Registry;
}

function flattenToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenToText).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return flattenToText(element.props?.children);
  }
  return "";
}

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
