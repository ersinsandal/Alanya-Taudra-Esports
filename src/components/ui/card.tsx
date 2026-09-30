import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'featured'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = "rounded-lg border border-ate-border bg-ate-panel text-ate-white p-6"
    
    const variants = {
      default: "",
      interactive: "transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer",
      featured: "border-ate-red shadow-[0_0_15px_rgba(208,0,0,0.15)]"
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 pb-4 ${className}`} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3 ref={ref} className={`font-semibold leading-none tracking-tight text-white ${className}`} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => (
    <p ref={ref} className={`text-sm text-neutral-400 ${className}`} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`pt-0 ${className}`} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex items-center pt-4 ${className}`} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
