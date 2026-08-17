/**
 * Application Configuration
 *
 * Customize these values for your project. This config is designed to be
 * easily modified when creating a new application from this template.
 */

// Base path for routing - change this to your app's deployment path
// e.g., '/my-app' if deployed at example.com/my-app
export const APP_BASE = '/'

// Application title - displayed in browser tab and header
export const APP_TITLE = 'Parent Template'

// Application description
export const APP_DESCRIPTION = 'A professional internal application template with Azure Entra authentication'

// Organization name (optional)
export const ORG_NAME = 'City of Franklin'

// Organization URL (optional)
export const ORG_URL = 'https://www.franklintn.gov'

// Environment mode
export const NODE_ENV = import.meta.env.MODE as 'development' | 'test' | 'production'

// API Base URL - update this to your API endpoint
// Examples:
//   - 'https://api.example.com' for production API
//   - 'http://localhost:3000' for local development
// Leave as empty string if no API is needed
export const API_BASE_URL = ''
