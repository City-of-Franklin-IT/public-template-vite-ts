# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Parent Template — Vite + TypeScript** is a reference repository for building modern web applications for the City of Franklin. This template establishes architectural patterns, component organization standards, and styling conventions that should be followed across projects created from this template.

This is a **template repository** — not a production application. Its code is reference material and should be adapted and customized for specific projects. Use this as a starting point and remove/replace the example components with your actual application logic.

## Development Commands

```bash
# Start development server on port 6000
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Run tests with Vitest
npm test
```

## Standards and Guidelines

When auditing, reviewing, or modifying this codebase, use `/opt/claude-standards/react` and `/opt/claude-standards/typescript` as guides and templates.

## Architecture

### Component Organization

All components follow a consistent structure pattern:

```
ComponentName/
├── index.tsx         # Main component export
├── components.tsx    # Sub-components (if needed)
├── hooks.ts          # Component-specific hooks
├── utils.ts          # Component-specific utilities
└── test.tsx          # Component tests (co-located, single file)
```

Benefits of this structure:
- **Colocation**: Component logic stays together
- **Scalability**: Easy to add sub-components or utilities
- **Testability**: Tests live alongside code
- **Readability**: Clear separation of concerns

### Component Organization by Type

Components are organized into functional directories:

```
src/components/
├── layout/              # Layout wrappers and structural components
│   ├── Header/          # Application header with navigation
│   ├── Footer/          # Application footer
│   ├── Layout/          # Main layout wrapper
│   ├── loading/         # Loading state component
│   └── nav/             # Navigation-specific components
├── form-elements/       # Reusable form components
│   ├── FormLabel/       # Form field labels
│   ├── FormError/       # Error message display
│   └── buttons/         # Button variations
├── error/               # Error handling and display
│   ├── Error/           # Error message component
│   └── ErrorBoundary/   # Error boundary wrapper
├── attachments/         # File upload and management
│   ├── Dropzone/        # File drop zone
│   ├── NewAttachment/   # New file upload
│   └── ExistingAttachment/ # Display existing files
├── icons/               # Icon components
│   └── Icons/           # Icon library wrapper
└── btns/                # Button variations
    ├── CreateNewBtn/    # Create action button
    └── UpdateBtn/       # Update action button
```

### Page and Container Hierarchy

```
Layout                          # Main layout wrapper
├── Header                      # Header/navigation
├── PageWrapper                 # Page transition animation
│   └── [Page Content]
│       └── [Your Components]
└── Footer                      # Footer
```

**Key concepts:**
- **Pages**: Full-page components in `src/pages/` matching routes
- **Layout Components**: Structural components in `src/components/layout/`
- **Feature Components**: Domain-specific components organized by feature
- **Utility Components**: Reusable components in `src/utils/`

### Data Flow Patterns

#### Pattern 1: Server State with TanStack Query
```typescript
// Fetch data from an API using React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: () => AppActions.getItems(),
})
```

#### Pattern 2: Component State for Forms
```typescript
// Local state for form inputs
const [formData, setFormData] = useState({ name: '' })

// Lift state to container when needed for sharing
// Then pass down via props to presentational components
```

#### Pattern 3: Context for App-Wide State
```typescript
// Use AppContext (in src/context/App/) for global state
// Or create feature-specific contexts for domain logic
```

### Path Aliases

Configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig.json`:

```typescript
@              → src/
@components    → src/components/
@config        → src/config/
@context       → src/context/
@helpers       → src/helpers/
@pages         → src/pages/
@utils         → src/utils/
@assets        → src/assets/
@test          → src/test/
```

Use these aliases in all imports for consistency. Note: Do NOT include `/` in the import path after the alias (e.g., `@components/layout/Header` not `@/components/layout/Header`).

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
export async function getItems(headers: Headers): Promise<Item[]> {
  const response = await fetch(`${API_BASE_URL}/items`, { headers })
  if (!response.ok) throw new Error(`Failed to fetch items`)
  return response.json()
}

// In components:
const { data } = useQuery({
  queryKey: ['items'],
  queryFn: () => AppActions.getItems(authHeaders(token)),
})
```

### Helpers and Utilities

**Location**: `src/helpers/`

- **hooks.ts**: Custom hooks for authentication, window size, form handling, etc.
- **utils.ts**: Utility functions for formatting, validation, common operations

**Built-in helpers:**
- `useGetToken()` - Get authentication token
- `useActiveAccount()` - Get current user information
- `useEnableQuery()` - Guard queries behind authentication
- `useWindowSize()` - Track window dimensions
- `useIsMobile()` - Check if viewport is mobile
- `createAuthHeaders()` - Create authorization headers
- `formatDate()`, `formatDateTime()` - Date formatting
- `debounce()` - Debounce function calls
- `isEmpty()` - Check if value is empty
- And more utility functions in `src/helpers/utils.ts`

### Utility Components

**Location**: `src/utils/`

- **HandleLoading**: Loading state wrapper component
- **Toast**: Toast notification utilities (`showSuccess`, `showError`, etc.)
- **ErrorHandler**: Error message display component
- **ErrorBoundary**: React error boundary wrapper
- **PageWrapper**: Page transition animations
- **CardContainer**: Card layout wrapper

### Environment Configuration

