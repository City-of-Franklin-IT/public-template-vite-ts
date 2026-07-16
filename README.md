# FFD Unit Status

Real-time vehicle status tracking dashboard for the Franklin Fire Department.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)

## Overview

Real-time vehicle status tracking dashboard for the Franklin Fire Department. Displays current status, location, and availability of fire department units across all stations using React 19, TypeScript, and ArcGIS mapping. Features live tracking, interactive maps, and comprehensive filtering capabilities for monitoring emergency response resources.

## Features

- **Live Vehicle Tracking**: Real-time status updates for all FFD vehicles with 5-minute refresh intervals
- **Interactive Map**: ArcGIS-powered map displaying vehicle locations and movements
- **Status Monitoring**: Track vehicle status (Available, In Quarters, On Scene, Out of Service, Enroute, Staged)
- **Station Organization**: View units by station (Stations 1-8 and Reserves)
- **Capability Filtering**: Filter vehicles by capabilities (Engine, Ladder, ALS/BLS Units, Hazmat, Rescue, etc.)
- **Out of Service Tracking**: Monitor OOS vehicles with detailed reason tracking
- **Location Details**: Current location and destination information for each unit
- **API Documentation**: In-app API documentation viewer for authenticated users
- **Azure AD Authentication**: Secure access with Microsoft authentication integration

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Azure AD Application**: Required for authentication in production

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd ffd-unit-status-vite-ts

# Install dependencies
npm install
```

## Configuration

### Environment Variables

The application uses configuration in `src/config/index.ts`:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode (`development` or `production`) | - |
| `APP_BASE` | Base path for routing | `/unit-status` |
| `CLIENT_ID` | Azure AD application ID | Required for production |
| `API_URL` | API endpoint (set in `AppActions.ts`) | Environment-based |

### Development Mode

To work locally without authentication, set `NODE_ENV = 'development'` in `src/config/index.ts`.

### API Endpoints

- **Production**: https://fireapps.franklintn.gov/api/v2/ffd/capabilities
- **Development**: https://cofasv38.franklin-gov.com/api/v2/ffd/capabilities
- **API Documentation**: https://dev.franklintn.gov/api/v2/ffd/api-docs
- **API Repository**: [ffd-api-ts](https://github.com/City-of-Franklin-IT/ffd-api-ts)

**Data Source**: `[GISDBASV02].[LiveFeeds]` database

## Usage

```bash
# Start development server on port 6000
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 19 with TypeScript 5.8
- **Build Tool**: Vite 7
- **Mapping**: ArcGIS Core 4.30
- **State Management**:
  - TanStack Query (React Query) for server state
  - React Context + useReducer for UI state
- **Authentication**: Azure MSAL (Browser + React)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 + DaisyUI
- **UI Components**: Mobiscroll React
- **Animations**: Motion
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout components
│   ├── vehicles/        # Vehicle-related components
│   │   ├── containers/  # VehiclesContainer, FiltersContainer
│   │   ├── filters/     # Station, Capability, OOS filters
│   │   ├── map/         # ArcGIS map integration
│   │   └── tables/      # Vehicle data tables
│   └── icons/           # Icon components
├── context/
│   ├── App/             # Application state (filters, selections)
│   │   ├── context.tsx  # Context + useReducer setup
│   │   ├── AppActions.ts # State actions
│   │   └── types.ts     # Vehicle and state types
│   └── Auth/            # Azure MSAL authentication
│       └── hooks/       # AuthProvider and token management
├── pages/
│   ├── Home/            # Main page with vehicle data
│   │   └── hooks.ts     # TanStack Query hooks
│   └── Docs/            # API documentation viewer
├── helpers/
│   └── hooks.ts         # useGetToken for auth
├── utils/               # Error boundaries, loading states
└── config/
    └── index.ts         # Environment configuration
```

## Architecture

### State Management

**Global UI State** (`src/context/App/context.tsx`):
- React Context + useReducer pattern
- Manages filters: station, capability, OOS, stale
- Manages map selection state
- Wrapped around `/home` route only

**Server State** (TanStack Query):
- API data fetching and caching
- 5-minute automatic refetch interval
- Query hooks in page-level `hooks.ts` files

### Authentication Flow

- Azure MSAL integration for production
- Development mode bypasses auth when `NODE_ENV === 'development'`
- Token management with automatic refresh
- Special Edge browser handling with popup-based acquisition

### Data Flow

1. `useGetVehicles` hook fetches data via TanStack Query
2. Data flows to `VehiclesContainer`
3. AppContext filters applied in component hooks
4. Filtered data rendered in map and table components
5. User interactions dispatch actions to update AppContext

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
├── components.tsx    # Sub-components
├── hooks.ts         # Component-specific hooks
└── utils.ts         # Component-specific utilities
```

## Vehicle Capabilities

The system tracks various vehicle types and capabilities:
- Engine, Ladder, Tower (100 FT)
- ALS/BLS Units
- Heavy Rescue, Light Extrication
- Hazmat, Hazmat Truck
- Water Rescue, Boat
- Brush, Air Truck, Pumper Tanker
- Battalion Chief, District Captain

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
- Test UI available via `@vitest/ui`

## Deployment

**Production URL**: https://fireapps.franklintn.gov/unit-status

```bash
# Build and deploy to production server
npm run build
npm run deploy
```

The deploy command uses SCP to transfer build artifacts to the production server (`cofasv32`).

## Routes

- `/` - Login page
- `/home` - Main application dashboard
- `/docs` - API documentation viewer
- `/*` - Redirect handler

All routes use basename `/unit-status`.
