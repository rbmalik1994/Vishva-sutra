import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

/**
 * Container for avatar content.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User name" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Callback when image fails to load */
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}

/**
 * Image component for the avatar.
 * Falls back to AvatarFallback if the image fails to load.
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, onLoadingStatusChange, onLoad, onError, ...props }, ref) => {
    const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>(
      'loading'
    );

    React.useEffect(() => {
      onLoadingStatusChange?.(status);
    }, [status, onLoadingStatusChange]);

    if (status === 'error') {
      return null;
    }

    return (
      <img
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        onLoad={(e) => {
          setStatus('loaded');
          onLoad?.(e);
        }}
        onError={(e) => {
          setStatus('error');
          onError?.(e);
        }}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Fallback content shown when the avatar image fails to load.
 * Typically displays initials or an icon.
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = 'AvatarFallback';

/**
 * Utility to generate initials from a name.
 *
 * @example
 * getInitials('John Doe') // 'JD'
 * getInitials('Alice') // 'A'
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
