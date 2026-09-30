import * as React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border ${error ? 'border-ate-red' : 'border-ate-border'} bg-ate-bg px-3 py-2 text-sm text-ate-white placeholder:text-ate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
