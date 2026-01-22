import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to animate the skeleton */
  animate?: boolean;
}

/**
 * A placeholder loading state component.
 * Useful for indicating content is loading without specific dimensions.
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton className="h-4 w-[200px]" />
 *
 * // Card skeleton
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 *   <Skeleton className="h-4 w-[150px]" />
 * </div>
 *
 * // Avatar skeleton
 * <Skeleton className="h-12 w-12 rounded-full" />
 *
 * // Without animation
 * <Skeleton animate={false} className="h-4 w-full" />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animate = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md bg-primary/10',
          animate && 'animate-pulse',
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

/**
 * Pre-built skeleton for text content.
 */
interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
}

function SkeletonText({
  lines = 3,
  className,
  lineClassName,
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full',
            lineClassName
          )}
        />
      ))}
    </div>
  );
}

/**
 * Pre-built skeleton for card content.
 */
interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

function SkeletonCard({
  className,
  showImage = true,
  lines = 3,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 shadow-sm space-y-4',
        className
      )}
      aria-hidden="true"
    >
      {showImage && <Skeleton className="h-32 w-full rounded-md" />}
      <SkeletonText lines={lines} />
    </div>
  );
}

/**
 * Pre-built skeleton for avatar with text.
 */
interface SkeletonAvatarProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function SkeletonAvatar({
  className,
  showText = true,
  size = 'md',
}: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn('flex items-center space-x-3', className)}
      aria-hidden="true"
    >
      <Skeleton className={cn('rounded-full', sizeClasses[size])} />
      {showText && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      )}
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
