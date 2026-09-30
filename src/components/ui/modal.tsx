"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div 
        className={`relative w-full ${sizes[size]} rounded-lg border border-ate-border bg-ate-panel p-6 shadow-lg`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-lg font-semibold text-ate-white">{title}</h2>}
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-ate-bg transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ate-red focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="text-ate-white">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export { Modal }
