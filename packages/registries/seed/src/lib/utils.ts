import { createCn } from "cn/config";

// 클래스 이름 합치기 — 뒤에 온 클래스가 같은 속성의 앞 클래스를 이긴다(cn('p-x2', className) 에서 className 의 p-x4 가 남는다).
// 토큰 이름(global.css 의 @theme)을 알려 줘야 한다. 모르면 text-t4(글자 크기)를 text-fg-neutral(글자 색)과 같은 것으로 보고 하나를 지운다.
// global.css 에 눈금을 더하면 여기에도 더한다.

const DIMENSIONS = [
  "x0.5",
  "x1",
  "x1.5",
  "x2",
  "x2.5",
  "x3",
  "x3.5",
  "x4",
  "x4.5",
  "x5",
  "x6",
  "x7",
  "x8",
  "x9",
  "x10",
  "x12",
  "x13",
  "x14",
  "x16",
];
const DIMENSION_ALIASES = [
  "x-between-chips",
  "x-global-gutter",
  "y-component-default",
  "y-nav-to-title",
  "y-screen-bottom",
  "y-between-text",
];
const TEXT_STEPS = [
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
];
const TEXT_SIZES = [
  ...TEXT_STEPS,
  ...TEXT_STEPS.map((step) => `${step}-static`),
];
const RADII = [
  "r0.5",
  "r1",
  "r1.5",
  "r2",
  "r2.5",
  "r3",
  "r3.5",
  "r4",
  "r5",
  "r6",
];
const SHADOWS = ["s1", "s2", "s3"];
const CONTAINERS = ["page"];
const DURATIONS = [
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "color-transition",
  "pressed-scale",
];
const EASINGS = [
  "linear",
  "easing",
  "enter",
  "exit",
  "enter-expressive",
  "exit-expressive",
  "pressed-scale",
];

export const cn = createCn({
  extend: {
    theme: {
      spacing: [...DIMENSIONS, ...DIMENSION_ALIASES],
      text: TEXT_SIZES,
      leading: TEXT_SIZES,
      radius: RADII,
      shadow: SHADOWS,
      ease: EASINGS,
      container: CONTAINERS,
    },
    classGroups: {
      "font-weight": [{ font: ["regular"] }],
      // font-[inherit] 는 글꼴(family)이다 — 알려 주지 않으면 굵기로 보고 같은 cn 안의 font-medium 과 겹친다며 지운다
      "font-family": [{ font: ["[inherit]"] }],
      duration: [{ duration: DURATIONS }],
    },
  },
});
