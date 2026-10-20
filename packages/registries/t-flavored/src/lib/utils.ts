import { createCn } from "cn/config";

// 클래스 이름 합치기 — 뒤에 온 클래스가 같은 속성의 앞 클래스를 이긴다.
// 글자 크기(text-t5 · text-st11)를 알려 주지 않으면 글자 색(text-grey-700)과 같은 것으로 보고 하나를 지운다.
// global.css 에 글자 크기를 더하면 여기에도 더한다.

const TEXT_SIZES = [
  ...["t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  ...Array.from({ length: 13 }, (_, index) => `st${index + 1}`),
];

export const cn = createCn({
  extend: {
    theme: {
      text: TEXT_SIZES,
    },
  },
});
