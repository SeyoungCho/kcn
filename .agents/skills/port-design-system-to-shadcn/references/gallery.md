# 갤러리 — 원본과 새 부품을 기계로 견주기

`/gallery.html`(개발 서버에서만 열리고 빌드 결과물에는 없다)에 부품마다 원본(`seed`)과 새 부품(`next`)을 같은 props 로 나란히 그리고,
`e2e/gallery.spec.js` 가 칸마다 픽셀과 움직임 값을 견준다. 실례: `src/gallery/cases/*.tsx`, 타입은 `src/gallery/types.ts`.
이 레포에서는 이식을 마치고 원본 패키지와 함께 걷어냈다 — 커밋 `da5afba` 에 그대로 있다(`git show da5afba:src/gallery/types.ts`).
새로 이식할 때는 거기서 가져와 쓴다.

```bash
GALLERY_ONLY=badge npx playwright test e2e/gallery.spec.js          # 한 부품
GALLERY_ONLY=menu,select npx playwright test e2e/gallery.spec.js    # 여러 부품
npx playwright test e2e/gallery.spec.js                             # 전부
```

눈으로 볼 때는 `npm start` 뒤 `/gallery.html`. 한 칸만: `/gallery.html?case=<부품>/<id>&side=seed|next`.
갤러리 서버는 HMR 을 끈 채 돈다 — 칸 파일을 새로 만들었는데 안 보이면 `touch src/gallery/main.tsx`.

## 칸 쓰기

```tsx
const section: GallerySection = {
  name: "badge",
  cases: SIZES.flatMap((size) =>
    TONES.flatMap((tone) =>
      VARIANTS.map((variant) => ({
        id: `${size}-${tone}-${variant}`,
        seed: (
          <SeedBadge size={size} tone={tone} variant={variant}>
            새 글
          </SeedBadge>
        ),
        next: (
          <Badge size={size} tone={tone} variant={variant}>
            새 글
          </Badge>
        ),
        states: ["hover", "active", "focus"], // 상태가 있는 부품만
      })),
    ),
  ),
};
export default section;
```

- **조합을 빠짐없이.** 크기 × 색조 × 변형 × (아이콘 있음/없음 · 긴 글자 · 비활성 · 오류 · 읽기 전용) — 루프로 만든다. 소비자 화면이 실제로 쓰는 조합(이 레포: `/irb`)은 따로 칸을 둔다.
- **안 준 값은 넘기지 않는다.** 원본은 `undefined` 를 받으면 기본값을 잃는 경우가 있다 — `...(size && { size })` 처럼 있을 때만 펼친다.
- **상태**는 대상 요소에 `data-hover` · `data-active` · `data-focus-visible` 을 붙여 만든다(원본도 새 부품도 이 속성을 보게 variant 를 만든다). 대상이 첫 요소가 아니면 `data-gallery-target`.
- **body 에 그려지는 부품**(창 · 시트 · 메뉴 · 팝오버)은 `page: { width, height }` — 열린 채(`defaultOpen`)로 그리고, `pairs` 에 `[원본 선택자, 새 선택자]` 짝을 적는다.
  움직임 값은 짝마다 늘 견주고, 그림이 다르면 짝의 모든 계산된 스타일 차이를 알려 준다. 폭에 따라 모양이 바뀌면 폭마다 칸을 둔다(모바일 412 · 경계값 · 데스크톱).
- **알려진 차이**는 `known: '까닭'` — 그 칸은 달라도 실패가 아니고, 도리어 같아지면 실패한다(그때 지운다). 받아들이기로 _정한_ 차이에만 쓰고 진행 문서에도 적는다.

## 견주는 환경을 맞추는 장치 (부품이 아니라 환경의 문제)

| 장치                                                                                | 왜                                                                                                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 두 칸을 같은 자리에 번갈아 놓고 찍는다                                              | 자리가 다르면 둥근 가장자리의 픽셀이 한두 개씩 다르게 칠해진다(원본끼리도)                                                                 |
| 다르면 몇 장 더 찍어, 한쪽 그림이 다른 쪽에서도 나오면 같다고 본다                  | 초점 링 · 줄어든 요소는 같은 화면도 두 가지로 찍힌다                                                                                       |
| `WithoutHelperLayers` — Base UI 의 초점 지킴이 · 뒤 배경 막을 화면 밖 처리만 바꾼다 | 그 요소들 때문에 Chrome 이 층을 나눠 합치며 둥근 모서리 가장자리 픽셀이 1/255 달라진다                                                     |
| `Settled` — 열린 동안 `animation-delay: -1s`                                        | `will-change: transform` 요소는 들어오는 도중 언제 처음 그려졌느냐에 따라 글자 가장자리가 달라진다. 견주는 값(이름 · 시간 · 이징)은 그대로 |
| 스크롤 위치로 값을 보여 주는 부품(휠)은 칸마다 `page`                               | `display: none` 으로 숨기면 스크롤 위치가 지워진다                                                                                         |

장치를 더할 때는 **원본과 새 부품 양쪽에 똑같이** 걸고, 부품의 스타일은 건드리지 않는다.

## 동작 대조 — 픽셀로 안 드러나는 것

끌기 · 여는 시점 · 키보드 · 초점은 갤러리 그림으로 안 잡힌다. Playwright 로 원본 칸과 새 칸에 **같은 입력**을 넣고 결과를 표로 비교한다.
일회성 스크립트로 충분하다(레포에 넣지 않아도 된다).

```js
// 끌어서 닫기 — 마우스 · 터치, 조금 / 1/4 넘게 / 절반 넘게 / 빠르게 / 반대쪽
for (const input of ["mouse", "touch"])
  for (const [fraction, durationMs] of [
    [0.15, 600],
    [0.35, 900],
    [0.6, 900],
    [0.22, 30],
    [-0.2, 400],
  ])
    for (const side of ["seed", "next"]) {
      // page.goto(`/gallery.html?case=bottom-sheet/irb-pick-412&side=${side}`)
      // 마우스: page.mouse.down → move 여러 번(사이에 sleep) → up
      // 터치: CDP Input.dispatchTouchEvent(touchStart / touchMove / touchEnd), context 는 hasTouch: true
      // 놓은 뒤 0 · 60 · 120 · 260 · 500ms 에 위치와 닫힘을 기록 → 원본과 결과(닫힘/되돌아감)가 같은지
    }

// 여는 시점 — 누르고만 있음 / 뗌 / 다시 누르고 뗌 / Enter / 누른 채 밖에서 뗌 / 항목 고르기
```

- 입력값은 **경계에서 떨어지게** 고른다. 25% 기준을 30% 로 시험하면 터치의 처음 10~15px(브라우저 · Base UI 가 삼킨다) 때문에 결과가 흔들린다.
- 전체 갤러리 화면(`?only=`)에는 원본 · 새 칸이 같이 있다 — 요소를 찾을 때 숨은 쪽을 잡지 않게 `:visible` 이나 칸 선택자로 좁힌다.
- 결과는 진행 문서에 표로 남긴다(무엇을 · 어떤 입력으로 · 원본/새 결과).
