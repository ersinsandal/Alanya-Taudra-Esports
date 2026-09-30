import * as React from "react"
import { Loader2 } from "lucide-react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'default' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, asChild = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red disabled:pointer-events-none disabled:opacity-50"
    
    const variants: Record<string, string> = {
      primary: "bg-ate-red text-ate-white hover:bg-ate-red-bright",
      default: "bg-ate-red text-ate-white hover:bg-ate-red-bright",
      secondary: "border border-ate-border bg-transparent hover:bg-ate-surface text-ate-white",
      outline: "border border-ate-border bg-transparent hover:bg-ate-surface text-ate-white",
      ghost: "hover:bg-ate-surface text-ate-white",
      danger: "bg-ate-red-deep text-ate-white hover:bg-ate-red"
    }

    const sizes: Record<string, string> = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg",
      icon: "h-10 w-10 p-0"
    }

    const finalClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: `${finalClassName} ${(children as React.ReactElement<{ className?: string }>).props.className || ''}`
      })
    }

    return (
      <button
        ref={ref}
        className={finalClassName}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
