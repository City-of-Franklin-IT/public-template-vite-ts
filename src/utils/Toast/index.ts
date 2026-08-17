/**
 * Toast Notification Utilities
 *
 * Helper functions for displaying toast notifications using react-toastify.
 * Import these functions to show success, error, warning, and info messages.
 */

import { toast } from 'react-toastify'

/**
 * Show success toast notification
 * @param message - Message to display
 */
export const showSuccess = (message: string): void => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

/**
 * Show error toast notification
 * @param message - Message to display
 */
export const showError = (message: string): void => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

/**
 * Show warning toast notification
 * @param message - Message to display
 */
export const showWarning = (message: string): void => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

/**
 * Show info toast notification
 * @param message - Message to display
 */
export const showInfo = (message: string): void => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

/**
 * Show custom toast notification
 * @param message - Message to display
 * @param type - Toast type: 'success' | 'error' | 'warning' | 'info'
 */
export const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info'
): void => {
  switch (type) {
    case 'success':
      showSuccess(message)
      break
    case 'error':
      showError(message)
      break
    case 'warning':
      showWarning(message)
      break
    case 'info':
      showInfo(message)
      break
  }
}
