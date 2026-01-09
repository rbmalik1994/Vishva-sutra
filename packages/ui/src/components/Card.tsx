import React from 'react';
import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export const Card: React.FC<CardProps> = ({ as: Component = 'div', className, ...rest }) => {
  return (
    <Component
      className={clsx(
        'rounded-lg border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm',
        className
      )}
      {...rest}
    />
  );
};
