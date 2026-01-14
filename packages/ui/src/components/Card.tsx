import React from 'react';
import clsx from 'clsx';

type PolymorphicAs<C extends React.ElementType> = {
  as?: C;
};

type CardOwnProps = {
  className?: string;
  children?: React.ReactNode;
};

type CardProps<C extends React.ElementType> = CardOwnProps & PolymorphicAs<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof CardOwnProps | 'as'>;

export function Card<C extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: CardProps<C>) {
  const Component = (as || 'div') as React.ElementType;
  return (
    <Component
      className={clsx(
        'rounded-lg border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm',
        className
      )}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
}

export default Card;
