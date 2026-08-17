# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Public Template — Vite + TypeScript** is a reference repository for building modern, public-facing web applications for the City of Franklin. This template establishes architectural patterns, component organization standards, and styling conventions that should be followed across all public-facing applications.

This is a **template repository** — not a production application. Its code is reference material and should be adapted and customized for specific projects. Use this as a starting point and remove/replace the example components with your actual application logic.

## Development Commands

```bash
# Start development server
npm run dev

# Run tests with Vitest
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

## Standards and Guidelines

When auditing, reviewing, or modifying this codebase, use `/opt/claude-standards/react` and `/opt/claude-standards/typescript` as guides and templates.

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

Use these aliases in all imports for consistency.

### Routing

Uses React Router 7. The template includes a basic setup:

**To add routes:**
1. Create a new page component in `src/pages/YourPage/index.tsx`
2. Import it in `src/App.tsx`
3. Add a new route in the `<Routes>` element
4. Adjust `APP_BASE` in `src/config/index.ts` if needed for your app's path

### API Integration

**Location**: `src/context/App/`

- **AppActions.ts**: Defines all API functions (fetch, POST, etc.)
- **AppTypes.ts**: TypeScript types for API responses and request bodies

**Pattern for API functions:**
```typescript
// AppActions.ts
export async function getItems(): Promise<Item[]> {
  const response = await fetch(`${CPSC_BASE_URL}/items`);
  if (!response.ok) throw new Error(`Failed to fetch items`);
  return response.json();
}

// In components:
const { data } = useQuery({
  queryKey: ['items'],
  queryFn: AppActions.getItems,
});
```

### Environment Configuration

Config in `src/config/index.ts`:
- `APP_BASE`: Base path for routing (e.g., `/app` for deployment at example.com/app)
- API URLs and other environment-specific settings

Extend this file with any additional configuration your app needs.

### Testing

- **Framework**: Vitest with jsdom environment
- **Library**: React Testing Library for component tests
- **Setup**: `src/test/setup.ts` contains test utilities and mocks
- **Location**: Write tests alongside components (e.g., `Component/test/index.spec.tsx`)

**Testing best practices:**
- Test user interactions, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`) over `getByTestId`
- Mock API calls using `vi.mock()` or `MSW` (Mock Service Worker)


## Template Customization Checklist

When using this template for a new project:

- [ ] Update `package.json` name, version, and scripts
- [ ] Update `src/pages/Home/` with your landing page
- [ ] Customize `src/components/layout/Banner/` (header/navigation)
- [ ] Customize `src/components/layout/Footer/` (footer)
- [ ] Define your API types in `src/context/App/AppTypes.ts` (if needed)
- [ ] Implement your API functions in `src/context/App/AppActions.ts` (if needed)
- [ ] Add your routes to `src/App.tsx`
- [ ] Update `src/config/index.ts` with your configuration
- [ ] Update this `CLAUDE.md` with project-specific notes
- [ ] Update `README.md` to describe your application
- [ ] Run `npm install` and `npm test` to verify setup

## Error Handling

The template includes:
- **React Error Boundary** (`src/utils/ErrorBoundary/`): Catches render errors
- **Try/catch** in async functions for API errors
- **Loading and error states** in hooks and components

Pattern for error handling in data fetching:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: AppActions.getItems,
  retry: 3, // Retry failed requests 3 times
});

if (isLoading) return <Loading />;
if (error) return <div>Error: {error.message}</div>;
return <ItemList items={data} />;
```

## Performance Considerations

- **Code splitting**: React Router handles route-based splitting
- **Lazy loading**: Use `React.lazy()` for optional/heavy components
- **Memoization**: Use `useMemo` and `useCallback` sparingly, profile first
- **Query caching**: TanStack Query handles API response caching
- **Build optimization**: Vite tree-shakes unused code during build

## Browser Support

Built with modern browser features. Tested on:
- Chrome/Edge latest
- Firefox latest
- Safari latest


## Troubleshooting

**Port conflict on `npm run dev`?**
- Modify the dev script in `package.json` to use a different port

**Type errors in components?**
- Ensure types are exported from `src/context/App/AppTypes.ts`
- Check that imports use correct path aliases

**Tests failing?**
- Verify `src/test/setup.ts` includes necessary mocks
- Check that test environment is configured in `vitest.config.ts`

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Vitest Documentation](https://vitest.dev/)
