# KVRVA | Software Engineering Studio

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-0_Errors-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

**KVRVA** es un estudio de ingeniería de software de alta gama especializado en el diseño, desarrollo y despliegue de soluciones digitales complejas: plataformas SaaS multi-tenant, arquitecturas backend escalables (FastAPI/NestJS), e integraciones avanzadas de Inteligencia Artificial (LLM, RAG y Computer Vision).

---

## 🚀 Stack Tecnológico

### Frontend & UI/UX
- **Core Framework**: React 19 + TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 8
- **Estilos & Tokens**: TailwindCSS v4 + CSS Custom Properties (Glassmorphism design system)
- **Animaciones & Micro-interacciones**: Framer Motion
- **Iconografía**: Lucide React

### Backend & Cloud Architecture (Servicios Integrados)
- **Python Framework**: FastAPI (Data Pipelines, AI Models & Microservices)
- **Node.js Framework**: NestJS (Enterprise Microservices & REST APIs)
- **Bases de Datos**: PostgreSQL & MongoDB
- **DevOps & Cloud**: Docker, Kubernetes (k8s), AWS & GCP

---

## 🧪 Pruebas Automatizadas & Calidad de Código

El repositorio cuenta con una suite integral de pruebas unitarias e integración impulsada por **Vitest** y **React Testing Library**:

- **Suite Unitarias e Integración**: `TranslationContext`, `Navbar`, `Hero`, `Services`, `AILab`, `Projects`, `Footer` y `App`.
- **Mocks Globales**: Configuración de `IntersectionObserver`, `ResizeObserver`, `matchMedia` y `HTMLCanvasElement` en `src/test/setup.ts`.

### Comandos de Verificación del Quality Gate:

```bash
# 1. Ejecutar Suite de Pruebas Automatizadas
npm run test

# 2. Ejecutar Linter de Código (0 errores / 0 warnings)
npm run lint

# 3. Verificación de Tipos TypeScript (Strict Mode)
npx tsc -b

# 4. Compilación de Producción
npm run build
```

---

## 🤖 Modelo de Trabajo Multiagente (Multi-Agent Operating Model)

El desarrollo del proyecto sigue una arquitectura de trabajo en paralelo dividida en 5 agentes especializados:

1. **👑 Agent 0: Lead Engineering & Integration Orchestrator**: Gestión de dependencias globales (`package.json`, `tsconfig.json`) y Quality Gates de compilación.
2. **🧪 Agent 1: QA & Automated Testing Specialist**: Mantenimiento de la suite de pruebas Vitest en `src/__tests__`.
3. **🎨 Agent 2: UI/UX & Micro-Animations Specialist**: Sistema de diseño responsive, modo oscuro/claro y animaciones Framer Motion.
4. **⚡ Agent 3: SEO, Accessibility & Performance Specialist**: Marcado semántico HTML5, datos estructurados **Schema.org (JSON-LD)**, metadatos OpenGraph y norma de accesibilidad WCAG (`:focus-visible`).
5. **🌐 Agent 4: i18n & Content Engineering Specialist**: Gestión del contexto bilingüe (Español / Inglés) en `TranslationContext.tsx`.

Para mayor detalle de la arquitectura, consultar la guía en [`docs/MULTIAGENT_ARCHITECTURE.md`](./docs/MULTIAGENT_ARCHITECTURE.md) y las reglas de workspace en [`.agents/AGENTS.md`](./.agents/AGENTS.md).

---

## 🔍 SEO & Accesibilidad

- **Structured Data (Schema.org)**: Etiquetado `ProfessionalService` en `index.html` para indexación mejorada en buscadores.
- **Navegación Accesible**: Indicadores `:focus-visible` explícitos para navegación por teclado.
- **Etiquetas Semánticas**: Uso estricto de `<header>`, `<main>`, `<section>`, `<footer>` y atributos `aria-label`.

---

## 📧 Contacto & Estudio

- **Sitio Web**: [https://kvrva.com](https://kvrva.com)
- **Email**: [contacto@kvrva.com](mailto:contacto@kvrva.com)
- **Teléfono**: +56 9 3087 6984
- **Ubicación**: Santiago, Chile (Disponible globalmente / Remote)

---
*© 2026 KVRVA Studio. Todos los derechos reservados.*
