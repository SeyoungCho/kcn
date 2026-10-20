"use client";

import * as React from "react";
import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// shadcn Field 에 t-flavored 의 모양을 입혔다. Base UI Field 위에 세워
// 이름표 · 도움말이 칸과 저절로 이어지고(htmlFor · aria-describedby), invalid 가 칸의 aria-invalid 로 내려간다.
// 칸에 초점이 오면 이름표가 파래지고, invalid 면 이름표 · 도움말이 빨개진다.

// 상자형 칸(variant="default") 위아래의 글은 상자보다 4px 안쪽에서 시작한다. 밑줄형(line · big · hero)은 칸과 왼쪽이 맞는다.
const BOX_INSET =
  "group-has-[:is([data-slot=input],[data-slot=input-group],[data-slot=textarea])[data-variant=default]]/field:px-1";

type FieldSetProps = FieldsetPrimitive.Root.Props;

function FieldSet({ className, ...props }: FieldSetProps) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn("flex flex-col gap-6", className)}
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
        `mb-3 text-grey-800 data-[variant=label]:text-t7
        data-[variant=legend]:text-t5 data-[variant=legend]:font-semibold`,
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
      className={cn("group/field-group flex w-full flex-col gap-8", className)}
      {...props}
    />
  );
}

const fieldVariants = cva("group/field flex w-full", {
  variants: {
    orientation: {
      vertical: "flex-col gap-1.5",
      horizontal: `flex-row items-center gap-3
      has-[>[data-slot=field-content]]:items-start
      *:data-[slot=field-label]:flex-auto`,
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
        "group/field-content flex flex-1 flex-col gap-1.5",
        className,
      )}
      {...props}
    />
  );
}

type FieldLabelProps = FieldPrimitive.Label.Props;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        `flex w-fit items-center gap-1 text-t7 text-grey-800 select-none
        data-invalid:text-red-600 data-focused:not-data-invalid:text-blue-600`,
        BOX_INSET,
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-1 text-t7 text-grey-800",
        className,
      )}
      {...props}
    />
  );
}

type FieldDescriptionProps = FieldPrimitive.Description.Props;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn(
        `text-t7 text-grey-600 data-invalid:text-red-600 [&>a]:underline
        [&>a]:underline-offset-4`,
        BOX_INSET,
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
      className={cn("text-t7 text-red-600", BOX_INSET, className)}
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