Config in `src/config/index.ts`:
- `APP_BASE`: Base path for routing (e.g., `/app` for deployment at example.com/app)
- `APP_TITLE`: Application title
- `APP_DESCRIPTION`: Application description
- `ORG_NAME`: Organization name
- `API_BASE_URL`: API endpoint URL
- `NODE_ENV`: Environment (development, test, production)

Extend this file with any additional configuration your app needs.

### Authentication

Uses Azure MSAL (@azure/msal-react) for authentication:
- **MSAL Config**: `src/context/Auth/config.ts` contains client ID and tenant ID
- **Auth Context**: `src/context/Auth/AuthContext.tsx` manages auth state
- **Protected Routes**: `src/components/layout/ProtectedRoute/` wraps protected pages

Key auth hooks in `src/helpers/hooks.ts`:
- `useGetToken()` - Returns auth token for API calls
- `useActiveAccount()` - Returns user info
- `useEnableQuery()` - Guards data fetching behind authentication

### Testing

- **Framework**: Vitest with jsdom environment
- **Library**: React Testing Library for component tests
- **Setup**: `src/test/setup.ts` contains test utilities and mocks
- **Location**: Write tests co-located with components (e.g., `Component/test.tsx`)
- **Naming**: Test files use `.test.tsx` convention

**Testing best practices:**
- Test user interactions, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`) over `getByTestId`
- Mock API calls using `vi.mock()` or test utilities
- Keep tests focused and maintainable

### Styling

**Tailwind CSS 4** with **DaisyUI** components:
- Utility-first CSS framework (Tailwind) for styling
- Pre-built component library (DaisyUI) for common UI elements
- Dark mode support built-in via CSS custom properties

**To customize:**
1. **Themes**: Edit `tailwind.config.ts` to choose/customize DaisyUI themes
2. **Colors**: Extend `tailwind.config.ts` with custom Tailwind colors
3. **Spacing**: Modify Tailwind's spacing scale in `tailwind.config.ts`

**Color consistency:**
- Use DaisyUI's semantic colors: `bg-primary`, `text-secondary`, etc.
- Avoid hardcoded hex colors — use Tailwind utilities
- Document any custom color schemes in your project's CLAUDE.md

### Animations

Motion library is included for page transition animations via `PageWrapper`.

```typescript
// Use PageWrapper for smooth page transitions
<PageWrapper>
  <YourPageContent />
</PageWrapper>
```

## Template Customization Checklist

When using this template for a new project:

- [ ] Update `package.json` name, version, and scripts
- [ ] Update `src/config/index.ts` with your app's configuration
- [ ] Update `src/pages/Home/` or replace with your landing page
- [ ] Update `src/components/layout/Header/` with your header
- [ ] Update `src/components/layout/Footer/` with your footer
- [ ] Define your API types in `src/context/App/AppTypes.ts`
- [ ] Implement your API functions in `src/context/App/AppActions.ts`
- [ ] Add your routes to `src/App.tsx`
- [ ] Update this `CLAUDE.md` with project-specific notes
- [ ] Update `README.md` to describe your application
- [ ] Run `npm install` to install dependencies
- [ ] Run `npm test` to verify setup

## Error Handling

The template includes:
- **React Error Boundary** (`src/utils/ErrorBoundary/`): Catches render errors
- **Error Component** (`src/utils/ErrorHandler/`): Display error messages
- **Try/catch** in async functions for API errors
- **Loading and error states** in hooks and components

Pattern for error handling in data fetching:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['items'],
  queryFn: AppActions.getItems,
  retry: 3, // Retry failed requests 3 times
})

if (isLoading) return <HandleLoading isLoading />
if (error) return <ErrorHandler error={error} onRetry={() => {}} />
return <ItemList items={data} />
```

## Notifications

Toast notifications are available throughout the app:

```typescript
import { showSuccess, showError, showWarning, showInfo } from '@utils/Toast'

// Show notification
showSuccess('Operation successful!')
showError('Something went wrong')
showWarning('Be careful')
showInfo('Here's some information')
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

## Common Patterns

### Handling Form Submissions
```typescript
const [formData, setFormData] = useState({ name: '' })
const mutation = useMutation({
  mutationFn: AppActions.submitForm,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] })
    showSuccess('Form submitted!')
  },
})

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  mutation.mutate(formData)
}
```

### Creating a Modal/Dialog
Use DaisyUI's modal component alongside state:
```typescript
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    <button onClick={() => setIsOpen(true)}>Open</button>
    <input type="checkbox" id="modal" className="modal-toggle" checked={isOpen} onChange={() => {}} />
    <div className="modal">
      <div className="modal-box">
        <h3>Modal Title</h3>
        <div className="modal-action">
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  </>
)
```

## Troubleshooting

**Port conflict on `npm run dev`?**
- Dev server runs on port 6000 by default
- Modify the dev script in `package.json` to use a different port

**Type errors in components?**
- Ensure types are exported from `src/context/App/AppTypes.ts`
- Check that imports use correct path aliases
- Verify TypeScript paths in `tsconfig.json`

**Tests failing?**
- Verify `src/test/setup.ts` includes necessary mocks
- Check that test environment is configured in `vitest.config.ts`
- Ensure test file naming convention: `*.test.tsx`

**Import errors with path aliases?**
- Verify aliases in `vite.config.ts` and `tsconfig.json` match
- Use aliases WITHOUT trailing `/` (e.g., `@components/layout/Header`)
- Clear node_modules and reinstall if issues persist

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Vitest Documentation](https://vitest.dev/)
- [Azure MSAL Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
