# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La persona que entra lleva su propio dinero: consulta y registra sus ingresos y gastos. Cada cuenta tiene su libro. No se comparte con otras.

El rol `super` solo administra cuentas: activa o desactiva usuarios. No puede desactivar a un super que ya está activo. No usa el libro como trabajo principal.

## Product Purpose

App web para que cada cuenta vea sus finanzas y deje los movimientos bien registrados en la misma app: ingresos, gastos y tendencias de un periodo, más capturar y editar movimientos.

Éxito: la persona entiende el periodo y puede corregir el movimiento aquí, sin otra herramienta.

## Positioning

Cada cuenta autenticada ve y edita solo su dinero. Cualquiera puede crear su cuenta. Super administra quién está activo y no puede apagar a un super activo.

No hay un diferenciador de mercado aparte de ese mecanismo. No inventar uno.

## Operating Context

- Navegador, contra un backend GraphQL (Nest) con JWT.
- El front guarda `accessToken` en `localStorage` (`fp.accessToken`) y lo envía como `Authorization: Bearer`.
- Sin token, o si el API responde `UNAUTHORIZED` con sesión activa, vuelve a `/login`. Al entrar al shell llama a `me`.
- Cerrar sesión llama a `logout` en el backend y borra el token local.
- El dashboard filtra por rango de fechas y muestra ingresos, gastos y gráficas.
- Capturar y editar movimientos es parte del trabajo. El cliente GraphQL ya define `createMovement` y `updateMovement`. Esa pantalla aún no existe. El sidebar enlaza `/movements` y esa ruta no está en el router.
- Desarrollo: `npm start` en `http://localhost:4200`. GraphQL por defecto en `http://localhost:3001/graphql`.

## Capabilities and Constraints

- Interfaz en español. Montos en MXN, formato `es-MX`. Es compromiso.
- Roles `user` y `super`. Un super activo no se desactiva desde la pantalla de usuarios.
- Registro en `/register` y login en `/login`. El alta crea un usuario con rol `user` y abre sesión con el token que devuelve `register`.
- Datos por GraphQL sobre HTTP (`HttpClient`, sin Apollo).
- Pantallas actuales: `/login` y `/register` (invitados), `/dashboard` (con token), `/users` (solo super).
- Abierto: tema visual. Hoy el README deja solo tema claro. No quedó como compromiso.

## Brand Commitments

Nombre: Finanzas personales. No hay voz, logo ni otra identidad confirmada.

## Evidence on Hand

- App en este repo: login, registro, dashboard de movimientos, administración de usuarios.
- Moneda real en dashboard y gráficas: `Intl.NumberFormat('es-MX', { currency: 'MXN' })`.
- Consultas y mutaciones de movimientos en `src/app/features/movements/movements.interface.ts`.
- No hay testimonios, precios, casos ni material de marketing. No inventarlos.
- `DESIGN.md` son notas de UI con valores `TODO`. No es verdad de producto.

## Product Principles

- El dinero de cada cuenta es solo de esa cuenta.
- Ver el periodo y corregir el movimiento pasan en la misma app.
- Español y MXN no se cambian de paso.
- Se entra por login o por registro. Super decide quién está activo, y un super activo no se apaga solo.
- Lo no confirmado se queda abierto. No se inventan pruebas ni diferenciadores.
