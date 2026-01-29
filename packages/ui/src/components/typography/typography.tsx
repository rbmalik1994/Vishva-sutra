import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantElementMap = {
  h1: 'h1';
  h2: 'h2';
  h3: 'h3';
  h4: 'h4';
  p: 'p';
  lead: 'p';
  large: 'div';
  small: 'small';
  muted: 'p';
  blockquote: 'blockquote';
  code: 'code';
  list: 'ul';
};

const variantElementMap: VariantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
  list: 'ul',
};

type TypographyVariant = keyof typeof variantElementMap;

interface TypographyProps<V extends TypographyVariant = 'p'>
  extends Omit<React.HTMLAttributes<HTMLElement>, 'ref'>,
    VariantProps<typeof typographyVariants> {
  variant?: V;
  as?: React.ElementType;
}

function Typography<V extends TypographyVariant = 'p'>({
  className,
  variant = 'p' as V,
  as,
  children,
  ...props
}: TypographyProps<V>) {
  const Component = as || variantElementMap[variant] || 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Component>
  );
}
Typography.displayName = 'Typography';

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(typographyVariants({ variant: 'h1' }), className)}
    {...props}
  />
));
H1.displayName = 'H1';

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(typographyVariants({ variant: 'h2' }), className)}
    {...props}
  />
));
H2.displayName = 'H2';

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(typographyVariants({ variant: 'h3' }), className)}
    {...props}
  />
));
H3.displayName = 'H3';

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(typographyVariants({ variant: 'h4' }), className)}
    {...props}
  />
));
H4.displayName = 'H4';

const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typographyVariants({ variant: 'p' }), className)}
    {...props}
  />
));
P.displayName = 'P';

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typographyVariants({ variant: 'lead' }), className)}
    {...props}
  />
));
Lead.displayName = 'Lead';

const Large = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(typographyVariants({ variant: 'large' }), className)}
    {...props}
  />
));
Large.displayName = 'Large';

const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn(typographyVariants({ variant: 'small' }), className)}
    {...props}
  />
));
Small.displayName = 'Small';

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typographyVariants({ variant: 'muted' }), className)}
    {...props}
  />
));
Muted.displayName = 'Muted';

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(typographyVariants({ variant: 'blockquote' }), className)}
    {...props}
  />
));
Blockquote.displayName = 'Blockquote';

const Code = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(typographyVariants({ variant: 'code' }), className)}
    {...props}
  />
));
Code.displayName = 'Code';

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(typographyVariants({ variant: 'list' }), className)}
    {...props}
  />
));
List.displayName = 'List';

export {
  Typography,
  typographyVariants,
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  Code,
  List,
};
export type { TypographyProps };
