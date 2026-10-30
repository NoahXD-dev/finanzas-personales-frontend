# Graph Report - finanzas-personales-frontend  (2026-10-30)

## Corpus Check
- 133 files · ~173,342 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: .toml 4, (none) 4, .css 2)

## Summary
- 2104 nodes · 4117 edges · 122 communities (119 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 141 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cfb1bd3d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.routes.ts
- movements.component.ts
- Dev tooling and scripts
- Auth GraphQL session
- Movements GraphQL API
- Angular build targets
- onAnnotDown
- Shell navigation and auth
- Users admin management
- graphql.client.ts
- Runtime npm dependencies
- Flowbite datepicker types
- renderDesignVisual
- modern-screenshot.umd.js
- el
- Advanced Design Patterns
- setLiveState
- captureElementToBlob
- Nielsen's 10 Usability Heuristics
- initPageChat
- normalizeManualContextText
- Data Visualization Design
- actOnAgentTarget
- Animation & Microinteractions
- initGlobalBar
- Cultural UX Considerations
- new-work.md
- Dark Patterns in UX Design
- Krug's Usability Principles
- live.md
- live-browser.js
- Key Principles
- showBar
- onboard.md
- createLiveBrowserDomHelpers
- impeccable/SKILL.md
- connectSSE
- The Toolkit
- showToast
- createLiveBrowserSessionState
- resumeSession
- resolveLiveInjectionAnchor
- startVoice
- Theming & Dark Mode Design
- adapt.md
- animate.md
- Handle `generate`
- cleanup
- Generate Report
- mountSvelteComponentVariant
- WCAG 2.1 AA Checklist
- New visual work
- optimize.md
- Accessibility Deep Dive
- 2026-10-29T04-00-02Z__atures-dashboard-dashboard-component-html-18bdf226.md
- Impeccable Asset Producer
- critique.md
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Finanzas personales frontend
- DESIGN.md — Finanzas Personales (Frontend)
- dashboard.component.ts
- Simplify the Design
- Hardening Dimensions
- Refactoring UI Design System
- Heuristic Checklist
- MovementsComponent
- clarify.md
- Nielsen's 10 Heuristics
- Generate Combined Critique Report
- document.md
- polish.md
- quieter.md
- scheduleAcceptCleanup
- handleAccept
- UX Heuristics Framework
- Responsive Design
- Init flow
- syncEditBadgeHitProxies
- Common Cognitive Load Violations
- iOS platform
- Operate mode depth (and Read notes)
- adapt.native.md
- Android platform
- colorize.md
- Persona-Based Design Testing
- doctor.md
- Extract Flow
- Shape
- Categories of Dark Patterns
- The Refactoring UI Framework
- Generate Report
- Cognitive Load Assessment
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- live-browser-ignores.js
- Diagnostic Scan
- bolder.md
- Visualize: Direction Comps & Asset Production
- Component Considerations
- Region map
- ensureAgentPollTooltip
- Theme Toggle UI
- Common Animation Patterns
- Operable
- Performance Guidelines
- Heuristics Scoring Guide
- Operate
- Persuade and Experience
- Loading States
- Building a Dark Mode Palette
- Ethical Alternatives That Work
- Usability Testing on $0
- Perceivable
- Timing & Duration
- hasTextRows
- Microinteractions
- Implementation Strategies
- The Business Case Against Dark Patterns
- Navigation Must-Haves
- The Reality of How Users Use the Web
- Homepage Guidelines

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `setLiveState()` - 33 edges
3. `showToast()` - 33 edges
4. `resumeSession()` - 33 edges
5. `@angular/core` - 32 edges
6. `initGlobalBar()` - 30 edges
7. `el()` - 29 edges
8. `buildInsertConfigureRow()` - 28 edges
9. `handleKeyDown()` - 28 edges
10. `cleanup()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Super role gate` --semantically_similar_to--> `superGuard()`  [INFERRED] [semantically similar]
  src/app/layout/app-sidebar/app-sidebar.component.html → src/app/core/auth/super.guard.ts
- `fp.accessToken` --references--> `TokenStore`  [INFERRED]
  README.md → src/app/core/auth/token.store.ts
- `HttpClient GraphQL client` --references--> `GraphqlClient`  [INFERRED]
  README.md → src/app/core/graphql/graphql.client.ts
- `Date range picker` --references--> `FlowbiteDateRangeComponent`  [INFERRED]
  README.md → src/app/shared/date/flowbite-date-range.component.ts
- `Step 2: Act by severity` --references--> `init()`  [INFERRED]
  .agents/skills/impeccable/reference/doctor.md → .agents/skills/impeccable/scripts/live-browser.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **JWT session flow** — readme_jwt_auth, readme_access_token, readme_auth_guard, readme_guest_guard, readme_me_query, readme_logout, readme_login_route [EXTRACTED 1.00]
- **Dashboard period report** — src_app_features_dashboard_dashboard_component_dashboard_view, src_app_features_dashboard_dashboard_component_movement_summary, src_app_shared_date_flowbite_date_range_component_range_picker, src_app_shared_bar_chart_bar_chart_component_chart_shell, src_app_shared_line_chart_line_chart_component_chart_shell, src_app_shared_data_table_data_table_component_table_shell [INFERRED 0.85]
- **Authenticated shell navigation** — src_app_layout_app_shell_app_shell_component_shell, src_app_layout_app_shell_app_shell_component_router_outlet, src_app_layout_app_sidebar_app_sidebar_component_sidebar_nav, src_app_layout_app_sidebar_app_sidebar_component_dashboard_link, src_app_layout_app_sidebar_app_sidebar_component_movements_link, src_app_layout_app_sidebar_app_sidebar_component_super_role_gate [INFERRED 0.95]

## Communities (122 total, 3 thin omitted)

### Community 0 - "app.routes.ts"
Cohesion: 0.13
Nodes (18): guestGuard, /login route, @angular/core, @angular/platform-browser, @angular/router, rxjs, App, appConfig (+10 more)

### Community 1 - "movements.component.ts"
Cohesion: 0.13
Nodes (9): @angular/forms, flowbite-angular, ng-primitives, GraphqlClientError, Login form, LoginComponent, RegisterComponent, DialogClose (+1 more)

### Community 2 - "Dev tooling and scripts"
Cohesion: 0.08
Nodes (24): name, packageManager, private, scripts, build, ng, start, test (+16 more)

### Community 3 - "Auth GraphQL session"
Cohesion: 0.14
Nodes (14): LOGIN_MUTATION, LoginGqlResponse, LOGOUT_MUTATION, LogoutGqlResponse, ME_QUERY, MeGqlResponse, REGISTER_MUTATION, RegisterGqlResponse (+6 more)

### Community 4 - "Movements GraphQL API"
Cohesion: 0.13
Nodes (19): CreateMovementInput, Movement, MovementType, CREATE_MOVEMENT_MUTATION, CreateMovementGqlResponse, MOVEMENT_QUERY, MOVEMENT_QUERY_FILTERED, MovementGqlResponse (+11 more)

### Community 5 - "Angular build targets"
Cohesion: 0.05
Nodes (38): build, serve, test, builder, configurations, defaultConfiguration, options, cli (+30 more)

### Community 6 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 7 - "Shell navigation and auth"
Cohesion: 0.13
Nodes (19): fp.accessToken, App shell, App sidebar, authGuard, Backend CORS, /dashboard route, JWT authentication, logout mutation (+11 more)

### Community 8 - "Users admin management"
Cohesion: 0.19
Nodes (10): ManagedUser, Users admin view, UsersComponent, mapUserRow(), SET_USER_STATUS_MUTATION, SetUserStatusGqlResponse, UserGqlRow, USERS_QUERY (+2 more)

### Community 9 - "graphql.client.ts"
Cohesion: 0.21
Nodes (8): @angular/common, SKIP_AUTH, GraphqlClient, GraphqlError, GraphqlErrorExtensions, GraphqlRequestOptions, GraphqlResponse, environment

### Community 10 - "Runtime npm dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, apexcharts (+17 more)

### Community 11 - "Flowbite datepicker types"
Cohesion: 0.14
Nodes (3): Datepicker, DateRangePicker, flowbite-datepicker

### Community 12 - "renderDesignVisual"
Cohesion: 0.07
Nodes (44): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe() (+36 more)

### Community 13 - "modern-screenshot.umd.js"
Cohesion: 0.07
Nodes (65): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+57 more)

