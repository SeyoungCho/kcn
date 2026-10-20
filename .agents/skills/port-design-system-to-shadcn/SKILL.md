---
name: port-design-system-to-shadcn
description: 외부 디자인 시스템(UI kit — 예: SEED)의 부품을 shadcn 방식(Base UI + Tailwind CSS 4 + cva + cn)으로 다시 만들 때 쓴다. 원본과 픽셀 · 움직임까지 같게 옮기면서 코드는 shadcn 부품처럼 보이게 하는 절차, 결정론적인 일과 판단이 필요한 일의 구분, 원본과 견주는 방법(갤러리), 테스트, 자주 빠지는 함정을 담았다. 새 부품을 만들거나, 원본과 다른 점을 고치거나, 디자인 시스템을 통째로 이식할 계획을 세울 때 읽는다.
user-invocable: true
argument-hint: "[부품 이름 또는 질문]"
---

# 외부 디자인 시스템 → shadcn 이식

목표는 둘이고, 둘 다 지켜야 끝난다.

1. **보이는 것은 원본과 같다.** 모양 · 치수 · 색 · 글자 · 움직임 · 이징이 원본과 같은 값이어서, 화면만 보고는 원본으로 만든 것인지 새로 만든 것인지 가릴 수 없다.
   마크업 · DOM 은 달라도 된다.
2. **코드는 shadcn 부품이다.** 파일을 연 사람이 "shadcn 부품에 테마만 다르게 입혔다"고 느껴야 한다. 원본의 코드를 옮겨 적은 흔적
   (BEM 클래스, 원본의 상태 기계, 원본 이름의 내부 함수, 인라인 스타일 값)이 보이면 실패다.

원본을 **보고** 만들되 원본을 **옮겨 적지** 않는다. 원본에서 가져오는 것은 값(토큰 · 치수 · 타이밍)과 결과(어떻게 보이고 움직이는가)이고,
짜임과 동작은 shadcn · Base UI 의 방식으로 새로 쓴다.

실제로 한 이식(hm-admin 레포 `~/healthmatch/hm-admin`, 브랜치 `feat/admin-renewal`): SEED Design → `src/components/ui`(부품 39개),
토큰 `src/styles/theme.css`, Tailwind 연결 `src/styles/global.css`, 진행 기록 `docs/admin-renewal.md`. 원본과 견주던 갤러리(`src/gallery` +
`e2e/gallery.spec.js`)는 이식이 끝나 원본 패키지와 함께 걷어냈다 — 커밋 `da5afba` 에서 볼 수 있다(`git show da5afba:e2e/gallery.spec.js`).
막히면 이 파일들이 실례다. 이 문서와 `references/` 에서 "이 레포"는 hm-admin 을 말한다.

### kcn 에서 쓸 때

kcn 은 레지스트리마다 패키지가 따로 있다. hm-admin 의 경로를 아래처럼 바꿔 읽는다.

