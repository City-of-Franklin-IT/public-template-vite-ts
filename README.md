# FFD Recalls

Public/display dashboard for the Franklin Fire Department showing CPSC product recalls filtered to fire and explosion hazards.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)

## Overview

An informational, public-facing page — no authentication — that surfaces CPSC (Consumer Product Safety Commission) recall data relevant to fire and explosion hazards for the Franklin Fire Department. Built with React 19, TypeScript, and Vite.

## Features

- **Latest Recalls**: Shows the 6 most recent fire/explosion-related recalls published in the last 30 days
- **Search**: Query the CPSC Recall API and filter results to fire/explosion hazards client-side
- **Fire/Explosion Filtering**: Client-side keyword filtering (`fire`, `explosion`, `explode`, `flammab`, `ignit`, `burn hazard`) since the CPSC API's hazard category param isn't exposed for free-text search
- **Resilient Fetching**: Detects and retries CPSC's sentinel error responses (`RecallID: 0`) via TanStack Query's automatic retry

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd ffd-recalls-vite-ts

# Install dependencies
npm install
```

## Configuration

Config lives in `src/config/index.ts`:

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_BASE` | Base path for routing | `/recalls` |
| `CPSC_BASE_URL` | CPSC Recall REST API base URL | `https://www.saferproducts.gov/RestWebServices/Recall` |

No API key or authentication is required — CORS is open on the CPSC API (`access-control-allow-origin: *`), so it's called directly from the browser.

## Usage

```bash
# Start development server on port 6002
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 19 with TypeScript 5.8
- **Build Tool**: Vite 7
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Animations**: Motion (page transitions)
- **Error Handling**: react-error-boundary, react-toastify
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   └── recalls/         # Recall-related components
│       ├── containers/  # RecallsContainer
│       ├── cards/       # LatestRecallsSection
│       ├── forms/       # SearchForm
│       └── tables/      # RecallsTable
├── context/
│   └── App/             # Application state and API integration
│       ├── AppActions.ts # searchRecalls API function
│       └── AppTypes.ts  # Recall and API types
├── utils/
│   ├── recalls.ts       # Fire/explosion hazard filtering
│   └── PageWrapper/     # Page transition animation
├── pages/               # Route-level page components
└── config/
    └── index.ts         # Environment configuration
```

## Architecture

### Fire/Explosion Filtering

`src/utils/recalls.ts` exports `isFireOrExplosionHazard` / `filterFireOrExplosionRecalls`, which check each recall's `Title` and `Hazards[].Name` against a small set of terms. A bare `burn` term is intentionally excluded — it produced false positives (e.g. "chemical burns" from battery-ingestion recalls). This filter is applied to both the latest-recalls section and all search results, regardless of search params.

### Data Flow

1. `useGetLatestRecalls` (`RecallsContainer/hooks.ts`) fetches recalls published in the last 30 days on mount, filters to fire/explosion, sorts by most recent, and takes the top 6
2. `useSearchRecalls` runs only after a search is submitted (`enabled: !!params`), applying the same fire/explosion filter to whatever the CPSC API returns
3. Search state lives in `SearchForm`'s local `useState`; submitted params are lifted to `RecallsContainer`

### Path Aliases

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

## Component Organization

Components follow a consistent structure:

```
ComponentName/
├── index.tsx         # Main component export
├── components.tsx    # Sub-components (if needed)
├── hooks.ts          # Component-specific hooks
└── utils.ts          # Component-specific utilities
```

## Development

```bash
# Run tests with Vitest
npm test

# Run linter
npm run lint

# Run tests with UI
npm test -- --ui
```

### Testing

- Vitest with jsdom environment
- React Testing Library for component tests
- Setup file: `src/test/setup.ts`

## Deployment

```bash
# Build and deploy to production server
npm run build
npm run deploy
```

The deploy command uses SCP to transfer build artifacts to the production server (`cofasv03`).

## Routes

Single route (`/`) — the recalls dashboard, wrapped in `Layout`. All routes use basename `/recalls`.
