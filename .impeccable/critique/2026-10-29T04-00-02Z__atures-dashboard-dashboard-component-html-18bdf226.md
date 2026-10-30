---
target: el dashboard principal
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
target_identity: "file:/Users/sistemas/Documents/proyectos/pruebas/finanzas-personales-frontend/src/app/features/dashboard/dashboard.component.html"
target_fingerprint: "sha256:40463a75a04f8a124eaaa88a25f302de0790129d35d226a4809977622c5d336c"
target_path: /Users/sistemas/Documents/proyectos/pruebas/finanzas-personales-frontend/src/app/features/dashboard/dashboard.component.html
timestamp: 2026-10-29T04-00-02Z
slug: atures-dashboard-dashboard-component-html-18bdf226
---
Method: dual-agent (A: f95f5976-d58a-4631-9b50-0d67cdd5db35 · B: ffaacea6-0780-45e9-ba9c-3c10a5ab5e82)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Hay «Cargando…» y alertas, pero al recargar el resumen desaparecen las tres tarjetas y ninguna cifra repite el periodo. |
| 2 | Match System / Real World | 2 | Ingresos, Gastos y Balance están en español y MXN. Desde/Hasta usan mm/dd/yyyy y la columna Tipo imprime el valor crudo del API. |
| 3 | User Control and Freedom | 2 | Se puede cambiar el rango y cerrar sesión. No hay vuelta a «este mes». Movimientos navega a /movements, ruta que no existe. |
| 4 | Consistency and Standards | 2 | El picker muestra 10/01/2026 y la columna Fecha usa es-MX. El gasto de la tarjeta se pinta por signo; en las gráficas, por rol. |
| 5 | Error Prevention | 3 | El mes actual es el default. Si Desde es posterior a Hasta, no se consulta y el aviso dice qué está mal. |
| 6 | Recognition Rather Than Recall | 2 | Desde y Hasta tienen etiqueta y el sidebar tiene texto. No hay atajos de periodo. El ítem activo dice Dashboard y el h1 dice Movimientos. |
| 7 | Flexibility and Efficiency | 1 | Un solo camino: dos fechas y scroll. Sin atajos, orden, filtro por tipo ni búsqueda. |
| 8 | Aesthetic and Minimalist Design | 2 | Tema claro, sin decoración. Balance pesa igual que Ingresos, Gastos y el h1. El título Movimientos está duplicado. |
| 9 | Error Recovery | 2 | El rango inválido se entiende. Los fallos de datos dicen «No se pudieron cargar…» más error.message, sin Reintentar. |
| 10 | Help and Documentation | 1 | Balance no dice que es ingresos menos gastos. No hay ayuda junto al periodo. |
| **Total** | | **19/40** | **Poor** |

## Design Specificity Verdict

**LLM assessment:** Plantilla de admin Flowbite con etiquetas de dinero. No está compuesta como el libro de una persona. Lo propio: tarjetas Ingresos, Gastos y Balance; series Por categoría y Por mes en #059669 y #dc2626; montos Intl es-MX / MXN; el rango abre en el mes en curso. Lo intercambiable: sidebar Dashboard / Movimientos / Cerrar sesión, h1 Movimientos repetido en la tabla, tabla genérica sin alinear ni teñir el monto, title FinanzasPersonalesFrontend, Desde/Hasta en mm/dd/yyyy.

**Deterministic scan:** `impeccable detect --json` sobre el HTML del dashboard, el rango de fechas, las dos gráficas, la tabla, el shell y el sidebar. Exit 0. `[]`. 0 hallazgos. El detector no vio el formato de fecha, el color por signo, la ruta muerta ni la gráfica sin alternativa: eso no está en sus reglas de marcado. Cero hallazgos no contradice la revisión. No hay falsos positivos que descartar.

**Visual overlays:** La inyección de `detect.js` (puerto 8400) corrió en `http://localhost:4200/login?returnUrl=%2Fdashboard`, no en el dashboard. Consola: `[impeccable] No anti-patterns found.` No hubo overlay visible. No hay credenciales de desarrollo en el repo. Computer Use no pudo abrir el navegador (Accesibilidad y Grabación de pantalla apagadas). No hay overlay fiable sobre el dashboard.

## Overall Impression

La consulta del mes está armada: rango, tres totales, dos gráficas y el listado. La lectura del dinero no es fiable. El periodo se escribe en formato de EE. UU., un gasto positivo se pinta de verde en la tarjeta y de rosa en la gráfica, y el monto de la fila no lleva signo. La oportunidad grande es que la primera pantalla diga el mes y el balance sin que María tenga que traducir fechas ni colores.

## What's Working

