declare module "@/components/ui/textarea" {
  import type * as React from "react";

  export function Textarea(
    props: React.ComponentProps<"textarea"> & {
      size?: "md" | "lg";
    },
  ): React.ReactElement;
}
