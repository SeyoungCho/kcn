# Demo content — "Little Leaf"

Every registry's demos (seed, t-flavored, montage, and any new one) use the same original setting instead of the sample
content of the design system they were ported from. Never reuse the source system's examples (its products, services,
copy, FAQ, people or brand names) — readers should recognise one kcn world across all registries.

## The setting

**Little Leaf (리틀리프)** is a small houseplant shop with a plant-care companion app. People buy plants, pots and tools,
track watering for the plants they own, ask a plant-sitter to look after them while away, and share photos and reviews with
other plant owners. It is fictional — don't name real brands, payment services or companies.

Pick the part of the app that fits the component:

| Area               | Typical components                                                                   | Example content                                                                   |
| ------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Shop               | Card, Badge, Tabs/chips, Select, Combobox, Pagination, Skeleton, Rating, NumberField | product cards, categories, sort menus, quantity, reviews                          |
| Checkout & orders  | Field/Input, Textarea, RadioGroup, Checkbox, Table, Progress, Dialog, Toast          | shipping form, gift message, delivery options, order history, cancel confirmation |
| Care               | Calendar/DatePicker, Slider, Switch, Item/List, Alert, Tooltip                       | watering schedule, light hours, reminders, care tips                              |
| Plant-sitting      | Date range, Drawer/BottomSheet, Avatar                                               | trip dates, choosing a sitter                                                     |
| Community          | Avatar, Avatar group, Item, Empty                                                    | members, photo posts, comments                                                    |
| Account & settings | Item/List, Switch, DropdownMenu, AlertDialog, Separator                              | notifications, addresses, payment methods, log out                                |

## Shared vocabulary (use these so registries stay consistent)

**Plants** (ko / en / price):
몬스테라 델리시오사 / Monstera deliciosa / ₩32,000 · 스킨답서스 / Golden pothos / ₩14,000 · 올리브나무 / Olive tree / ₩58,000 ·
필레아 페페로미오이데스 / Chinese money plant / ₩18,000 · 스투키 / Snake plant / ₩24,000 · 아레카야자 / Areca palm / ₩46,000 ·
보스턴고사리 / Boston fern / ₩21,000 · 로즈메리 / Rosemary / ₩9,000

Short names for tight labels (chips, tabs, table cells): 몬스테라 / Monstera · 스킨답서스 / Pothos · 필레아 / Pilea ·
아레카야자 / Areca palm. Use the full name in titles and product cards.

**Plant-sitting**: 식물 시터 / plant-sitter · 돌봄 맡기기 / book a sitter · 여행 기간 / trip dates.

**Pots & tools**: 테라코타 화분 (S·M·L) / Terracotta pot (S·M·L) · 물뿌리개 / Watering can · 분갈이 흙 2L / Potting mix 2L ·
식물 영양제 / Plant food

**Categories**: 전체 · 관엽식물 · 다육·선인장 · 허브 · 꽃 · 화분·용품 / All · Foliage · Succulents · Herbs · Flowers · Pots & tools

**Badges / statuses**: 신상품 / New · 초보 추천 / Easy care · 반려동물 안전 / Pet-safe · 품절 임박 / Low stock · 할인 / Sale ·
결제 완료 / Paid · 배송 준비 중 / Preparing · 배송 중 / Shipped · 배송 완료 / Delivered · 취소됨 / Cancelled

**Delivery options**: 일반 배송 (2–3일) / Standard (2–3 days) · 새벽 배송 / Early-morning · 매장 픽업 / Store pickup

**Sort**: 추천순 / Recommended · 인기순 / Popular · 낮은 가격순 / Price: low to high · 최신순 / Newest

**People** (members, sitters, customers): 김하늘 Haneul Kim · 이도윤 Doyun Lee · 박서연 Seoyeon Park · 최민준 Minjun Choi ·
정유나 Yuna Jung · 한지호 Jiho Han. Order numbers look like `LL-2481`.

**FAQ seeds**: How often should I water? (물은 얼마나 자주 줘야 하나요?) · What if a plant arrives damaged? (배송 중에
다친 식물은 어떻게 하나요?) · Which plants are safe for pets? (반려동물에게 안전한 식물은?) · When should I repot? (분갈이는
언제 하나요?)

## Writing rules

- Realistic and a little playful, never jokey: copy a real plant shop could ship. Short — labels are labels, descriptions
  one sentence.
- Korean in 해요체; English in plain sentence case. en and ko say the same thing (not word-for-word).
- Same fact everywhere: a Monstera costs ₩32,000 in every registry; reuse the vocabulary above before inventing new items.
- Keep API-describing labels as they are — variant names, sizes (`작게 · 보통 · 크게`), states (`비활성화`, `로딩 중`) — those
  explain the component, not the setting.
- Placeholder images: `https://picsum.photos/seed/<word>/<w>/<h>`; avatars and photos need meaningful `alt` text.
- Error/validation copy explains what to do ("Enter a phone number with 10–11 digits").
- Dates: use dates around the current month; times in 24h for ko (`14:00`), 12h for en (`2:00 PM`) only when shown as text.
