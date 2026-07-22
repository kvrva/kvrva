# KVRVA | Guía de Desarrollo e Ingeniería

Esta guía detalla el entorno de desarrollo, el sistema de calidad automatizado y el modelo de trabajo multiagente del estudio de ingeniería **KVRVA**.

---

## 🧪 Pruebas Automatizadas & Calidad de Código

El repositorio cuenta con una suite integral de pruebas unitarias e integración impulsada por **Vitest** y **React Testing Library**:

- **Suite Unitarias e Integración**: `TranslationContext`, `Navbar`, `Hero`, `Services`, `AILab`, `Projects`, `Footer` y `App`.
- **Mocks Globales**: Configuración de `IntersectionObserver`, `ResizeObserver`, `matchMedia` y `HTMLCanvasElement` en `src/test/setup.ts`.

### Comandos de Verificación del Quality Gate:

Antes de enviar cualquier cambio o realizar un pull request, debes ejecutar y pasar satisfactoriamente todos los siguientes comandos:

```bash
# 1. Ejecutar Suite de Pruebas Automatizadas
npm run test

# 2. Ejecutar Linter de Código (0 errores / 0 warnings)
npm run lint

# 3. Verificación de Tipos TypeScript (Strict Mode)
npx tsc -b

# 4. Compilación de Producción (Vite Build)
npm run build
```

---

## 🤖 Modelo de Trabajo Multiagente (Multi-Agent Operating Model)

El desarrollo del proyecto sigue una arquitectura de colaboración en paralelo dividida en 5 agentes autónomos especializados:

1. **👑 Agent 0: Lead Engineering & Integration Orchestrator**: Gestión de dependencias globales (`package.json`, `tsconfig.json`) y Quality Gates de compilación.
2. **🧪 Agent 1: QA & Automated Testing Specialist**: Mantenimiento de la suite de pruebas Vitest en `src/__tests__`.
3. **🎨 Agent 2: UI/UX & Micro-Animations Specialist**: Sistema de diseño responsive, modo oscuro/claro y animaciones Framer Motion.
4. **⚡ Agent 3: SEO, Accessibility & Performance Specialist**: Marcado semántico HTML5, datos estructurados **Schema.org (JSON-LD)**, metadatos OpenGraph y norma de accesibilidad WCAG (`:focus-visible`).
5. **🌐 Agent 4: i18n & Content Engineering Specialist**: Gestión del contexto bilingüe (Español / Inglés) en `TranslationContext.tsx`.

Para mayor detalle de las directrices y contratos técnicos de cada rol, consulta:
* [Arquitectura Multiagente Detallada](./MULTIAGENT_ARCHITECTURE.md)
* [Reglas del Workspace y Commits](../.agents/AGENTS.md)
