import { createCn } from "cn/config";

// 클래스 이름 합치기 — 뒤에 온 클래스가 같은 속성의 앞 클래스를 이긴다.
// montage 의 글자 크기 · 모서리 · 그림자 이름을 알려 주지 않으면 글자 색(text-fg-neutral-primary)과 같은 것으로 보거나 지운다.
// global.css 에 눈금을 더하면 여기에도 더한다.

const TEXT_SIZES = [
  "display1",
  "display2",
  "display3",
  "title1",
  "title2",
  "title3",
  "heading1",
  "heading2",
  "headline1",
  "headline2",
  "body1",
  "body1-reading",
  "body2",
  "body2-reading",
  "label1",
  "label1-reading",
  "label2",
  "caption1",
  "caption2",
];

export const cn = createCn({
  extend: {
    theme: {
      text: TEXT_SIZES,
      radius: ["4", "8", "10", "12", "14", "16", "20", "24", "28", "32"],
      shadow: ["spread-sm", "spread-md"],
    },
  },
});
