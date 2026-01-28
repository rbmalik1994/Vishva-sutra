import * as React from 'react';
import { cn } from '../../lib/utils';

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, icon, title, description, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-muted-foreground [&>svg]:h-12 [&>svg]:w-12">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
      {children}
    </div>
  )
);
Empty.displayName = 'Empty';

const EmptyIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn('h-12 w-12 text-muted-foreground', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
));
EmptyIcon.displayName = 'EmptyIcon';

export { Empty, EmptyIcon };
export type { EmptyProps };

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  >
    {children}
  </h3>
));
EmptyTitle.displayName = 'EmptyTitle';

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('mt-2 text-sm text-muted-foreground max-w-sm', className)}
    {...props}
  >
    {children}
  </p>
));
EmptyDescription.displayName = 'EmptyDescription';

const EmptyAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('mt-4', className)} {...props}>
    {children}
  </div>
));
EmptyAction.displayName = 'EmptyAction';

export { EmptyTitle, EmptyDescription, EmptyAction };
