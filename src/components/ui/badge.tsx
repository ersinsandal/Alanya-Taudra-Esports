import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'red' | 'green' | 'yellow' | 'outline' | 'secondary'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ate-red"
    
    const variants: Record<string, string> = {
      default: "bg-ate-surface text-ate-white",
      red: "bg-ate-red text-ate-white",
      green: "bg-ate-success/20 text-ate-success",
      yellow: "bg-ate-warning/20 text-ate-warning",
      outline: "border border-ate-border text-ate-white",
      secondary: "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
