# DESIGN.md — Finanzas Personales (Frontend)

> Documento de contexto de diseño. Los agentes (Impeccable, Cursor, Claude Code) deben respetarlo y **extender** este sistema en lugar de inventar uno nuevo.
> Los valores marcados con `TODO` son propuestas iniciales: ajústalos a tu gusto.

## 1. Stack de UI (no negociable)

- **Framework:** Angular 21, componentes standalone, control flow moderno (`@if`, `@for`) y signals.
- **Estilos:** Tailwind CSS como base. Prohibido CSS custom salvo que Tailwind no pueda expresarlo.
- **Componentes:** Flowbite + flowbite-angular. Antes de crear un componente propio, revisar si Flowbite ya lo ofrece.
- **Gráficas:** ApexCharts (vía `ng-apexcharts`). No introducir otras librerías de gráficas.
- **Iconos:** los de Flowbite (SVG). No mezclar sets de iconos.

## 2. Propósito y tono

App de control de finanzas personales: registrar ingresos y gastos, ver balances y tendencias.

- **Personalidad:** clara, serena, confiable. Es dinero: la claridad pesa más que el adorno.
- **Prioridad:** legibilidad de números, jerarquía evidente, cero ruido visual.
- **Evitar:** gradientes decorativos, glassmorphism, sombras pesadas, animaciones que distraigan, fondos con cuadrículas decorativas.

## 3. Color

Usar la paleta de Tailwind; definir los roles semánticos una sola vez (en `tailwind.config` o `@theme`) y reutilizarlos.

| Rol | Uso | Propuesta (`TODO`) |
|---|---|---|
| `primary` | Acciones principales, enlaces, foco | `blue-600` (Flowbite por defecto) |
| `income` | Ingresos, saldos positivos | `emerald-600` |
| `expense` | Gastos, saldos negativos | `rose-600` |
| `warning` | Presupuesto cerca del límite | `amber-500` |
| `neutral` | Texto, bordes, superficies | escala `gray` / `slate` |

Reglas:
- El color **nunca** es el único indicador: acompañar con signo (+/−), icono o texto (accesibilidad).
- Contraste mínimo WCAG AA (4.5:1 texto normal).
- Soportar **modo claro y oscuro** (`dark:` de Tailwind / Flowbite dark mode). Toda pantalla nueva debe verse bien en ambos.
- Las series de ApexCharts usan los mismos roles semánticos (ingresos = `income`, gastos = `expense`), no colores arbitrarios.

## 4. Tipografía

- **Familia:** una sola sans-serif legible (`TODO`: Inter o la fuente por defecto de Flowbite).
- **Números:** usar `tabular-nums` (`font-variant-numeric`) en montos, tablas y gráficas para que las cifras alineen.
- **Escala sugerida:**
  - Saldo / cifra destacada: `text-3xl` o `text-4xl`, `font-semibold`
  - Títulos de sección: `text-xl`, `font-semibold`
  - Cuerpo: `text-base`
  - Etiquetas y metadatos: `text-sm`, color `neutral` atenuado
- No más de 3 tamaños distintos por pantalla.

## 5. Espaciado y layout

- Usar la escala de Tailwind (múltiplos de 4px). No valores arbitrarios (`p-[13px]`).
- Contenedor con ancho máximo en escritorio; tarjetas con `rounded-lg`, borde sutil y poca sombra.
- Diseño **mobile-first**; breakpoints estándar de Tailwind (`sm`, `md`, `lg`, `xl`).
- Tablas largas: en móvil convertir a lista de tarjetas o permitir scroll horizontal contenido.

## 6. Componentes clave

- **Tarjeta de resumen** (saldo, ingresos del mes, gastos del mes): cifra grande, etiqueta pequeña, variación respecto al periodo anterior.
- **Tabla / lista de transacciones:** fecha, categoría, descripción, monto alineado a la derecha con color semántico; filtros arriba.
- **Formularios** (nueva transacción, categorías): etiquetas visibles, validación en línea, errores descriptivos, botón primario único por vista.
- **Gráficas (ApexCharts):**
  - Línea/área para tendencias, barras para comparar periodos, dona solo con pocas categorías.
  - Tooltips con el monto formateado; ejes con etiquetas legibles; sin 3D ni efectos.
  - Tema de ApexCharts sincronizado con modo claro/oscuro.
- **Estados vacíos, de carga y de error** obligatorios en cada vista (skeleton o spinner de Flowbite, mensaje claro, acción sugerida).

## 7. Datos y localización

- Idioma de la interfaz: español. `TODO`: confirmar moneda (propuesta: MXN) y configurar `LOCALE_ID` (`es-MX`).
- Formatear montos con `CurrencyPipe` / `Intl.NumberFormat`, nunca concatenando strings.
- Fechas con `DatePipe` en formato local y consistente en toda la app.
- Egresos mostrados con signo negativo o etiqueta explícita; ingresos con signo positivo.

## 8. Movimiento

- Mínimo y con propósito: transiciones de 150–200 ms en hover, foco, apertura de menús y modales.
- Animación de entrada de gráficas permitida, breve y desactivable.
- Respetar `prefers-reduced-motion`.

## 9. Accesibilidad e interacción

- Foco visible en todos los elementos interactivos.
- Áreas táctiles de al menos 44×44 px en móvil.
- Navegación completa por teclado; roles/ARIA correctos en modales, menús y tablas.
- Gráficas con alternativa textual o tabla de datos accesible.

## 10. Convenciones de código

- Un componente standalone por archivo; `ChangeDetectionStrategy.OnPush` y signals por defecto.
- Clases de Tailwind en la plantilla; extraer a componente (no a `@apply`) cuando se repitan.
- Usar los componentes de Flowbite como base y personalizarlos con utilidades de Tailwind, sin sobrescribir sus estilos internos.
- Cualquier nuevo token (color, tamaño, radio) se documenta primero en este archivo.

## 11. Anti-patrones (no hacer)

- Paletas nuevas fuera de los roles definidos.
- Mezclar librerías de componentes o de gráficas.
- Texto gris claro sobre fondo claro (bajo contraste).
- Pantallas con más de una acción primaria compitiendo.
- Tarjetas anidadas dentro de tarjetas.
- Decoración que no comunique información.