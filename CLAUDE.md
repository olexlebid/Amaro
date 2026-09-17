# Tanzschule Amaro — сайт (tanzschule-amaro.de)

> Цей файл лежить у корені репозиторію. Claude читає його на початку кожної сесії.
> Все, що в [дужках], — заповнити перед стартом. Оновлюй розділ «Журнал рішень» після кожного важливого рішення.

## 1. Про проєкт

- **Клієнт:** Tanzschule Amaro, Hannover-Badenstedt (Badenstedter Str. 132). Власники: Martin Priebe + дружина. Zertifizierte ADTV Tanzschule.
- **Аудиторії:** батьки дітей 3–12, підлітки 13–22 (Hip-Hop, Teams), наречені (Hochzeitstanz), дорослі пари (Gesellschaftstanz), B2B (оренда зали до 120 осіб).
- **Головна ціль сайту:** запис на безкоштовний пробний урок / курс через **Nimbus Cloud**.
- **Ролі (змішана модель):**
  - **Власники** (Martin + дружина) — через адмінку Keystatic редагують **тільки розклад і фото**: `schedule`, `gallery`, `team`.
  - **Я** (дизайнер) — через Claude Code: усі тексти, ціни, описи курсів, сторінки, дизайн, SEO, новини.
  - **Claude** — розробка, підтримка, зміни на моє прохання.
- **Сторінки:** Startseite, Kurse (агрегатор), Kindertanz & Hip-Hop, Schülerkurse, Gesellschaftstanz für Paare, Hochzeitstanz, Masterclass & Teams, Unser Team, Mediathek, Shop, FAQ, Raumvermietung, Kontakt, Impressum, Datenschutz, 404.
- **Детальна структура і тексти:** `/docs/structure.md`, дослідження — `/docs/research/`, дані й фінальні тексти — `/docs/content/`.
  - Згадки про Webflow у документах у `/docs` застаріли — актуальний стек описаний у цьому файлі.
  - `/docs/structure.md` частково українською: це зміст і логіка блоків, а не готовий копірайт. На сайт іде тільки німецький текст.
  - Оригінали медіа лежать у `/_source` (не в Git). Оптимізовані версії Claude кладе в `/src/assets`.

## 2. Мовні правила (обов'язково)

- **Весь текст на сайті — тільки німецькою** (UI, мікрокопі, alt-тексти, meta, помилки форм). Звертання: **[Du / Sie — узгодити з клієнтом]**.
- **Коментарі в коді — англійською.**
- Спілкування зі мною — українською.

## 3. Стек

- **Фреймворк:** Astro. Сторінки сайту — статичні; SSR-адаптер потрібен лише для маршруту адмінки `/keystatic`.
- **Стилі:** чистий CSS + CSS custom properties (токени з Figma). Без Tailwind.
- **CMS для власників:** Keystatic у GitHub-режимі + **Keystatic Cloud (free)** для входу без GitHub-акаунтів. Команда = 3 користувачі (я, Martin, дружина) — вкладаємось у безкоштовний ліміт. Контент зберігається як файли в репо (без lock-in).
- **Зображення з адмінки:** на старті зберігаються в Git. Якщо галерея сильно розростеться — розглянути Keystatic Cloud Images (Pro) або зовнішнє сховище.
- **Хостинг:** [Netlify — рекомендовано / інше з підтримкою serverless]. Звичайний webspace на IONOS не підходить (адмінці потрібен серверний маршрут). Push у `main` → автодеплой; кожен PR → preview URL.
- **Домен:** залишається на **IONOS** у Мартіна. НЕ переносимо — лише міняємо DNS-записи в день запуску.
- **Бронювання:** Nimbus Cloud (зовнішнє). Власну реєстрацію/оплату не будуємо.

## 4. Джерела правди для дизайну