| hm-admin                                      | kcn                                                                                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/<부품>.tsx`                | `packages/registries/<레지스트리>/src/components/ui/<부품>.tsx`                                                                                     |
| `src/styles/theme.css` · `global.css`         | `packages/registries/<레지스트리>/src/styles/theme.css` · `global.css`                                                                              |
| `src/lib/utils.ts` 의 `cn`                    | `packages/registries/<레지스트리>/src/lib/utils.ts`                                                                                                 |
| `src/lib/use-xxx.ts` 같은 공용 훅 · 순수 함수 | `packages/registries/<레지스트리>/src/lib/`                                                                                                         |
| 갤러리 · 미리 보기                            | 문서 사이트의 iframe 미리 보기(`apps/website/src/app/preview/<레지스트리>/`, 루트 `AGENTS.md` 참고). 원본과 견주는 갤러리를 따로 둘지는 그때 정한다 |

- 부품 소스는 소비자가 복사해 쓰는 shadcn 스니펫이기도 하다. import 는 `@/components/ui/*` · `@/lib/utils` 처럼 소비자 기준으로 둔다.
- 토큰 · Tailwind 연결은 `generate-registry-css-files` · `integrate-external-design-tokens` 스킬, 문서 페이지는 `add-registry-component-docs`,
  새 레지스트리를 문서 사이트에 잇는 일은 `wire-registry-to-fumadocs-docs` 스킬과 같이 쓴다.
- npm 스크립트(`npm test` · `npm run e2e` …)와 "원격 CI 에 붙이지 않는다" 같은 규칙은 hm-admin 의 것이다. kcn 에서는 `pnpm` 과 루트 `AGENTS.md` 를 따른다.

## 0. 시작 전에 준비할 것

- **원본을 돌릴 수 있게 둔다.** 원본 패키지(CSS · 컴포넌트)를 devDependency 로라도 깔아 두어야 나란히 그려 견줄 수 있다. 이식이 끝나면 걷어낸다.
- **원본의 타입 · 문서를 모은다.** props 이름 · 기본값 · 변형 목록의 출처다. 공식 TS 스니펫이 있으면 그것이 "새 부품이 받아야 할 props 목록"이 된다.
- **shadcn 설정** — `components.json`(Base UI 판 style), `@/lib/utils` 의 `cn`, `@/components/ui` 경로. `npx shadcn@latest add <부품>` 으로 받은
  shadcn 원본이 있으면 그 파일의 짜임을 뼈대로 쓴다.
- **소비자 화면의 기준선** — 이식한 부품을 실제로 쓸 화면이 있으면, 갈아 끼우기 _전에_ 그 화면의 픽셀 기준 그림을 떠 둔다.

## 1. 결정론적인 일 — 값을 옮기고 기계로 확인한다

판단이 필요 없고, 맞았는지 도구로 확인할 수 있는 일이다. 사람의 취향을 섞지 않는다.

| 일            | 방법                                                                                                                                                                                                                                 | 확인                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| 토큰 값       | 원본 CSS 변수를 이름의 접두사만 바꿔 1:1 로 `theme.css` 의 `:root` 에 옮긴다. 갈래별로(팔레트 → 시맨틱 색 → 치수 → 반경 → 글자 크기 · 줄 높이 → 움직임 → 그림자)                                                                     | 원본 변수 목록과 대조(스크립트로 값 diff)              |
| Tailwind 연결 | `global.css` 의 `@theme inline reference` 에서 토큰을 Tailwind 이름공간에 잇는다(`--color-fg-neutral: var(--fg-neutral)`, `--spacing-x4`, `--text-t4` + `--text-t4--line-height` …). `--color-*: initial` 로 Tailwind 기본 색을 끈다 | 클래스가 생성되는지(`bg-bg-brand-solid`)               |
| `cn` 등록     | 새 눈금(치수 · 글자 크기 · 반경 · 그림자 · duration · ease)을 `src/lib/utils.ts` 의 `createCn` 목록에 같이 적는다                                                                                                                    | `utils.test.ts` — 서로 다른 속성의 클래스가 살아남는지 |
| 키프레임      | 원본의 `@keyframes` 를 **이름까지 그대로** `global.css` 에 옮긴다(갤러리가 animation-name 을 견준다)                                                                                                                                 | 갤러리의 움직임 대조                                   |
| 부위 이름     | 원본의 부위(`.seed-dialog__content`)를 `data-slot="dialog-content"` 로. 모든 요소에 `data-slot`                                                                                                                                      | 갤러리 `pairs` 가 짝을 찾는지                          |
| props 표면    | 원본 타입의 이름 · 기본값 · 변형 값을 그대로 받는다(`size="medium"`, `variant="neutralSolid"`)                                                                                                                                       | 타입 검사, 갤러리에 같은 props 로 그려 보기            |
| 정적 스타일   | 요소마다 계산된 스타일이 같게 — 클래스로 적는다                                                                                                                                                                                      | 갤러리 픽셀 0 + 스타일 diff                            |
| 상태 조건     | 원본이 상태를 거는 선택자(`:active`, `[data-hover]`, `[data-focus-visible]` …)를 그대로 `@custom-variant` 로 만든다(`pressed:` · `hovered:` · `engaged:` · `focused:`)                                                               | 갤러리 `states: ['hover', 'active', 'focus']`          |

원칙: **값은 토큰에만 있다.** 부품에는 값을 적지 않고 클래스로 쓴다(`p-x4` · `text-t4` · `rounded-r2` · `duration-d3`). 토큰에 없는 값만 `[…]` 로 적고,
왜 토큰이 아닌지 주석을 단다. 색은 시맨틱 토큰을 먼저, 맞는 것이 없을 때만 팔레트.

## 2. 판단이 필요한 일 — 고르고, 시험하고, 기록한다

정답이 하나가 아니고 도구가 대신 정해 주지 않는 일이다. **고른 까닭과 남은 차이를 반드시 기록한다**(진행 문서 + 갤러리의 `known`).

- **어떤 Base UI 부품 위에 세울지.** 원본의 이름이 아니라 동작으로 고른다. 예: 원본 SidePanel 은 끌어서 닫히는 drawer 였다 →
  처음에 `dialog` 로 만들었다가 끌기를 잃어 `drawer` 로 다시 만들었다. 고르기 전에 원본의 상호작용(끌기 · 관성 · 초점 · 바깥 누르기 · Esc)을 목록으로 적는다.
- **손맛 · 동작.** 제스처의 기준(얼마나 끌어야 닫히나), 되돌아가는 시간, 여는 시점(누를 때 / 뗄 때), 닫으면 내용을 남기는지(keepMounted),
  들어오고 나가는 움직임의 수명(Base UI 의 `data-starting-style` / `data-ending-style` 냐 원본의 keyframes 냐). 원본과 나란히 직접 해 보고 정한다.
- **라이브러리가 값을 박아 둔 곳.** Base UI 가 prop 없이 상수로 둔 동작은 원본 코드를 옮겨 오지 말고 **공개된 틈**으로 덧댄다:
  이벤트 핸들러 병합 순서와 `event.preventBaseUIHandler()`, `actionsRef`, Base UI 가 내보내는 CSS 변수(`--drawer-swipe-movement-y` …)와
  data 속성(`data-swiping` · `data-open`). 예: `src/lib/use-drawer-swipe-release.ts`(놓을 때의 판정만 원본 기준으로), `src/lib/open-on-release.ts`.
- **받아들일 차이.** 맞추는 비용이 크고 사용자가 거의 느끼지 못하면 받아들이고 기록한다. 받아들일지는 사람(제품 책임자)이 정한다 —
  차이마다 "무엇이 다른가 · 어디서 닿는가 · 권장"을 표로 올려 묻는다.
- **원본의 버그.** 원본의 문제(값을 잃는 prop, 반 픽셀 어긋남 …)를 따라 할지 고칠지 정한다. 소비자 화면이 그 버그에 기대고 있으면 따라 하고, 아니면 고치되
  갤러리에서 그 칸을 빼거나 `known` 으로 적는다. 어느 쪽이든 기록한다.
- **API 모양.** shadcn 은 납작한 이름을 쓴다: `Field.Root` → `Field`, `TextField.PrefixIcon` → `TextFieldPrefixIcon`. `asChild` → Base UI 의 `render`.
  소비자가 고칠 곳 목록(이름 변경 · prop 이동)을 진행 문서에 같이 적는다.
- **이름은 shadcn 의 것으로.** 원본과 같은 일을 하는 shadcn 부품이 있으면 원본 이름 대신 그 이름 · 그 부위 이름을 쓴다:
  BoardRow → `Accordion`(`AccordionItem` · `AccordionTrigger` · `AccordionContent`), BottomSheet → `Drawer*`, Modal → `Dialog*`,
  Menu → `DropdownMenu*`, ListRow → `Item*`, Loader → `Spinner`, Result → `Empty*`, SegmentedControl · Tab → `Tabs`(variant).
  prop 도 shadcn 의 이름(`variant` · `size` · `render`)과 값(`default` · `secondary` · `destructive` · `outline` · `ghost` · `link`)을 먼저 쓰고,
  shadcn 에 없는 것만 원본의 뜻을 살린 값을 더한다(t-flavored 의 Button `weak` · `dark`).

## 3. shadcn 부품처럼 보이게 — 반드시 지킬 짜임

리뷰어가 가장 먼저 보는 것이다. 모양이 같아도 이것이 어긋나면 다시 쓴다. 뼈대는 `references/component-anatomy.md`.

- 부품마다 `src/components/ui/<부품>.tsx` 한 파일. 이름 있는 함수 컴포넌트를 맨 아래에서 한 번에 `export { … }` 한다(변형 `xxxVariants` 도).
- 동작은 Base UI: `import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'`. 감싸는 함수는 얇게 — 클래스 · `data-slot` · 기본값만 더한다.
- 변형은 `cva` + `VariantProps`, 클래스는 `cn(xxxVariants({ … }), className)` — **`className` 이 맨 뒤**에 와서 쓰는 쪽이 이긴다.
- 요소마다 `data-slot="<부품>-<자리>"`. 소비자의 CSS 와 테스트가 이것을 잡는다.
- React 19 — `forwardRef` 를 쓰지 않는다(`ref` 는 그냥 prop). 다른 요소로 그릴 때는 `asChild` 가 아니라 `render`.
- props 타입은 `XxxPrimitive.Part.Props` 를 넓혀서 만든다. `any` 금지.
- 스타일은 클래스로만. `style={{}}` 은 CSS 변수를 넘길 때만(`'--layer-index': layerIndex`).
- 상태는 variant 로: `data-open:` · `data-checked:` · `data-disabled:` · `pressed:` · `engaged:` · `focused:`.
- 주석은 짧게, "왜"만. 원본의 이름 · 원본 파일 경로를 코드에 늘어놓지 않는다(한 줄 출처 표기는 괜찮다).

하지 말 것: 원본의 BEM 클래스를 다시 만들기, 원본 JS 로직(드래그 · 위치 계산)을 통째로 옮기기, 부품마다 CSS 파일 만들기,
`useState` 로 열림 · 선택 상태를 따로 쥐기(Base UI 가 쥔다), 원본의 `Root` · `Positioner` 같은 층을 이유 없이 그대로 늘어놓기.

## 4. 원본과 견주기 — 갤러리

눈으로 "비슷하다"는 통과가 아니다. **같은 props 로 원본과 새 부품을 나란히 그려 기계로 견준다.** 자세한 작성법은 `references/gallery.md`.

- `src/gallery/cases/<부품>.tsx` — 칸마다 `{ id, seed, next, states?, page?, pairs?, known? }`. 크기 × 색조 × 변형 × 상태를 빠짐없이.
- 견주는 것: 칸마다 **픽셀이 하나라도 다르면 실패**, transition · animation 값이 다르면 실패. 다르면 어느 요소의 어떤 계산된 스타일이 다른지 알려 준다.
- body 에 그려지는 부품(창 · 시트 · 메뉴)은 `page` 칸 — 원본 · 새 부품을 각각 한 화면에 열어 화면 전체를 견주고, `pairs` 로 요소 짝을 적는다.
- 픽셀로 안 드러나는 **동작**(끌기 · 여는 시점 · 키보드)은 Playwright 로 원본 · 새 부품에 같은 입력을 넣고 결과를 표로 견준다(`references/gallery.md` 의 '동작 대조').

```bash
GALLERY_ONLY=<부품> npx playwright test e2e/gallery.spec.js
```

## 5. 테스트

| 언제                                  | 무엇                                                                                                       |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 부품을 만들거나 고칠 때마다           | `GALLERY_ONLY=<부품>` 갤러리, `npm run typecheck`, `npm run lint`                                          |
| 원본의 로직을 옮겼을 때(달력 계산 등) | 그 로직을 `src/lib/` 의 순수 함수로 빼고 단위 테스트(`npm test`)                                           |
| 동작을 바꿨을 때                      | 원본 · 새 부품 동작 대조 스크립트 — 경계값에서 떨어진 입력으로(경계 바로 위 · 아래는 측정 잡음에 흔들린다) |
| 소비자 화면에 갈아 끼울 때            | 그 화면의 픽셀 기준선 대조(이 레포: `npm run build:dev` 뒤 `npm run e2e`, 허용 오차 0)                     |

테스트를 원격 CI 에 붙이지 않는다(이 레포의 규칙).

## 6. 자주 빠지는 함정

전체 목록과 증상 · 원인 · 해결은 `references/pitfalls.md`. 가장 자주 걸리는 것:

1. **Tailwind preflight 없이 쓰면 바탕값을 직접 적어야 한다** — `border-solid` · `box-border` · `m-0` · `font-[inherit]`. 원본이 버튼 글꼴을 안 정했으면 그것까지 같게.
2. **`cn` 이 모르는 눈금의 클래스를 지운다** — `text-t4`(크기)와 `text-fg-neutral`(색)을 같은 그룹으로 보고 하나를 버린다. 눈금을 `createCn` 에 등록한다.
3. **`:where()` 로 만든 variant 는 특이도가 0** — `data-closed:opacity-…` 가 기본 `opacity-…` 를 이긴다는 보장이 없다. 한 식으로 합치거나(`max()`) 속성 variant(`data-[x]:`)를 쓴다.
4. **Base UI 의 보이지 않는 요소가 픽셀을 바꾼다** — 창을 열면 초점 지킴이 · 뒤 배경 막이 더해져 둥근 모서리 가장자리가 1/255 달라진다. 갤러리에서는 치우고 견주고, 실제 화면은 정책으로 정한다.
5. **이벤트 핸들러 안에서 레이아웃을 읽으면 스타일이 그 자리에서 확정된다** — `offsetWidth` 를 읽은 뒤 transition 을 거는 속성을 붙이면 이미 늦다. 읽기는 먼저(capture), 쓰기는 나중에.
6. **Base UI 는 상수로 박은 동작이 많다** — Drawer 의 닫기 기준 50%, Menu · Select 는 누를 때 열기. 원본 코드를 옮기지 말고 공개된 틈으로 덧댄다(§2).
7. **controlled 값은 되돌아간다** — `value` 만 주고 `onValueChange` 를 안 주면 새 부품은 그 값으로 돌아가고, 원본(스크롤 위치로 값을 보여 주는 휠 등)은 안 돌아갈 수 있다.
   갤러리에서 손으로 만져 볼 칸은 `defaultValue` 나 상태를 단다.

## 7. 끝났는지 — 부품마다

- [ ] 갤러리 칸이 크기 × 색조 × 변형 × 상태를 다 덮고, 픽셀 · 움직임 대조를 통과한다(`known` 은 까닭과 함께 문서에도 있다)
- [ ] 동작(끌기 · 열기 · 키보드 · 초점)을 원본과 나란히 해 봤고, 다른 점은 기록했다
- [ ] 파일이 §3 의 짜임을 지킨다 — 처음 보는 사람이 shadcn 부품으로 읽는다
- [ ] 값이 부품에 박혀 있지 않다(토큰 클래스). 새 눈금은 `cn` 에 등록했다
- [ ] 소비자가 고칠 곳(이름 · prop 변경)을 진행 문서에 적었다
- [ ] `npm run typecheck` · `npm run lint` · `npm test` 통과
