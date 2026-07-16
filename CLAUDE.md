# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Public/display dashboard for the Franklin Fire Department showing CPSC product recalls filtered to fire and explosion hazards. Built with React 19, TypeScript, and Vite. No authentication — this is an informational page, not a secured internal tool.

## Development Commands

```bash
# Start development server on port 6001
npm run dev

# Run tests with Vitest
npm test

# Run linter
npm run lint

# Build for production
npm run build

# Deploy to production server
npm run deploy
```

## Standards and Guidelines

When auditing, reviewing, or modifying this codebase, use `/opt/claude-standards/react` and `/opt/claude-standards/typescript` as guides and templates.

## Architecture

### Data Source

- CPSC's public Recall REST API: `https://www.saferproducts.gov/RestWebServices/Recall`
- No API key required; called directly from the browser (CORS is open: `access-control-allow-origin: *`)
- The API is flaky for some queries — it occasionally returns a sentinel error object (`RecallID: 0`, `Title: "Error retrieving Recalls: ..."`) instead of an HTTP error. `AppActions.searchRecalls` detects this and throws, so TanStack Query's default retry (3x) kicks in automatically.
- The API's `Hazard` search param requires exact internal category text, not free-text like "fire" — it is not exposed in the UI. All results are always filtered client-side to fire/explosion hazards instead (see below).

### Fire/Explosion Filtering

- `src/utils/recalls.ts` — `isFireOrExplosionHazard` / `filterFireOrExplosionRecalls` check each recall's `Title` and `Hazards[].Name` against a small set of terms (`fire`, `explosion`, `explode`, `flammab`, `ignit`, `burn hazard`). A bare `burn` term was intentionally excluded — it produced false positives (e.g. "chemical burns" from battery-ingestion recalls).
- This filter is applied to both the "latest recalls" section and all search results, regardless of what search params were used.

### Component Organization

Components follow a consistent structure pattern:

```
ComponentName/
├── index.tsx         # Main component export
├── components.tsx    # Sub-components (if needed)
├── hooks.ts          # Component-specific hooks
└── utils.ts          # Component-specific utilities
```

**Key component hierarchy**:
- `RecallsContainer` (main container, in `src/components/recalls/containers`)
  - `LatestRecallsSection` (cards, in `src/components/recalls/cards`)
  - `SearchForm` (in `src/components/recalls/forms`)
  - `RecallsTable` (in `src/components/recalls/tables`)

### Data Flow

1. `useGetLatestRecalls` (in `RecallsContainer/hooks.ts`) fetches recalls published in the last 30 days on mount, filters to fire/explosion, sorts by most recent, takes the top 6.
2. `useSearchRecalls` runs only after a search is submitted (`enabled: !!params`), applying the same fire/explosion filter to whatever the CPSC API returns for the given params.
3. Search state lives in `SearchForm`'s local `useState`; submitted params are lifted to `RecallsContainer`.

### Path Aliases

Configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig.app.json`:

```typescript
@/              → src/
@/components/   → src/components/
@/config/       → src/config/
@/context/      → src/context/
@/helpers/      → src/helpers/
@/pages/        → src/pages/
@/utils/        → src/utils/
@/assets/       → src/assets/
```

### API Integration

- Types: `src/context/App/AppTypes.ts`
- API function: `src/context/App/AppActions.ts` (`searchRecalls`)

### Routing

Uses React Router 7 with basename `/recalls`. Single route: `/` — the recalls dashboard (wrapped in `Layout`).

### Environment Configuration

Config in `src/config/index.ts`:
- `APP_BASE`: `/recalls`
- `CPSC_BASE_URL`: CPSC Recall REST API base URL

### Testing

- Vitest with jsdom environment
- React Testing Library for component tests
- Setup file: `src/test/setup.ts`

### Styling

- Tailwind CSS 4 with DaisyUI components
- Motion library for page transition animation (`src/utils/PageWrapper`)
