import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border ${error ? 'border-ate-red' : 'border-ate-border'} bg-ate-bg px-3 py-2 text-sm text-ate-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
