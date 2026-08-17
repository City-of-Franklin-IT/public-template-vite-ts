# is-dev-templates

Professional templates for building public-facing and internal applications for the City of Franklin. This repository contains standardized, production-ready React 19 + TypeScript + Vite templates with consistent architecture, styling, and conventions.

## 🎯 Three Templates

Choose the template that matches your application's authentication and deployment model:

### 1. **public-template** 
Public-facing applications with no authentication
- **Use for**: Public dashboards, informational sites, external-facing applications
- **Authentication**: None
- **Login UI**: No
- **Examples**: Recalls dashboard, public event information

**Branch**: `public-template`

### 2. **child-template**
Protected SPAs within a larger application suite
- **Use for**: Child applications that rely on parent app for authentication
- **Authentication**: Silent token acquisition from Entra ID (parent app handles login)
- **Login UI**: No (redirects to parent if not authenticated)
- **Features**: Entra app registration required, token refresh mechanism

**Branch**: `child-template`

### 3. **parent-template**
Standalone or primary applications with full authentication
- **Use for**: Main applications, primary SPAs, standalone internal tools
- **Authentication**: Full Azure Entra ID integration with login UI
- **Login UI**: Yes
- **Features**: MSAL integration, role-based access, token management

**Branch**: `parent-template`

## 🚀 Quick Start

### Clone a Template

```bash
# Public template (no auth)
git clone --branch public-template https://github.com/City-of-Franklin-IT/is-dev-templates.git my-public-app
cd my-public-app

# Child template (silent auth)
git clone --branch child-template https://github.com/City-of-Franklin-IT/is-dev-templates.git my-child-app
cd my-child-app

# Parent template (full auth)
git clone --branch parent-template https://github.com/City-of-Franklin-IT/is-dev-templates.git my-app
cd my-app
```

### Setup & Development

```bash
npm install
npm run dev        # Start dev server
npm test           # Run tests
npm run lint       # Run linter
npm run build      # Build for production
```

## 📦 Standardized Tech Stack

All templates use the same core dependencies (see **VERSIONS.md** for complete list):

- **React 19** with TypeScript 5.8
- **Vite 7** as build tool
- **React Router 7** for routing
- **TanStack Query 5** for server state
- **Tailwind CSS 4** + **DaisyUI 5** for styling
- **Vitest** + React Testing Library for testing

**Authentication (child & parent only)**:
- **MSAL v4.30** for Azure Entra authentication

## 🏗️ Architecture

### Consistent Structure Across All Templates

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout wrapper
│   ├── example/         # Reference components (remove for production)
│   └── shared/          # Reusable UI components
├── context/
│   ├── App/             # Application state and API integration
│   └── Auth/            # Authentication context (parent & child only)
├── pages/               # Route-level page components
├── utils/
│   ├── ErrorBoundary/   # Error handling
│   └── PageWrapper/     # Page transition animations
├── helpers/             # Utility functions and custom hooks
├── config/              # Environment configuration
├── test/                # Test setup and utilities
└── assets/              # Static assets
```

### Component Pattern

```typescript
ComponentName/
├── index.tsx         # Main export
├── components.tsx    # Sub-components
├── hooks.ts          # Custom hooks
├── utils.ts          # Utilities
└── test.tsx          # Tests (co-located)
```

## 📚 Documentation

### For Each Template
- **CLAUDE.md**: Architecture, patterns, and coding standards specific to that template
- **README.md**: Setup and usage instructions

### For All Templates
- **VERSIONS.md**: Complete standardized dependency list
- **docs/**: Additional documentation (in main branch)

## 🔐 Authentication Patterns

### Public Template
No authentication required. Application is accessible to all users.

### Child Template
- Parent app authenticates user with Entra ID
- Child app silently acquires its own token using parent's authenticated session
- No login screen in child app
- Redirects to parent if silent token acquisition fails

### Parent Template
- Full MSAL implementation with login UI
- User logs in with Entra ID credentials
- Manages tokens and handles refresh
- Provides authentication context for child apps

## 🎨 Styling & Theming

- **Tailwind CSS 4**: Utility-first CSS with latest features
- **DaisyUI 5**: Pre-built component library
- **Dark mode support**: Built-in via CSS custom properties
- **Responsive**: Mobile-first responsive design

Customize colors by modifying Tailwind configuration.

## 🧪 Testing

All templates include:
- **Vitest** for unit and integration testing
- **React Testing Library** for component testing
- **jsdom** environment
- **Setup file**: `src/test/setup.ts`

Test files use `.test.tsx` or `.spec.tsx` naming and are co-located with components.

```bash
npm test              # Run tests in watch mode
npm test -- --run    # Run once without watch
npm test -- ui       # Open Vitest UI
```

## 🚢 Deployment

### Build
```bash
npm run build    # Creates optimized dist/ directory
```

### Deploy
Each template can be deployed to:
- **Static hosting**: Netlify, Vercel, GitHub Pages
- **City servers**: Via SCP or CI/CD pipeline
- **Docker**: Create a Dockerfile for containerized deployment

Customize the `deploy` script in `package.json` for your hosting.

## 🔧 Configuration

Each template has a `src/config/index.ts` file for environment-specific settings:

```typescript
export const APP_BASE = '/'              // Routing base path
export const APP_TITLE = 'Your App'      // Browser title
export const API_BASE_URL = '...'        // API endpoint (if needed)
```

## 📋 Template Customization Checklist

When starting a new project from a template:

- [ ] Update `package.json` (name, version, scripts)
- [ ] Update `src/config/index.ts` (APP_BASE, APP_TITLE, etc.)
- [ ] Replace `src/components/layout/Banner/` with your branding
- [ ] Remove `src/components/example/` folder
- [ ] Update `src/pages/Home/` with your landing page
- [ ] Configure API integration in `src/context/App/`
- [ ] Set up routes in `src/App.tsx`
- [ ] Update README.md and CLAUDE.md
- [ ] Configure authentication (if child or parent template)
- [ ] Run `npm install` and `npm test` to verify setup
- [ ] Push to your repository

## 🔄 Keeping Templates in Sync

All templates share the same core dependencies and architecture. When updating:

1. Update in one template and test thoroughly
2. Apply the same update to all other templates
3. Commit with a message noting all affected templates
4. Update VERSIONS.md if dependencies changed

## 🤝 Contributing

When making improvements to the templates:
- Update all three templates consistently
- Update VERSIONS.md if adding/removing dependencies
- Document changes in each template's CLAUDE.md
- Test across all three templates before committing

## 📖 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [DaisyUI Components](https://daisyui.com)
- [React Router Documentation](https://reactrouter.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [MSAL.js Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)

## 📞 Support

For questions about:
- **Template usage**: See the template's CLAUDE.md
- **Architecture decisions**: See docs/ in main branch
- **Shared conventions**: See VERSIONS.md

---

**Is-dev-templates** — Standards-based templates for City of Franklin applications
