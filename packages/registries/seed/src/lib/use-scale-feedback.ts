import * as React from "react";

/**
 * 누를 때 살짝 줄어드는 반응(SEED 의 scale feedback).
 *
 * 크기와 상관없이 늘 2px 만큼만 줄어들게, 요소의 크기를 재서 --element-width · --element-height 로 적어 두고
 * 클래스가 그 값으로 비율(--feedback-scale)을 셈한다. 줄이는 것은 부품이 누르는 조건에 맞춰 직접 적는다:
 *
 *   const { scaleFeedbackRef, scaleFeedbackClassName } = useScaleFeedback(ref);
 *   <button ref={scaleFeedbackRef} className={cn(scaleFeedbackClassName, 'pressed:scale-(--feedback-scale)', …)} />
 *
 * transition 에는 `var(--feedback-scale-transition)`(theme.css)을 넣는다.
 * 크기를 재기 전이거나 ref 가 빠지면 비율이 무효가 되어 줄어들지 않을 뿐, 틀린 비율로 줄지는 않는다.
 */

// 쉬는 동안에도 scale: 1 을 둔다 — 누르는 순간에만 쌓임 맥락이 생겨 안쪽의 position: fixed 가 끌려가는 일을 막는다.
const scaleFeedbackClassName = [
  "[--feedback-scale-basis:max(var(--element-height),var(--element-width)/4,24)]",
  "[--feedback-scale:calc((var(--feedback-scale-basis)-2)/var(--feedback-scale-basis))]",
  "motion-reduce:[--feedback-scale:1]",
  "scale-[1]",
].join(" ");

// 재는 눈은 하나만 둔다. 서버에서 불러와도 괜찮게 처음 쓸 때 만든다.
let sharedObserver: ResizeObserver | null = null;

const getSharedObserver = () => {
  sharedObserver ??= new ResizeObserver((entries) => {
    // 다 읽고 나서 쓴다 — 사이에 쓰면 뒤의 읽기마다 배치를 다시 셈한다.
    const measurements = entries.map((entry) => {
      const element = entry.target as HTMLElement;
      const size = entry.borderBoxSize?.[0];
      return {
        element,
        width: size ? size.inlineSize : element.offsetWidth,
        height: size ? size.blockSize : element.offsetHeight,
      };
    });
    for (const { element, width, height } of measurements) {
      element.style.setProperty("--element-width", String(width));
      element.style.setProperty("--element-height", String(height));
    }
  });
  return sharedObserver;
};

const assignRef = <T>(ref: React.Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") ref(node);
  else if (ref) ref.current = node;
};

/** ref 를 주면 그 ref 도 같이 채운다(부품이 받은 ref 를 그대로 넘긴다). */
function useScaleFeedback<T extends HTMLElement = HTMLElement>(
  ref?: React.Ref<T>,
) {
  // React 가 마지막으로 건넨 요소와 지금 재고 있는 요소. ref 의 정체가 바뀌면 같은 요소를 null 로 뗐다가 바로 다시 붙이므로 둘이 잠깐 어긋난다.
  const attachedRef = React.useRef<HTMLElement | null>(null);
  const observedRef = React.useRef<HTMLElement | null>(null);
  const outerRef = React.useRef(ref);
  outerRef.current = ref;

  const release = React.useCallback(() => {
    const observed = observedRef.current;
    if (!observed) return;
    observedRef.current = null;
    getSharedObserver().unobserve(observed);
    observed.style.removeProperty("--element-width");
    observed.style.removeProperty("--element-height");
  }, []);

  const scaleFeedbackRef = React.useCallback(
    (node: T | null) => {
      assignRef(outerRef.current, node);
      attachedRef.current = node;

      if (!node) {
        // 같은 커밋 안에서 다시 붙는 경우를 가려내려고 한 박자 미룬다.
        queueMicrotask(() => {
          if (attachedRef.current !== observedRef.current) release();
        });
        return;
      }
      if (observedRef.current === node) return;

      release();
      observedRef.current = node;
      // 안쪽 여백만 바뀌어도 다시 재도록 테두리 상자를 본다.
      getSharedObserver().observe(node, { box: "border-box" });
    },
    [release],
  );

  return { scaleFeedbackRef, scaleFeedbackClassName };
}

export { useScaleFeedback, scaleFeedbackClassName };
