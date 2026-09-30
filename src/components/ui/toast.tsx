"use client"

import { Toaster, toast } from "react-hot-toast"

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--ate-panel)',
          color: 'var(--ate-white)',
          border: '1px solid var(--ate-border)',
        },
        success: {
          iconTheme: {
            primary: 'var(--ate-success)',
            secondary: 'var(--ate-panel)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--ate-red)',
            secondary: 'var(--ate-panel)',
          },
        },
      }}
    />
  )
}

export { ToastProvider, toast }