### Community 14 - "el"
Cohesion: 0.08
Nodes (45): actionLabel(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow(), buildConfigureSubmitButton() (+37 more)

### Community 15 - "Advanced Design Patterns"
Cohesion: 0.04
Nodes (47): Active/Pressed, Advanced Design Patterns, Avoid, Backdrop, Background Images, Border Radius System, Breadcrumbs, Button Hierarchy (+39 more)

### Community 16 - "setLiveState"
Cohesion: 0.24
Nodes (29): beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), clearAnnotations(), clearInsertPicking(), disableInlineEdit(), enterEditingMode() (+21 more)

### Community 17 - "captureElementToBlob"
Cohesion: 0.11
Nodes (23): averageRgb01(), bufferToBase64(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), compileShader(), cssColorToRgb01() (+15 more)

### Community 18 - "Nielsen's 10 Usability Heuristics"
Cohesion: 0.05
Nodes (43): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+35 more)

### Community 19 - "initPageChat"
Cohesion: 0.11
Nodes (39): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+31 more)

### Community 20 - "normalizeManualContextText"
Cohesion: 0.09
Nodes (26): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), cssIdent(), directMixedTextRestoreNodes(), documentRefClassSuffix() (+18 more)

### Community 21 - "Data Visualization Design"
Cohesion: 0.05
Nodes (41): Accessibility in Data Viz, Alternative: Simple Numbers, Annotation Patterns, Bar Chart Rules, Bar Charts, Bar Styling, Categorical Colors, Chart Annotations (+33 more)