- **Figma-файл:** https://www.figma.com/design/6uC4cxwQmVPEKHxzRDqcEW/Amaro
- **Заапрувлений дизайн готовий до імплементації:** https://www.figma.com/design/6uC4cxwQmVPEKHxzRDqcEW/Amaro?node-id=563-3893
- **Готові сторінки → фрейм:**
  - Startseite desktop: https://www.figma.com/design/6uC4cxwQmVPEKHxzRDqcEW/Amaro?node-id=563-3894&t=c7tTGKVELw2cQBnk-4 / mobile: https://www.figma.com/design/6uC4cxwQmVPEKHxzRDqcEW/Amaro?node-id=568-6016&t=c7tTGKVELw2cQBnk-4
  - [...]
- **Компоненти:** https://www.figma.com/design/6uC4cxwQmVPEKHxzRDqcEW/Amaro?node-id=516-425
- Токени (кольори, типографіка, відступи, радіуси) беремо з Figma Variables → `src/styles/tokens.css`.
- Якщо у Figma чогось немає (стан, брейкпоінт, анімація) — **спитати мене, не вигадувати.**
- **Анімація**
- Анімація буде надсилатись окремо по кожній секції в процессі імплементації: текстовий опис + референси

## 5. Структура репозиторію

```
/docs                  # briefs, research, structure (read-only for Claude unless asked)
/public                # favicon, robots.txt, static files
/src
  /assets              # images & video sources (optimized at build)
  /components          # reusable UI blocks (one component = one file)
  /content             # CMS-managed content (courses, team, news, gallery, faq...)
  /layouts             # base page layouts
  /pages               # routes
  /styles              # tokens.css, base.css, utilities.css
/redirects             # 301 map from old WordPress URLs
CLAUDE.md
```

## 6. Контент-модель

### 6.1 Редагують власники (зареєстровано в Keystatic)

