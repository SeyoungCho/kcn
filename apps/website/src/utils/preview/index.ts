import { type ReactNode } from "react";

/**
 * Turns MDX/React children into plain text for simple component previews.
 */
export function flattenToText(node: ReactNode): string {
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