### Community 22 - "actOnAgentTarget"
Cohesion: 0.10
Nodes (46): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy() (+38 more)

### Community 23 - "Animation & Microinteractions"
Cohesion: 0.14
Nodes (14): Accessibility Considerations, Animation Checklist, Animation & Microinteractions, Avoid Problematic Animations, Common Easing Curves, Custom Cubic Bezier, Easing Functions, Invalid Reasons to Animate (+6 more)

### Community 24 - "initGlobalBar"
Cohesion: 0.13
Nodes (26): barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), detectPageTheme(), stopFocusOutIntoChrome(), formatRangeValue(), handleMouseMove(), hideAgentPollTooltip() (+18 more)

### Community 25 - "Cultural UX Considerations"
Cohesion: 0.06
Nodes (33): Address Fields, Blue, Color Meanings Across Cultures, Content, CSS for RTL, Cultural UX Considerations, Currency, Dates (+25 more)

### Community 26 - "new-work.md"
Cohesion: 0.08
Nodes (22): Recommended Actions, Craft (deprecated alias), Impeccable Documenter, Input Contract, Output Contract, Workflow, Apply, Live-mode signature params (+14 more)

### Community 27 - "Dark Patterns in UX Design"
Cohesion: 0.14
Nodes (10): California Privacy Rights Act (CPRA), Checklist, Dark Patterns in UX Design, FTC (United States), GDPR (Europe), How to Audit for Dark Patterns, Regulatory Context, Table of Contents (+2 more)

### Community 28 - "Krug's Usability Principles"
Cohesion: 0.15
Nodes (12): Accessibility Basics, Don't Make Users Think, Don't Make Words Seem Important If They're Not, Don't Waste Users' Goodwill, Krug's Usability Principles, Mobile Considerations, Mobile Specifics, Mobile Trade-offs (+4 more)