| Колекція | Поля | Примітка |
|---|---|---|
| `schedule` | course (зв'язок з `courses`), weekday (select), timeStart, timeEnd, teacher (зв'язок з `team`), room, nimbusUrl, isActive | Тільки розклад. Описи й ціни — не тут |
| `gallery` | album, date, images[] (image + alt), parentalConsent (bool, обов'язкове) | Фото фестивалю, подій |
| `team` | name, role, photo, order, isActive | Біо тексти — у `team-bios` (редагую я) |

### 6.2 Редагую я через Claude (НЕ реєструвати в Keystatic)

| Колекція | Поля |
|---|---|
| `courses` | title, slug, category, ageGroup, description, price, packages, image |
| `team-bios` | teamRef, bio |
| `news` | title, date, cover, body, instagramUrl — пізніше автоматично з Instagram через Make |
| `testimonials` | name, segment, text, photo, consent (bool) |
| `faq` | question, answer, category |
| `pages` | тексти секцій кожної сторінки |
| `settings` | phone, email, address, openingHours, socialLinks |

### 6.3 Правила для адмінки власників

- **Назви полів, підказки та помилки в адмінці — німецькою**, простими словами (власники не технічні).
- Мінімум полів: тільки те, що справді змінюється. Select/зв'язки замість вільного тексту, де можливо.
- `alt` для кожного фото — обов'язковий (німецькою).
- Галерея не зберігається без `parentalConsent = true`, якщо на фото є діти.
- Підказка в полі фото: рекомендований розмір і що фото з телефону підходять.
- Верстка не повинна ламатися від довшого тексту, порожнього розкладу чи іншої кількості фото.

## 7. Конвенції коду

- **Класи:** BEM, тільки lowercase: `block`, `block__element`, `block--modifier`. Жодних `div1`, `section10`.
- **Розмітка секції:** `<section class="[name] section">` → `<div class="container">` → BEM-елементи. Паддінги по вертикалі — на секції; `max-width` і горизонтальні паддінги — тільки на `.container`.
- **Типографіка:** line-height і letter-spacing — в `em`. Шкала шрифтів — утиліти в `utilities.css`.
- **Кольори/відступи:** тільки через токени, без «магічних» hex у компонентах.
- **Шрифти:** локально, `woff2`, лише потрібні накреслення. Жодних Google Fonts CDN.
- **Ассети:** `lowercase_underscore` імена. Зображення через `astro:assets` (AVIF/WebP, width/height завжди задані).
- **JS:** тільки там, де без нього ніяк; кожен скрипт з коментарем англійською, що він робить.
- **Принципи:** DRY + KISS. Один компонент — одна відповідальність.

## 8. Якість (definition of done для кожної сторінки)

- Відповідає Figma на 1440 / [1024] / 390 px (скріншот-порівняння).
- Lighthouse mobile ≥ 95 (Performance, A11y, SEO, Best Practices), CLS < 0.1.
- **BFSG / WCAG 2.1 AA:** контраст, фокус з клавіатури, alt-тексти (німецькою), семантичні заголовки, `prefers-reduced-motion`.
- `npm run build` без помилок і попереджень.

## 9. Legal / DSGVO

- Жодних зовнішніх запитів без згоди: YouTube, Instagram, Google Maps — через 2-click consent або локальні заглушки.
- Nimbus-віджет: [посилання / iframe — уточнити, чи ставить cookies] → якщо так, під consent.
- Аналітика: [cookieless, напр. Plausible / немає]. Якщо cookieless — cookie-банер не потрібен для аналітики.
- Сторінки Impressum і Datenschutz — тексти від клієнта/генератора, Claude їх не пише сам.
- Фото дітей публікуються тільки з `parentalConsent: true`.

## 10. SEO

- Унікальні `title` / `description` для кожної сторінки (німецькою), Open Graph, `sitemap.xml`, `robots.txt`, canonical.
- Schema.org JSON-LD: DanceSchool / LocalBusiness, Course, FAQPage, BreadcrumbList.
- 301-редиректи зі старих WordPress-URL (`/redirects`) — обов'язково до запуску.
- Мова: тільки `de`, `<html lang="de">`.

## 11. Як Claude працює в цьому репо

1. Перед задачею — перечитати цей файл і релевантні фрейми Figma.
2. Нова задача → нова гілка → невеликі осмислені коміти.
3. Перед великою зміною — короткий план, чекати мого «ок».
4. Після зміни: `npm run build`, скріншоти desktop + mobile, короткий звіт що змінено.
5. **Перед початком будь-якої задачі — `git pull`**: власники комітять у `main` через адмінку.
6. Не змінювати вручну вміст `schedule`, `gallery`, `team` без мого прохання. Зміни **схеми** цих колекцій — тільки з міграцією існуючих записів.
7. Ніколи не комітити секрети/токени. `.env` — тільки локально.
8. Нове рішення (бібліотека, патерн, виняток) → записати в «Журнал рішень».

## 12. Команди

```bash
npm run dev      # local dev server
npm run build    # production build (must pass before any commit)
npm run preview  # preview production build locally
```

## 13. Деплой і запуск

- Preview: кожен PR отримує окремий URL → показую клієнту на погодження.
- Production: merge у `main` → автодеплой.
- Запуск: старий WordPress працює до останнього дня → перевірка редиректів → зміна DNS в IONOS → Search Console + новий sitemap.

## 14. Журнал рішень

| Дата | Рішення | Чому |
|---|---|---|
| [13.09.2026] | Custom code (Astro) замість Webflow | Без прив'язки до платформи, редагування через Claude + CMS |
| [13.09.2026] | Змішана модель редагування | Власники — розклад і фото; решта — дизайнер через Claude. Менше ризику зламати сайт, простіша адмінка |
| [13.09.2026] | Keystatic + Keystatic Cloud (free) | Вхід без GitHub для власників, 3 користувачі безкоштовно, контент у Git |
| [16.09.2026] | Blur-text реveal (Hero H1) — по слову: `filter:blur()` + opacity + translateY, CSS `@keyframes` + stagger через `animation-delay`, без бібліотек | Referenced reactbits.dev/text-animations/blur-text (React+Motion). Замінив попередній masked-heading (не сподобався клієнту, видалено). Trigger — той самий момент, що й зникнення прелоадера (`html.has-preloader`), як і решта hero-заходу; пропускається повторно в межах сесії (як і lockup). Fallback: без JS / `prefers-reduced-motion` — звичайний видимий текст без blur |
