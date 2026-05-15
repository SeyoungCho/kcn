"use client";

import { type ReactNode, useEffect, useState } from "react";
import { type Registry } from "@/types/preview";
import { flattenToText } from "@/utils/preview";

interface UsePreviewCodeOptions {
  children?: ReactNode;
  component?: string;
  demo?: string;
  props?: Record<string, unknown>;
  registry: Registry;
}

interface PreviewCodeState {
  code?: string;
  error?: string;
  isLoading: boolean;
}

function componentToFileName(component: string) {
  return component
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function escapeStringProp(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function formatPropValue(value: unknown) {
  if (typeof value === "string") return `"${escapeStringProp(value)}"`;
  if (typeof value === "number" || typeof value === "boolean") {
    return `{${String(value)}}`;
  }
  if (value == null) return `{${String(value)}}`;
  return `{${JSON.stringify(value)}}`;
}

function buildPropsCode(props?: Record<string, unknown>) {
  if (!props || Object.keys(props).length === 0) return "";

  return Object.entries(props)
    .map(([key, value]) => ` ${key}=${formatPropValue(value)}`)
    .join("");
}

/**
 * Creates the code users should copy for simple component previews.
 */
function buildComponentPreviewCode({
  children,
  component,
  props,
}: Required<Pick<UsePreviewCodeOptions, "component">> &
  Pick<UsePreviewCodeOptions, "children" | "props">) {
  const childrenText = flattenToText(children).trim();
  const propsCode = buildPropsCode(props);
  const importPath = `@/components/ui/${componentToFileName(component)}`;
  const jsx = childrenText
    ? `<${component}${propsCode}>${childrenText}</${component}>`
    : `<${component}${propsCode} />`;

  return `import { ${component} } from "${importPath}";

export default function Preview() {
  return ${jsx};
}`;
}

/**
 * Returns code for the Code tab.
 *
 * Component previews are generated from props locally. Demo previews are
 * loaded from the matching preview file because they can contain real JSX.
 */
export function usePreviewCode({
  children,
  component,
  demo,
  props,
  registry,
}: UsePreviewCodeOptions): PreviewCodeState {
  const [state, setState] = useState<PreviewCodeState>({
    isLoading: false,
  });

  useEffect(() => {
    if (component) {
      setState({
        code: buildComponentPreviewCode({
          children,
          component,
          props,
        }),
        isLoading: false,
      });
      return;
    }

    const search = new URLSearchParams({ registry });
    if (demo) {
      search.set("demo", demo);
    } else {
      setState({ isLoading: false });
      return;
    }

    const controller = new AbortController();
    setState({ isLoading: true });

    fetch(`/api/preview-code?${search.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as {
          code?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error ?? "Failed to load preview code");
        }

        setState({ code: payload.code ?? "", isLoading: false });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setState({
          error:
            error instanceof Error
              ? error.message
              : "Failed to load preview code",
          isLoading: false,
        });
      });

    return () => controller.abort();
  }, [children, component, demo, props, registry]);

  return state;
}