### Community 29 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 30 - "live-browser.js"
Cohesion: 0.03
Nodes (84): applyGlobalBarLabelState(), applyLiveBarPreference(), applyParamDefaults(), applyParamValue(), applyPlaceholderSizingStyles(), applySavedParamValues(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf() (+76 more)

### Community 31 - "Key Principles"
Cohesion: 0.07
Nodes (28): 1. Context Is King, 1. Simplicity vs. Flexibility, 2. Consistency vs. Context Optimization, 2. Know Your Users, 3. Design for Both When Possible, 3. Efficiency vs. Error Prevention, 4. Discoverability vs. Clean Interface, 4. Make Conscious Trade-offs (+20 more)

### Community 32 - "showBar"
Cohesion: 0.14
Nodes (20): buildCyclingRow(), buildDots(), closedClipPath(), closeTunePopover(), cycleVariant(), ensureCyclingRenderable(), getVisibleVariantEl(), hideParamsPanel() (+12 more)

### Community 33 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 34 - "createLiveBrowserDomHelpers"
Cohesion: 0.10
Nodes (24): collectEditableTextRows(), visit(), createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot() (+16 more)

### Community 35 - "impeccable/SKILL.md"
Cohesion: 0.10
Nodes (16): Craft floor, Refuse, Verify, Constraints, Failure modes, Flow, $impeccable hooks, Routing (+8 more)

### Community 36 - "connectSSE"
Cohesion: 0.20
Nodes (20): abandonForeignSession(), abandonSupersededGo(), connectSSE(), discardOrphanedSession(), handleDiscard(), injectVariantsFromSource(), isFrameworkComponentPreviewMode(), isSvelteComponentManifestPath() (+12 more)

### Community 37 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 38 - "showToast"
Cohesion: 0.31
Nodes (11): applyEditing(), copyEditContainerContext(), copyEditLeafContext(), documentRefForElement(), extractContext(), maybeShowFirstSaveToast(), removalDisallowedReason(), removeSelectedElement() (+3 more)

### Community 39 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 40 - "resumeSession"
Cohesion: 0.16
Nodes (34): abortSvelteComponentInjection(), applySavedSessionMeta(), captureAndEmit(), completeParameterGenerationIfReady(), completeParameterPublication(), completeSourceInjection(), enterRecoveryWaitingForAnchor(), finalizeInsertSession() (+26 more)

### Community 41 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 42 - "startVoice"
Cohesion: 0.29
Nodes (10): applyConfigureBarChrome(), finishVoiceSession(), isEmbeddedPreviewBrowser(), releaseVoiceEngine(), startVoice(), steerSpeechRecognitionCtor(), steerVoiceErrorMessage(), steerVoiceUnavailableMessage() (+2 more)

### Community 43 - "Theming & Dark Mode Design"
Cohesion: 0.12
Nodes (16): Advanced: Multiple Themes, Brand Themes, Checklist, Common Mistakes, Contrast Ratios, Dark Mode Color Principles, Dark Mode Philosophy, Don't Just Invert (+8 more)

### Community 44 - "adapt.md"
Cohesion: 0.12
Nodes (15): Assess Adaptation Challenge, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Techniques, Mobile Adaptation (Desktop → Mobile), Navigation Adaptation (+7 more)

### Community 45 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 46 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 47 - "cleanup"
Cohesion: 0.19
Nodes (18): cleanup(), cleanupAcceptedSession(), clearHandled(), clearMountErrorCard(), clearSession(), handleInsertCreate(), mountErrorCardBottomOffset(), removeVariantStateStylesheet() (+10 more)

### Community 48 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 49 - "mountSvelteComponentVariant"
Cohesion: 0.16
Nodes (18): applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), cyclingCounterText(), cyclingShownVariant(), describeMountFailure(), detectDevServerBase(), findLiveElementForSvelteManifest() (+10 more)

### Community 50 - "WCAG 2.1 AA Checklist"
Cohesion: 0.14
Nodes (14): 3.1 Readable, 3.2 Predictable, 3.3 Input Assistance, 4.1 Compatible, Automated Testing, Manual Testing Required, Quick Reference: Common Failures, Robust (+6 more)

### Community 51 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 52 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 53 - "Accessibility Deep Dive"
Cohesion: 0.06
Nodes (30): 1.1 Text Alternatives, 1.3 Adaptable, 1.4 Distinguishable, 2.1 Keyboard Accessible, 2.4 Navigable, 3.1 Readable, 3.2 Predictable, 3.3 Input Assistance (+22 more)

### Community 54 - "2026-10-29T04-00-02Z__atures-dashboard-dashboard-component-html-18bdf226.md"
Cohesion: 0.14
Nodes (13): Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] El periodo está en mm/dd/yyyy, [P1] El signo del dinero no es fiable, [P1] Las gráficas no se leen sin verlas, [P1] Movimientos del sidebar saca del libro (+5 more)

### Community 55 - "Impeccable Asset Producer"
Cohesion: 0.15
Nodes (11): Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve, Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract (+3 more)

### Community 56 - "critique.md"
Cohesion: 0.15
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 57 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 58 - "Finanzas personales frontend"
Cohesion: 0.22
Nodes (9): Angular 21 standalone, Finanzas personales frontend, Backend GraphQL, graphqlUrl, HttpClient GraphQL client, Light theme only, Tailwind CSS 4 and Flowbite, environment (+1 more)

### Community 59 - "DESIGN.md — Finanzas Personales (Frontend)"
Cohesion: 0.15
Nodes (12): 10. Convenciones de código, 11. Anti-patrones (no hacer), 1. Stack de UI (no negociable), 2. Propósito y tono, 3. Color, 4. Tipografía, 5. Espaciado y layout, 6. Componentes clave (+4 more)

### Community 60 - "dashboard.component.ts"
Cohesion: 0.05
Nodes (33): ApexCharts, Bar chart, Dashboard feature, Generic data table, Date range picker, Line chart, Movements model and service, apexcharts (+25 more)

