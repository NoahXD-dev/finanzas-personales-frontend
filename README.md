# Finanzas personales (frontend)

Dashboard web para consultar y gestionar finanzas personales. Consume un backend GraphQL con autenticación JWT: login, rutas protegidas y peticiones autenticadas con `Authorization: Bearer`.

## Stack

- Angular 21 (standalone)
- Tailwind CSS 4, Flowbite y flowbite-angular
- ApexCharts (gráficas de barras y líneas en el dashboard)
- `HttpClient` para GraphQL (sin Apollo)

## Requisitos

- Node.js (LTS recomendado)
- npm
- Backend GraphQL en ejecución, por defecto en `http://localhost:3001/graphql`
- CORS habilitado en el backend para `http://localhost:4200` (incluye el header `Authorization`)

## Configuración

La URL del backend GraphQL vive en `src/environments/`:

| Comando | Archivo que usa Angular |
|---------|-------------------------|
| `npm start` (`ng serve`, configuración `development`) | `environment.development.ts` |
| `npm run build` (`ng build`, configuración `production`) | `environment.ts` |

Por defecto ambos apuntan a `http://localhost:3001/graphql`. Para producción, edita `graphqlUrl` en `environment.ts`.

## Scripts

```bash
npm install
npm start          # http://localhost:4200
npm run build
npm test
```

## Autenticación

El backend Nest emite un JWT en las mutaciones `login` y `register`. Este front:

1. Guarda el `accessToken` en `localStorage` (`fp.accessToken`).
2. Adjunta `Authorization: Bearer <token>` en todas las peticiones GraphQL salvo login.
3. Redirige a `/login` si no hay token (`authGuard`) o si el API responde `UNAUTHORIZED` con sesión activa.
4. Llama a `me` al entrar al shell autenticado para rehidratar el usuario.

Rutas:

| Ruta | Acceso |
|------|--------|
| `/login` | Solo invitados (`guestGuard`) |
| `/dashboard` | Requiere token (`authGuard`, dentro del shell con sidebar) |

Cerrar sesión ejecuta la mutación `logout` del backend (invalida el token vía `tokenVersion`) y borra el token local.

## Estructura relevante

```
src/app/
  core/
    auth/                Token, AuthService, interceptor, guards
    graphql/             Cliente HTTP GraphQL y errores con código
  features/
    auth/login/          Página de inicio de sesión
    dashboard/           Resumen, gráficas y tabla de movimientos
    movements/           Modelo y servicio de movimientos
  layout/
    app-shell/           Sidebar + área de contenido autenticada
    app-sidebar/         Navegación y cierre de sesión
  shared/
    data-table/          Tabla genérica (Flowbite)
    bar-chart/           Gráfica de barras (ApexCharts)
    line-chart/          Gráfica de líneas (ApexCharts)
    date/                Selector de rango de fechas
```

## Tema

Por ahora solo tema claro. El modo oscuro de Tailwind queda desactivado salvo que se añada la clase `dark` en el HTML.
