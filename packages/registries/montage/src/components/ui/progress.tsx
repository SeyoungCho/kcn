import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Progress 에 montage 의 모양을 입혔다.
//   value — shadcn 처럼 0~100(max 로 바꾼다).
//   size — default · md · lg 순으로 두꺼워진다. 기본(가장 얇은 것)을 쓰고, md · lg 는 넓은 화면에서만 쓴다.
// 모서리 없는 납작한 막대이고, 값이 바뀌면 짧게 늘거나 준다.
const progressTrackVariants = cva(
  "relative flex w-full items-center overflow-hidden bg-secondary",
  {
    variants: {
      size: {
        default: "h-0.5",
        md: "h-1",
        lg: "h-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ProgressProps = ProgressPrimitive.Root.Props &
  VariantProps<typeof progressTrackVariants>;

function Progress({
  className,
  children,
  value,
  size = "default",
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      data-size={size}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {children}
      <ProgressTrack size={size}>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

type ProgressTrackProps = ProgressPrimitive.Track.Props &
  VariantProps<typeof progressTrackVariants>;

function ProgressTrack({ className, size, ...props }: ProgressTrackProps) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full bg-primary transition-[width] duration-200 ease-in-out",
        className,
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn(
        "text-label1 font-medium text-fg-neutral-primary",
        className,
      )}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn(
        "ms-auto text-label1 font-medium text-fg-neutral-secondary tabular-nums",
        className,
      )}
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  progressTrackVariants,
  type ProgressProps,
  type ProgressTrackProps,
};
