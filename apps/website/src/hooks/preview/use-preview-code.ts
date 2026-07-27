"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
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

interface DemoCodeResult {
  code?: string;
  error?: string;
  requestUrl: string;
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
  const [demoResult, setDemoResult] = useState<DemoCodeResult>();
  const params = useParams();
  const lang = typeof params.lang === "string" ? params.lang : undefined;
  const componentCode = component
    ? buildComponentPreviewCode({
        children,
        component,
        props,
      })
    : undefined;
  const requestUrl = useMemo(() => {
    if (!demo) return undefined;

    const search = new URLSearchParams({ registry, demo });
    if (lang) search.set("lang", lang);

    return `/api/preview-code?${search.toString()}`;
  }, [demo, lang, registry]);

  useEffect(() => {
    if (!requestUrl) return;

    const controller = new AbortController();

    fetch(requestUrl, {
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

        setDemoResult({ code: payload.code ?? "", requestUrl });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setDemoResult({
          error:
            error instanceof Error
              ? error.message
              : "Failed to load preview code",
          requestUrl,
        });
      });

    return () => controller.abort();
  }, [requestUrl]);

  if (componentCode) {
    return { code: componentCode, isLoading: false };
  }

  if (!requestUrl) {
    return { isLoading: false };
  }

  if (demoResult?.requestUrl !== requestUrl) {
    return { isLoading: true };
  }

  return { ...demoResult, isLoading: false };
}