- Si Desde es posterior a Hasta, no se consulta. El texto es literal: «La fecha inicial no puede ser posterior a la final.»
- Por categoría y Por mes nombran Ingresos y Gastos, usan #059669 y #dc2626, formatean eje y tooltip en MXN, y esconden el toolbar.
- Cada recurso falla aparte (`role="alert"`). Un resumen roto no borra la tabla.

## Priority Issues

### [P1] El periodo está en mm/dd/yyyy
- **Why it matters:** El único control del periodo usa `FLOWBITE_PICKER_FORMAT = 'mm/dd/yyyy'`. Octubre se ve 10/01/2026–10/31/2026. Quien lee día/mes se equivoca de mes. La columna Fecha, en cambio, sale con `es-MX`.
- **Fix:** Escribir el periodo en palabras junto a las tarjetas («1–31 de octubre de 2026») y pasar el picker a fecha es-MX. Añadir Este mes y Mes anterior.
- **Suggested command:** $impeccable harden

### [P1] El signo del dinero no es fiable
- **Why it matters:** `amountColorClass` pinta de verde todo lo positivo. Si `totalExpense` viene en magnitud positiva, Gastos queda `text-success`, el mismo verde que Ingresos. En la tabla, Monto es solo `formatCurrency`, la celda es siempre `text-body`, y Tipo imprime el valor crudo. En las gráficas el gasto sí es #dc2626.
- **Fix:** Gastos siempre en rose, con magnitud y etiqueta. Balance sí por signo. En la fila: signo y color según el tipo, texto Ingreso o Gasto, monto a la derecha con `tabular-nums`.
- **Suggested command:** $impeccable colorize

### [P1] Movimientos del sidebar saca del libro
- **Why it matters:** El ítem Movimientos va a `/movements`. Esa ruta no está. La página que ya lista los movimientos se llama igual, y el h1 repite el h2 de la tabla. El ítem activo se llama Dashboard.
- **Fix:** Un solo nombre para esta consulta. El enlace no debe ir a una ruta vacía: o baja a la tabla de esta vista, o espera a que la pantalla de captura exista.
- **Suggested command:** $impeccable clarify

### [P1] Las gráficas no se leen sin verlas
- **Why it matters:** `#chartHost` no tiene nombre accesible ni una tabla con los mismos totales. Quien no ve el canvas no tiene Por categoría ni Por mes.
- **Fix:** Región con nombre («Ingresos y gastos por categoría», «Ingresos y gastos por mes») y una tabla equivalente, visible o en un disclosure.
- **Suggested command:** $impeccable audit

### [P2] Nada destaca el resultado del mes
- **Why it matters:** Balance, Ingresos, Gastos y el h1 están a `text-2xl`. Las tres tarjetas pesan igual. El periodo no está escrito arriba.
- **Fix:** El mes en palabras arriba. Balance a `text-3xl`. En pantallas bajas, las gráficas debajo del pliegue. Quitar el segundo título Movimientos o llamarlo Detalle.
- **Suggested command:** $impeccable layout

## Persona Red Flags

**Alex (power user):** No hay Este mes ni Mes anterior, ni atajo, ni orden, ni filtro en la tabla. Tiene que abrir dos fechas y leer 10/01/2026. Si busca el listado, Movimientos lo saca de la página que ya lo muestra.

**Sam (teclado y lector):** Desde y Hasta tienen label. La tabla tiene `scope="col"`. El sidebar tiene texto. Las dos gráficas son un div sin alternativa. Los inputs del rango quedan por debajo de 44 px. En móvil la tabla es scroll horizontal, no fichas. El title del documento es FinanzasPersonalesFrontend. ApexCharts no declara `prefers-reduced-motion`.

**María (su propio dinero, MXN):** Quiere el total del mes y fiarse del signo. El mes no está escrito. Un gasto positivo se pinta como éxito. En la fila el monto no trae signo. Balance no explica la resta. El nav le dice Dashboard, no el nombre de su mes. El nombre y el correo sí están al pie del sidebar.

## Minor Observations

- Al cambiar el rango, «Cargando…» sustituye las tarjetas. No hay skeleton.
- Los vacíos no repiten las fechas activas. «No hay movimientos registrados.» no distingue un mes vacío de un libro vacío.
- Los montos de tarjeta, tabla y eje no usan `tabular-nums`. Monto no va a la derecha.
- El estado activo del sidebar es solo `bg-neutral-primary-soft`.
- Hasta cuatro avisos de error pueden apilarse, todos con el mismo cromo y con `error.message`.

## Questions to Consider

- ¿Y si la primera línea fuera «Octubre 2026» y, arriba del pliegue, solo Ingresos, Gastos y Balance?
- ¿Y si un gasto no pudiera ser verde, y cada Monto llevara el signo antes que el color?
- ¿Y si Movimientos del sidebar y Movimientos del h1 fueran el mismo sitio?