### Community 61 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 62 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 63 - "Refactoring UI Design System"
Cohesion: 0.17
Nodes (7): About the Authors, Common Mistakes, Core Principle, Further Reading, Quick Diagnostic, Refactoring UI Design System, Scoring

### Community 64 - "Heuristic Checklist"
Cohesion: 0.07
Nodes (27): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency (+19 more)

### Community 66 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 67 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 68 - "Generate Combined Critique Report"
Cohesion: 0.18
Nodes (11): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+3 more)

### Community 69 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 70 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 71 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 72 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 73 - "handleAccept"
Cohesion: 0.16
Nodes (19): applyPlaceholderDimensions(), commitAcceptedVariantToDom(), ensureInsertPlaceholder(), findAnyVariantsWrapper(), findInsertAnchorInDom(), findVariantsWrapper(), handleAccept(), isInsertGeneratingSession() (+11 more)

### Community 74 - "UX Heuristics Framework"
Cohesion: 0.07
Nodes (27): 10. Help and Documentation, 1. Don't Make Me Think, 1. Visibility of System Status, 2. It Doesn't Matter How Many Clicks, 2. Match Between System and Real World, 3. Get Rid of Half the Words, 3. User Control and Freedom, 4. Consistency and Standards (+19 more)

### Community 77 - "Responsive Design"
Cohesion: 0.20
Nodes (10): Breakpoints: Content-Driven, Detect Input Method, Not Just Screen Size, Layout Adaptation Patterns, Mobile-First: Write It Right, Picture Element for Art Direction, Responsive Design, Responsive Images: Get It Right, Safe Areas: Handle the Notch (+2 more)

### Community 78 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 80 - "syncEditBadgeHitProxies"
Cohesion: 0.31
Nodes (9): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy(), syncEditBadgeHitProxies() (+1 more)

### Community 81 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 82 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 83 - "Operate mode depth (and Read notes)"
Cohesion: 0.22
Nodes (9): Color, Components, Layout, Motion, Operate mode depth (and Read notes), Product constraints, Product permissions, The product slop test (+1 more)

### Community 84 - "adapt.native.md"
Cohesion: 0.25
Nodes (7): Adaptation Strategies, Assess Adaptation Challenge, Implement & Verify, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

### Community 85 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 86 - "colorize.md"
Cohesion: 0.25
Nodes (7): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode

### Community 87 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 88 - "doctor.md"
Cohesion: 0.25
Nodes (7): Monorepo notes, Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 89 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 90 - "Shape"
Cohesion: 0.25
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 91 - "Categories of Dark Patterns"
Cohesion: 0.18
Nodes (11): 10. Urgency & Scarcity (False), 1. Forced Continuity, 2. Roach Motel, 3. Privacy Zuckering, 4. Bait and Switch, 5. Confirmshaming, 6. Hidden Costs, 7. Misdirection (+3 more)

### Community 92 - "The Refactoring UI Framework"
Cohesion: 0.25
Nodes (8): 1. Visual Hierarchy, 2. Spacing & Sizing, 3. Typography, 4. Color, 5. Depth & Shadows, 6. Images & Icons, 7. Layout & Composition, The Refactoring UI Framework

### Community 93 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 94 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 95 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 96 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 97 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 98 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 99 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 100 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 101 - "Component Considerations"
Cohesion: 0.33
Nodes (6): Buttons, Cards and Surfaces, Component Considerations, Form Inputs, Images and Media, Syntax Highlighting

### Community 104 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 105 - "ensureAgentPollTooltip"
Cohesion: 0.40
Nodes (6): agentHasWorkInFlight(), agentStatusText(), ensureAgentPollTooltip(), showAgentPollTooltip(), steerQueuedBehindGeneration(), steerTimeoutMessage()

### Community 106 - "Theme Toggle UI"
Cohesion: 0.40
Nodes (5): Icon Patterns, Persistence, Placement, State Options, Theme Toggle UI

### Community 107 - "Common Animation Patterns"
Cohesion: 0.33
Nodes (6): Button States, Common Animation Patterns, Dropdown/Menu, Modal Entrance/Exit, Skeleton Loading, Toast/Notification

### Community 108 - "Operable"
Cohesion: 0.33
Nodes (6): 2.1 Keyboard Accessible, 2.2 Enough Time, 2.3 Seizures, 2.4 Navigable, 2.5 Input Modalities, Operable

