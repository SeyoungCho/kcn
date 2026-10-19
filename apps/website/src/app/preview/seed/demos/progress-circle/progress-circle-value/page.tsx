"use client";

import * as React from "react";
import { ProgressCircle } from "@repo/seed/ui/progress-circle";

const values = [0, 25, 50, 75, 100];

export default function ProgressCircleValueDemo() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(
      () => setValue((current) => (current >= 100 ? 0 : current + 10)),
      600,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex min-h-screen flex-wrap items-center justify-center gap-6
        p-8"
    >
      {values.map((fixed) => (
        <div key={fixed} className="flex flex-col items-center gap-2">
          <ProgressCircle value={fixed} tone="brand" />
          <span className="text-t3 text-fg-neutral-muted">{fixed}%</span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2">
        <ProgressCircle value={value} tone="neutral" />
        <span className="text-t3 text-fg-neutral-muted">{value}%</span>
      </div>
    </div>
  );
}
