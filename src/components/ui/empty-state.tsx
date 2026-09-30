import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Button } from "./button"

export interface EmptyStateProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  children
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-ate-border rounded-lg bg-ate-panel/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ate-surface mb-4 text-ate-muted">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-ate-white mb-2">{title}</h3>
      <p className="text-sm text-ate-muted max-w-sm mb-6">{description}</p>
      {actionLabel && (actionHref ? (
        <a href={actionHref}>
          <Button variant="primary">{actionLabel}</Button>
        </a>
      ) : onAction ? (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      ) : null)}
      {children}
    </div>
  )
}

export { EmptyState, EmptyState as ATEEmptyState }
