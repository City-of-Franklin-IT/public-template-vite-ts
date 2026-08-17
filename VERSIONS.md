# is-dev-templates — Standardized Dependencies

All templates in this repository use the same versions of core dependencies to ensure consistency and interoperability. This document specifies the versions used across all templates.

## Core Dependencies

### Runtime
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **react-router**: ^7.9.4
- **typescript**: ~5.8.3

### Build & Development
- **vite**: ^7.1.9
- **@vitejs/plugin-react**: ^5.0.4
- **vite-tsconfig-paths**: ^5.1.4

### Styling
- **tailwindcss**: ^4.1.14
- **@tailwindcss/vite**: ^4.1.14
- **daisyui**: ^5.1.29

### State Management & Data Fetching
- **@tanstack/react-query**: ^5.90.2
- **@tanstack/react-query-devtools**: ^5.90.2

### Forms & UI
- **react-hook-form**: ^7.51.5
- **motion**: ^12.23.22
- **react-error-boundary**: ^6.0.0

### Authentication (Parent & Child Templates Only)
- **@azure/msal-browser**: ^4.30.0
- **@azure/msal-react**: ^3.0.6

### Testing
- **vitest**: ^4.1.9
- **@vitest/ui**: ^4.1.9
- **jsdom**: ^26.1.0
- **@testing-library/react**: ^16.3.0
- **@testing-library/dom**: ^10.4.1
- **@testing-library/jest-dom**: ^6.9.1
- **@testing-library/user-event**: ^14.6.1

### Development Tools
- **eslint**: ^9.37.0
- **@eslint/js**: ^9.37.0
- **typescript-eslint**: ^8.46.0
- **@typescript-eslint/eslint-plugin**: ^8.46.0
- **@typescript-eslint/parser**: ^8.46.0
- **eslint-plugin-react-hooks**: ^5.2.0
- **eslint-plugin-react-refresh**: ^0.4.23
- **globals**: ^16.4.0
- **@types/node**: ^24.7.0
- **@types/react**: ^19.2.2
- **@types/react-dom**: ^19.2.1

## Optional Libraries by Template

### Public Template
- None (additional to core)

### Child Template (Internal Child SPA)
- All core + Authentication (MSAL)

### Parent Template (Internal Primary SPA)
- All core + Authentication (MSAL)
- **react-dropzone**: ^14.2.3 (for file uploads)
- **react-icons**: ^5.2.1 (for icon library)
- **react-toastify**: ^11.0.5 (for notifications)

## Rationale

- **React 19**: Latest stable with improved performance and features
- **Vite 7**: Latest build tool with optimal optimization
- **Tailwind CSS 4**: Latest with improved performance
- **MSAL 4.30**: Latest Azure authentication library
- **React Query 5**: Latest data fetching patterns

## Updating Versions

When updating a dependency:
1. Update in ALL affected templates
2. Test thoroughly in one template first
3. Update VERSIONS.md with the new version
4. Create a commit documenting the update across all templates

## Template-Specific Documentation

- **public-template**: `branches/public-template/CLAUDE.md`
- **child-template**: `branches/child-template/CLAUDE.md`
- **parent-template**: `branches/parent-template/CLAUDE.md`
