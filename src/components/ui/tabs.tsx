"use client"

import * as React from "react"
import { motion } from "framer-motion"

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: TabItem[];
  defaultTab?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className = '',
  ...props
}) => {
  const initialValue = defaultValue || defaultTab || (tabs && tabs[0]?.id) || ''
  const [internalValue, setInternalValue] = React.useState(initialValue)

  const activeValue = controlledValue !== undefined ? controlledValue : internalValue

  const handleValueChange = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val)
    }
    onValueChange?.(val)
  }

  // If using the config-based API
  if (tabs && tabs.length > 0 && !children) {
    return (
      <div className={`w-full ${className}`} {...props}>
        <div className="flex space-x-1 border-b border-ate-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleValueChange(tab.id)}
              className={`${
                activeValue === tab.id ? "text-ate-white" : "text-ate-muted hover:text-ate-white"
              } relative rounded-t-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red`}
            >
              {tab.label}
              {activeValue === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-ate-red"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-4 text-ate-white">
          {tabs.find(t => t.id === activeValue)?.content}
        </div>
      </div>
    )
  }

  // If using composable child API
  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={`w-full ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 p-1 text-neutral-400 ${className}`}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = '', value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const isSelected = context?.value === value

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context?.onValueChange(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
          isSelected
            ? "bg-[#D00000] text-white shadow-sm"
            : "hover:bg-neutral-800 hover:text-white"
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className = '', value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (context?.value !== value) return null

    return (
      <div
        ref={ref}
        className={`mt-4 ring-offset-background focus-visible:outline-none ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
