"use client";

import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Field 에 montage 의 폼 컨트롤 모양을 입혔다. Base UI Field 위에 세워
// 이름표 · 도움말이 칸과 저절로 이어지고(htmlFor · aria-describedby), invalid 가 칸의 aria-invalid 로 내려간다.
// 이름표는 안의 칸(Input · InputGroup · Textarea …)이 size="sm" 이면 한 단계 작아진다.
// orientation="horizontal" 에 FieldContent 를 두면 이름표가 칸 왼쪽에 서고, 칸의 첫 줄 가운데에 맞춘다.

type FieldSetProps = FieldsetPrimitive.Root.Props;

function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

type FieldLegendProps = FieldsetPrimitive.Legend.Props & {
  variant?: "legend" | "label";
};

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        `font-semibold data-[variant=label]:px-0.5
        data-[variant=label]:text-label1
        data-[variant=label]:text-fg-neutral-secondary
        data-[variant=legend]:text-headline2
        data-[variant=legend]:text-fg-neutral-primary`,
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("group/field-group flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

const fieldVariants = cva("group/field flex w-full", {
  variants: {
    orientation: {
      vertical: "flex-col gap-2",
      // 이름표 + FieldContent(칸 · 도움말) 이면 이름표는 늘어나지 않고, 칸의 첫 줄 높이 안에서 가운데에 선다
      horizontal: `flex-row items-center gap-2
      *:data-[slot=field-label]:flex-auto
      has-[>[data-slot=field-content]]:items-start
      has-[>[data-slot=field-content]]:gap-4
      has-[>[data-slot=field-content]]:*:data-[slot=field-label]:min-h-12
      has-[>[data-slot=field-content]]:*:data-[slot=field-label]:flex-none
      has-[>[data-slot=field-content]>[data-size=sm]]:*:data-[slot=field-label]:min-h-10`,
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

type FieldProps = FieldPrimitive.Root.Props &
  VariantProps<typeof fieldVariants>;

function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex min-w-0 flex-1 flex-col gap-2",
        className,
      )}
      {...props}
    />
  );
}

// 안의 칸이 sm 이면 이름표도 한 단계 작게
const LABEL = `flex w-fit items-center px-0.5 text-label1 font-semibold
text-fg-neutral-secondary
group-has-[>[data-size=sm],>[data-slot=field-content]>[data-size=sm]]/field:text-label2`;

type FieldLabelProps = FieldPrimitive.Label.Props & {
  /** 이름표 뒤에 빨간 * 를 붙인다. 칸에도 required 를 함께 준다. */
  required?: boolean;
};

function FieldLabel({
  className,
  required = false,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(LABEL, "select-none", className)}
      {...props}
    >
      {children}
      {required && (
        <span
          data-slot="field-label-required"
          aria-hidden
          className="font-medium whitespace-pre text-fg-negative-primary"
        >
          {" *"}
        </span>
      )}
    </FieldPrimitive.Label>
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-label" className={cn(LABEL, className)} {...props} />
  );
}

type FieldDescriptionProps = FieldPrimitive.Description.Props;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(
        `px-0.5 text-caption1 font-normal break-keep wrap-anywhere
        text-fg-neutral-tertiary [&>a]:underline [&>a]:underline-offset-4`,
        className,
      )}
      {...props}
    />
  );
}

type FieldErrorProps = FieldPrimitive.Error.Props & {
  /** 폼 라이브러리의 오류 목록. 같은 메시지는 한 번만 보인다. */
  errors?: Array<{ message?: string } | undefined>;
};

function FieldError({
  className,
  children,
  errors,
  match,
  ...props
}: FieldErrorProps) {
  const content = React.useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul
        data-slot="field-error-list"
        className="ml-4 flex list-disc flex-col gap-1"
      >
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              <li key={index} data-slot="field-error-item">
                {error.message}
              </li>
            ),
        )}
      </ul>
    );
  }, [children, errors]);

  return (
    <FieldPrimitive.Error
      role="alert"
      data-slot="field-error"
      match={content ? true : match}
      className={cn(
        `px-0.5 text-caption1 font-normal break-keep wrap-anywhere
        text-fg-negative-primary`,
        className,
      )}
      {...props}
      // 글을 주면 늘 보인다. 비워 두면 Base UI 가 검증 결과(required · type …)에 맞는 브라우저의 메시지를 넣는다.
      {...(content ? { children: content } : {})}
    />
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  fieldVariants,
  type FieldDescriptionProps,
  type FieldErrorProps,
  type FieldLabelProps,
  type FieldLegendProps,
  type FieldProps,
  type FieldSetProps,
};
