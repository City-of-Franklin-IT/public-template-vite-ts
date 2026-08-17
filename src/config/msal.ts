/**
 * Microsoft Authentication Library (MSAL) Configuration
 *
 * Configure Azure Entra ID (formerly Azure AD) authentication for this application.
 * Update the values below with your application's registration details from Azure Portal.
 *
 * Steps to configure:
 * 1. Register your application in Azure Portal (Entra ID > App registrations)
 * 2. Copy the Application (client) ID
 * 3. Create a client secret or certificate
 * 4. Add redirect URIs for your app (e.g., http://localhost:5173 for dev, your app URL for prod)
 * 5. Update the values below
 */

import { PublicClientApplication } from '@azure/msal-browser'

// Your application's client ID from Azure Portal
const CLIENT_ID = import.meta.env.VITE_MSAL_CLIENT_ID || 'YOUR_CLIENT_ID_HERE'

// Your tenant ID from Azure Portal (or "common" for multi-tenant)
const TENANT_ID = import.meta.env.VITE_MSAL_TENANT_ID || 'common'

// Authority URL for token endpoint
const AUTHORITY = `https://login.microsoftonline.com/${TENANT_ID}`

// Redirect URI after login (where the app will redirect after Azure authentication)
// This must be registered in your Azure app registration
const REDIRECT_URI = import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin

// Scopes required for your application
// Common scopes:
//   - "openid" - for ID token
//   - "profile" - for basic profile info
//   - "email" - for user's email
// Add API-specific scopes if your app calls APIs (e.g., "api://YOUR_API_ID/.default")
const SCOPES = ['openid', 'profile', 'email']

/**
 * MSAL Configuration Object
 */
export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITY,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage', // or 'localStorage'
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
  },
}

/**
 * Scopes configuration for different scenarios
 */
export const loginScopes = SCOPES

/**
 * Initialize and export MSAL Public Client Application
 * This is used by the MsalProvider to handle authentication
 */
export const msalInstance = new PublicClientApplication(msalConfig)

/**
 * Environment variables needed in your .env file:
 *
 * VITE_MSAL_CLIENT_ID=your_client_id
 * VITE_MSAL_TENANT_ID=your_tenant_id
 * VITE_MSAL_REDIRECT_URI=http://localhost:5173 (or your app URL)
 *
 * For development:
 *   VITE_MSAL_CLIENT_ID=00000000-0000-0000-0000-000000000000
 *   VITE_MSAL_TENANT_ID=common
 *   VITE_MSAL_REDIRECT_URI=http://localhost:5173
 *
 * For production, use your actual Azure app registration values.
 */
