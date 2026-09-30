"use client"

import * as React from "react"

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 px-2 py-1 text-xs text-ate-white bg-ate-panel border border-ate-border rounded shadow-lg -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap">
          {content}
          <div className="absolute w-2 h-2 bg-ate-panel border-b border-r border-ate-border transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </div>
  )
}

export { Tooltip }