### Community 109 - "Performance Guidelines"
Cohesion: 0.40
Nodes (5): Batch Animations, GPU-Accelerated Properties, Performance Guidelines, Test on Low-end Devices, Use will-change Sparingly

### Community 110 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 111 - "Operate"
Cohesion: 0.50
Nodes (3): Comps, Directions, Operate

### Community 112 - "Persuade and Experience"
Cohesion: 0.50
Nodes (3): Comps, Directions, Persuade and Experience

### Community 113 - "Loading States"
Cohesion: 0.40
Nodes (5): Loading States, Progress Bar Guidelines, Skeleton Screen Guidelines, Spinner Guidelines, Types of Loading Indicators

### Community 114 - "Building a Dark Mode Palette"
Cohesion: 0.50
Nodes (4): Building a Dark Mode Palette, Step 1: Define Your Gray Scale, Step 2: Adjust Accent Colors, Step 3: Define Semantic Tokens

### Community 115 - "Ethical Alternatives That Work"
Cohesion: 0.40
Nodes (5): Ethical Alternatives That Work, Instead of Confirmshaming, Instead of False Urgency, Instead of Forced Continuity, Instead of Hidden Costs

### Community 116 - "Usability Testing on $0"
Cohesion: 0.40
Nodes (5): Common Findings, How Many Users?, Test Protocol, Usability Testing on $0, What to Test

### Community 118 - "Perceivable"
Cohesion: 0.40
Nodes (5): 1.1 Text Alternatives, 1.2 Time-based Media, 1.3 Adaptable, 1.4 Distinguishable, Perceivable

### Community 119 - "Timing & Duration"
Cohesion: 0.50
Nodes (4): Duration by Distance, Duration Guidelines, The 200ms Rule, Timing & Duration

### Community 121 - "Microinteractions"
Cohesion: 0.50
Nodes (4): Effective Microinteractions, Microinteractions, When Microinteractions Help, When to Skip

### Community 122 - "Implementation Strategies"
Cohesion: 0.50
Nodes (4): Implementation Strategies, Strategy 1: CSS Custom Properties, Strategy 2: Data Attribute + Class, Strategy 3: Tailwind Dark Mode

### Community 123 - "The Business Case Against Dark Patterns"
Cohesion: 0.50
Nodes (4): Companies That Changed, Real Costs of Dark Patterns, Short-term vs Long-term, The Business Case Against Dark Patterns

### Community 124 - "Navigation Must-Haves"
Cohesion: 0.50
Nodes (4): Breadcrumbs, Navigation Must-Haves, The Permanent Navigation, The Trunk Test

### Community 125 - "The Reality of How Users Use the Web"
Cohesion: 0.50
Nodes (4): Fact 1: We Don't Read, We Scan, Fact 2: We Don't Make Optimal Choices, We Satisfice, Fact 3: We Don't Figure Out How Things Work, We Muddle Through, The Reality of How Users Use the Web

### Community 126 - "Homepage Guidelines"
Cohesion: 0.50
Nodes (4): Homepage Guidelines, Homepage Priorities, Tagline Guidelines, The Big Bang Theory of Web Design

## Ambiguous Edges - Review These
- `Dashboard movements view` → `Movements nav link`  [AMBIGUOUS]
  src/app/features/dashboard/dashboard.component.html · relation: conceptually_related_to
- `Movements nav link` → `Movements model and service`  [AMBIGUOUS]
  src/app/layout/app-sidebar/app-sidebar.component.html · relation: conceptually_related_to

## Knowledge Gaps
- **15 isolated node(s):** `@angular/compiler`, `tslib`, `@angular/build`, `@angular/cli`, `@angular/compiler-cli` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 920 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `init()` connect `initGlobalBar` to `impeccable/SKILL.md`, `connectSSE`, `onAnnotDown`, `resumeSession`, `renderDesignVisual`, `Init flow`, `setLiveState`, `syncEditBadgeHitProxies`, `initPageChat`, `actOnAgentTarget`, `doctor.md`, `live.md`, `live-browser.js`?**
  _High betweenness centrality (0.263) - this node is a cross-community bridge._
- **What connects `@angular/compiler`, `tslib`, `@angular/build` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.routes.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1268939393939394 - nodes in this community are weakly interconnected._
- **Why does `TokenStore` connect `app.routes.ts` to `critique.md`, `graphql.client.ts`, `Auth GraphQL session`, `Shell navigation and auth`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **Should `movements.component.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13405797101449277 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Dashboard movements view` and `Movements nav link`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Movements nav link` and `Movements model and service`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._