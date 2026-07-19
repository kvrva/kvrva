# KVRVA Workspace Rules & Multi-Agent Guidelines

When working in the **KVRVA** repository (`/Users/julimart/kvrva`), follow these mandatory rules and standards:

## 1. Multi-Agent Team Architecture
- **Director of Engineering (Lead)**: Manages root dependencies (`package.json`, `vite.config.ts`, `tsconfig.app.json`) and runs final quality gates.
- **QA Automation Specialist**: Maintains the Vitest test suite (`src/test/setup.ts`, `src/__tests__/**/*.test.tsx`).
- **UI/UX Specialist**: Maintains Tailwind v4 + Framer Motion styling and responsive design.
- **SEO & Accessibility Specialist**: Maintains Schema.org JSON-LD in `index.html`, semantic HTML tags (`<main>`, `<header>`, `<section>`, `<footer>`), and `:focus-visible` WCAG compliance.
- **i18n Specialist**: Maintains `TranslationContext.tsx` bilingually (ES/EN) with strict TypeScript types (no `any`).

## 2. Quality Gate Verification Commands
Before completing any coding task, you MUST execute and pass all of the following commands:
- `npm run test` (Vitest suite must pass 100%)
- `npm run lint` (ESLint must report 0 errors and 0 warnings)
- `npx tsc -b` (TypeScript typechecker must report 0 errors)
- `npm run build` (Vite production build must succeed)

## 3. Testing & UI Contracts
- Always use `data-testid="..."` attributes for interactive components (`nav-menu-button`, `nav-logo`, `nav-theme-toggle`, `nav-lang-toggle`, `nav-contact-button`).
- Ensure all canvas-based or animation components maintain fallback mocks in `src/test/setup.ts`.
