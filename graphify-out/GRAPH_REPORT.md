# Graph Report - finanzas-personales-frontend  (2026-10-28)

## Corpus Check
- Corpus is ~7,535 words - fits in a single context window. You may not need a graph.

## Summary
- 346 nodes · 663 edges · 13 communities
- Extraction: 91% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App bootstrap and guards
- Dashboard movements UI
- Dev tooling and scripts
- Auth GraphQL session
- Movements GraphQL API
- Angular build targets
- ApexCharts bar and line
- Shell navigation and auth
- Users admin management
- GraphQL client and config
- Runtime npm dependencies
- Flowbite datepicker types
- Angular project config

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 27 edges
2. `AuthService` - 18 edges
3. `@angular/router` - 16 edges
4. `TokenStore` - 12 edges
5. `Movement` - 12 edges
6. `FlowbiteDateRangeComponent` - 12 edges
7. `Dashboard movements view` - 12 edges
8. `DashboardComponent` - 10 edges
9. `MovementsService` - 10 edges
10. `ManagedUser` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Super role gate` --semantically_similar_to--> `superGuard()`  [INFERRED] [semantically similar]
  src/app/layout/app-sidebar/app-sidebar.component.html → src/app/core/auth/super.guard.ts
- `fp.accessToken` --references--> `TokenStore`  [INFERRED]
  README.md → src/app/core/auth/token.store.ts
- `Date range picker` --references--> `FlowbiteDateRangeComponent`  [INFERRED]
  README.md → src/app/shared/date/flowbite-date-range.component.ts
- `Root router outlet` --conceptually_related_to--> `App`  [INFERRED]
  src/app/app.html → src/app/app.ts
- `HTML document` --references--> `App`  [INFERRED]
  src/index.html → src/app/app.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **JWT session flow** — readme_jwt_auth, readme_access_token, readme_auth_guard, readme_guest_guard, readme_me_query, readme_logout, readme_login_route [EXTRACTED 1.00]
- **Dashboard period report** — src_app_features_dashboard_dashboard_component_dashboard_view, src_app_features_dashboard_dashboard_component_movement_summary, src_app_shared_date_flowbite_date_range_component_range_picker, src_app_shared_bar_chart_bar_chart_component_chart_shell, src_app_shared_line_chart_line_chart_component_chart_shell, src_app_shared_data_table_data_table_component_table_shell [INFERRED 0.85]
- **Authenticated shell navigation** — src_app_layout_app_shell_app_shell_component_shell, src_app_layout_app_shell_app_shell_component_router_outlet, src_app_layout_app_sidebar_app_sidebar_component_sidebar_nav, src_app_layout_app_sidebar_app_sidebar_component_dashboard_link, src_app_layout_app_sidebar_app_sidebar_component_movements_link, src_app_layout_app_sidebar_app_sidebar_component_super_role_gate [INFERRED 0.95]

## Communities (13 total, 0 thin omitted)

### Community 0 - "App bootstrap and guards"
Cohesion: 0.10
Nodes (20): guestGuard, /login route, @angular/common, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, App (+12 more)

### Community 1 - "Dashboard movements UI"
Cohesion: 0.10
Nodes (20): Generic data table, Date range picker, Dashboard movements view, DashboardComponent, Movement summary, DataTableColumn, DataTableComponent, Generic Flowbite table (+12 more)

### Community 2 - "Dev tooling and scripts"
Cohesion: 0.06
Nodes (35): devDependencies, @angular/build, @angular/cli, @angular/compiler-cli, jsdom, postcss, prettier, tailwindcss (+27 more)

### Community 3 - "Auth GraphQL session"
Cohesion: 0.14
Nodes (15): flowbite-angular, @ng-icons/core, rxjs, LOGIN_MUTATION, LoginGqlResponse, LOGOUT_MUTATION, LogoutGqlResponse, ME_QUERY (+7 more)

### Community 4 - "Movements GraphQL API"
Cohesion: 0.14
Nodes (17): Movement, CREATE_MOVEMENT_MUTATION, CreateMovementGqlResponse, MOVEMENT_QUERY, MOVEMENT_QUERY_FILTERED, MovementGqlResponse, MOVEMENTS_CATEGORIES_QUERY, MOVEMENTS_MONTHLY_QUERY (+9 more)

### Community 5 - "Angular build targets"
Cohesion: 0.08
Nodes (26): build, serve, test, builder, configurations, defaultConfiguration, options, development (+18 more)

### Community 6 - "ApexCharts bar and line"
Cohesion: 0.13
Nodes (13): ApexCharts, Bar chart, Dashboard feature, Line chart, Movements model and service, apexcharts, BarChartComponent, Bar chart shell (+5 more)

### Community 7 - "Shell navigation and auth"
Cohesion: 0.12
Nodes (21): fp.accessToken, App shell, App sidebar, authGuard, Backend CORS, /dashboard route, JWT authentication, logout mutation (+13 more)

### Community 8 - "Users admin management"
Cohesion: 0.18
Nodes (11): UserRole, ManagedUser, Users admin view, UsersComponent, mapUserRow(), SET_USER_STATUS_MUTATION, SetUserStatusGqlResponse, UserGqlRow (+3 more)

### Community 9 - "GraphQL client and config"
Cohesion: 0.13
Nodes (14): Angular 21 standalone, Finanzas personales frontend, Backend GraphQL, graphqlUrl, HttpClient GraphQL client, Light theme only, Tailwind CSS 4 and Flowbite, GraphqlClient (+6 more)

### Community 10 - "Runtime npm dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, apexcharts (+6 more)

### Community 11 - "Flowbite datepicker types"
Cohesion: 0.14
Nodes (3): Datepicker, DateRangePicker, flowbite-datepicker

### Community 12 - "Angular project config"
Cohesion: 0.15
Nodes (12): cli, packageManager, prefix, projectType, root, schematics, sourceRoot, newProjectRoot (+4 more)

## Ambiguous Edges - Review These
- `Movements model and service` → `Movements nav link`  [AMBIGUOUS]
  src/app/layout/app-sidebar/app-sidebar.component.html · relation: conceptually_related_to
- `Dashboard movements view` → `Movements nav link`  [AMBIGUOUS]
  src/app/features/dashboard/dashboard.component.html · relation: conceptually_related_to

## Knowledge Gaps
- **16 isolated node(s):** `@angular/compiler`, `ng-primitives`, `tslib`, `@angular/build`, `@angular/cli` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 120 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `App bootstrap and guards` to `Dashboard movements UI`, `Dev tooling and scripts`, `Auth GraphQL session`, `Movements GraphQL API`, `ApexCharts bar and line`, `Users admin management`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **What connects `@angular/compiler`, `ng-primitives`, `tslib` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App bootstrap and guards` be split into smaller, more focused modules?**
  _Cohesion score 0.09696969696969697 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime npm dependencies` to `Dev tooling and scripts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `Dashboard movements UI` be split into smaller, more focused modules?**
  _Cohesion score 0.09856035437430787 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Movements model and service` and `Movements nav link`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Dashboard movements view` and `Movements nav link`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._