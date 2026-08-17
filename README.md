# Public Template — Vite + TypeScript

A professional template for building public-facing applications for the City of Franklin. This repository establishes conventions, architectural patterns, and UI design standards for modern React applications using TypeScript, Vite, Tailwind CSS, and DaisyUI.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)

## Overview

This template provides a solid foundation for building public-facing web applications. It includes:

- **Production-ready architecture** with React 19, TypeScript, and Vite
- **Established patterns** for component organization, routing, and data fetching
- **Professional styling** with Tailwind CSS 4 and DaisyUI components
- **Testing framework** with Vitest and React Testing Library
- **Developer experience** with hot module replacement, linting, and type safety

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## What's Included

### Tech Stack

- **Framework**: React 19 with TypeScript 5.8
- **Build Tool**: Vite 7
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Animations**: Motion (page transitions)
- **Error Handling**: react-error-boundary
- **Testing**: Vitest + React Testing Library

### Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Banner/          # Header component
│   │   ├── Footer/          # Footer component
│   │   └── Layout/          # Main layout wrapper
│   ├── example/             # Example components (remove or replace)
│   │   ├── containers/      # Container/smart components
│   │   ├── cards/           # Card/presentational components
│   │   └── forms/           # Form components
│   └── shared/              # Shared UI components (buttons, modals, etc.)
├── context/
│   └── App/                 # Application state and API integration
│       ├── AppActions.ts    # API functions
│       └── AppTypes.ts      # TypeScript types
├── utils/
│   ├── PageWrapper/         # Page transition animation
│   └── ErrorBoundary/       # Error boundary component
├── pages/                   # Route-level page components
├── config/                  # Environment configuration
├── assets/                  # Static assets
└── test/                    # Test setup and utilities
```

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

## Architecture

### Component Organization

Components follow a consistent structure:

```
ComponentName/
├── index.tsx         # Main component export
├── components.tsx    # Sub-components (if needed)
├── hooks.ts          # Component-specific hooks
└── utils.ts          # Component-specific utilities
```

### Data Flow

The template demonstrates several data flow patterns:

1. **Server State with TanStack Query**: Use `useQuery` for fetching data from APIs
2. **Component State**: Local `useState` for form inputs and UI interactions
3. **Context API**: For application-wide state (if needed, extend `AppContext`)

### Routing

Uses React Router 7 with a single route configured. Extend this by:
1. Adding new routes in `App.tsx`
2. Creating new page components in `src/pages/`
3. Adjusting the `APP_BASE` config if needed

## Customization Guide

To use this template for a new project:

### 1. Update Package Name and Metadata
```bash
# Update package.json
# - Change "name" to your project name
# - Update version if needed
# - Adjust scripts (especially dev port if needed)
```

### 2. Replace Example Components
- Remove the `src/components/example/` directory
- Create new components following the same folder structure
- Example structure demonstrates best practices

### 3. Update Routing
Edit `src/App.tsx` to add your routes and pages

### 4. Configure API Integration
- Update `src/context/App/AppActions.ts` with your API functions
- Update `src/context/App/AppTypes.ts` with your data types

### 5. Customize Layout
- Update `src/components/layout/Banner/` for your header
- Update `src/components/layout/Footer/` for your footer
- Modify `src/components/layout/Layout/` wrapper as needed

### 6. Update Configuration
Edit `src/config/index.ts` for your project's settings:
```typescript
export const APP_BASE = '/your-app-path';
export const API_BASE_URL = 'your-api-url';
// Add other configuration as needed
```

### 7. Update Documentation
- Update `CLAUDE.md` with your project's specific architecture
- Update this `README.md` to reflect your application

## Development

```bash
# Start development server on port 5173
npm run dev

# Run tests with Vitest
npm test

# Run tests with UI
npm test -- --ui

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

The template includes:
- **Vitest** with jsdom environment
- **React Testing Library** for component tests
- **Setup file** at `src/test/setup.ts`

Write tests in `__tests__` or `*.spec.tsx` files alongside components.

## Standards and Guidelines

When auditing, reviewing, or modifying code:
- Use `/opt/claude-standards/react` as a React guide
- Use `/opt/claude-standards/typescript` as a TypeScript guide
- Follow the component structure pattern defined in this template

## Color Palette & Styling

The template uses DaisyUI with Tailwind CSS 4. Customize colors by:

1. **DaisyUI Theme**: Modify `tailwind.config.ts` to choose/customize themes
2. **Tailwind Colors**: Extend `tailwind.config.ts` with custom colors
3. **CSS Variables**: DaisyUI uses CSS custom properties for dynamic theming

## Deployment

The build process:
```bash
npm run build  # Creates optimized dist/ directory
```

Deployment strategy depends on your hosting:
- **Static hosting** (Netlify, Vercel): Deploy the `dist/` folder
- **SCP/SSH**: Customize the deploy script in `package.json`
- **Docker**: Create a Dockerfile based on your hosting needs

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

## License

This is a template for the City of Franklin public-facing applications.

## Support

For questions about this template or best practices for public-facing applications, refer to:
- `CLAUDE.md` for project-specific guidance
- Component examples in `src/components/example/` for architectural patterns
- Individual component README files (if provided)
