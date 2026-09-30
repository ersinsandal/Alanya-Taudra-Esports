import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt, fallback, size = 'md', isOnline, children, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg'
    }

    if (children) {
      return (
        <div className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-neutral-800 ${className}`} ref={ref} {...props}>
          {children}
        </div>
      )
    }

    return (
      <div className={`relative inline-block ${className}`} ref={ref} {...props}>
        <div className={`${sizes[size]} rounded-full bg-ate-surface border border-ate-border overflow-hidden flex items-center justify-center text-ate-white font-medium`}>
          {src ? (
            <img src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" />
          ) : (
            <span>{fallback || "?"}</span>
          )}
        </div>
        {isOnline !== undefined && (
          <span
            className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-ate-bg ${
              isOnline ? 'bg-ate-success' : 'bg-ate-muted'
            } ${size === 'sm' ? 'h-2 w-2' : size === 'xl' ? 'h-4 w-4' : 'h-2.5 w-2.5'}`}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className = '', alt = 'Avatar', ...props }, ref) => (
    <img ref={ref} alt={alt} className={`aspect-square h-full w-full object-cover ${className}`} {...props} />
  )
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-neutral-200 font-medium ${className}`} {...props} />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
